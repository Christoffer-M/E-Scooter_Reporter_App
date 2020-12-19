// File that stores information in our app, such as reports, report photos, user information, etc.
// Most information is uploaded/downloaded using method calls to Firebase.js

import * as Backend from "Firebase";
import * as FileSystem from "expo-file-system";
import { Report } from "Report";

export let user = "";

export let reports = new Map(); //Empty map to hold reports
export let report = null; //Use newReport() to get a new (clean) report

//In case of failed internet connection:
export let reportsNotUploaded = [];
export let reportImagesNotUploaded = [];

export function isSignedIn() {
	return this.user.length > 0;
}

export function signOut() {
	this.user = "";
}

// CREATE NEW REPORT
// NOTE: Remember to call this first when starting on a new report!
export function newReport() {
	this.report = Report(user);
	return this.report;
}

//TODO: TOO VERBOSE?
// SUBMIT NEW REPORT
// Submit by uploading the (new) report to Firebase and add it to local storage
export function submitReport() {
	if (this.report.isSubmittable()) {
		if (this.addReport(this.report)) {
			if (Backend.uploadReport(report)) {
				console.log(
					"Report uploaded successfully to FireBase with uuid:",
					report.uuid
				);
				if (Backend.uploadReportPhoto(report)) {
					console.log(
						"Photo uploaded successfully to FireBase:",
						report.imageName
					);
				} else {
                    console.error(
                        "Failed to upload report photo to FireBase:",
                        report.imageName
                    );
                    return false;
                }
				return true;
			} else {
				console.error(
					"Failed to upload report to FireBase with uuid:",
					report.uuid
				);
				// Saving report for later submission when internet has recoved (if not already saved)
				for (report in this.reportsNotUploaded)
					if (this.report.uuid == report.uuid) return false;
				console.log("Saving report for upload later...");
				this.reportsNotUploaded.push(report);
				return false;
			}
		} else {
			throw "Error: Report submission cancelled, as it already exists in Storage (somehow)!";
		}
	} else {
		throw "Error: Report missing information! check .isSubmittable() first before trying to submit!";
	}
}

// Delete reports from Firebase and Storage
export function deleteReport(uuid) {
	if (Backend.deleteReport(uuid)) {
		if (this.removeReport(report)) {
			console.log("Report deleted from both Firebase and Storage");
		} else {
			throw "Error: Report deleted from Firebase, but was never found in Storage!!";
		}
		return true;
	} else {
		console.error("Document was not deleted with uuid:", uuid);
		return false;
	}
}

//TODO NOT DONE YET (need to check what is returned from FireBase)
export function syncReports(report) {

    let fetchedReports = Backend.downloadAllReports()
    console.log("Syncing with", fetchedReports.length, "reports:")

    for (report in fetchedReports) {
        console.log(report)
    }

}

//PRIVATE FUNCTIONS
//Add report from local storage
function addReport(report) {
	if (this.reports.has(reports.uuid)) {
		console.error(
			"Report could not be added to Storage (already exists) with uuid",
			report.uuid
		);
		return false;
	} else {
		this.reports.set(report.uuid, report);
		console.log("Report added to Storage with uuid", report.uuid);
		return true;
	}
}

//Remove report from local storage
function removeReport(report) {
	if (this.reports.delete(report.uuid)) {
		// If to-be-deleted report was in pending upload array, also delete it from there:
		const filtered = this.reportsNotUploaded.filter(
			(r) => r.uuid != report.uuid
		);
		this.reportsNotUploaded = filtered;
		console.log("Report deleted from Storage with uuid", report.uuid);
		return true;
	} else {
		console.error(
			"Report could not be found and deleted from Storage with uuid",
			report.uuid
		);
		return false;
	}
}

// Download report photo to device filesystem
function downloadReportPhoto(report) {
	//Get report photo URL:
	const url = Backend.getDownloadReportPhotoURL(report);
	if (url == "") {
		console.error(
			"Unable to get URL to download report photo for:",
			report.imageName
		);
		return false;
	}
	console.log("Trying to download report photo from:", url);

	FileSystem.downloadAsync(url, FileSystem.documentDirectory + report.imageName)
		.then(({ uri }) => {
			console.log("Finished downloading to ", uri);
			report.imageURI = uri;
		})
		.catch((error) => {
			console.error("Was unable to download photo:", error);
			return false;
		});
	return true;
}

//Delete report photo from local storage
function deleteReportPhoto(report) {
	//Get report photo uri
	const uri = report.imageURI;
	if (uri == "") {
		console.error("No local image found for", report.uuid);
		return false;
	}
	console.log("Deleting report photo from local storage:", uri);

	FileSystem.deleteAsync(uri).catch((error) => {
		console.error("Unable to delete local photo file", error);
		return false;
	});
	return true;
}
