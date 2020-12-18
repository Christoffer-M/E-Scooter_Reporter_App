// File that stores information in our app, such as reports, user information, etc.

import { Report } from "Report";
import * as Firebase from "Firebase";

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

// Get a new report
// Remember to call this first when starting on a new report!
export function newReport() {
	this.report = Report(user);
	return this.report;
}

// Submit by uploading the (new) report to Firebase and add it to local storage 
//TODO NEED UPLOAD PHOTO TO FIREBASE
export function submitReport() {
	if (this.report.isSubmittable()) {
		if (this.addReport(this.report)) {            
            if (Firebase.uploadReport (report)) {
                console.log("Report uploaded successfully to FireBase with uuid:", report.uuid)
                return true;
            } else {
                console.log("Failed to upload report to FireBase with uuid:", report.uuid)
                // Saving report for later submission when internet has recoved (if not already saved)
                for (report in this.reportsNotUploaded) if (this.report.uuid == report.uuid) return false;
                console.log("Saving report for upload later...")
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
    if (Firebase.deleteReport(uuid)) {
        if (this.removeReport(report)) {
            console.log("Report deleted from both Firebase and Storage")
        } else {
            throw "Error: Report deleted from Firebase, but was never found in Storage!!"
        }
        return true;
    } else {
        console.log("Document was not deleted with uuid:", uuid);
        return false;
    }
}

//TODO
export function syncReports(report) {}













//PRIVATE FUNCTIONS
//Add report from local storage
function addReport(report) {
	if (this.reports.has(reports.uuid)) {
		console.log(
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
        const filtered = this.reportsNotUploaded.filter(r => r.uuid != report.uuid);
        this.reportsNotUploaded = filtered
        console.log("Report deleted from Storage with uuid", report.uuid);
		return true;
	} else {
		console.log(
			"Report could not be found and deleted from Storage with uuid",
			report.uuid
		);
		return false;
	}
}

//TODO
function downloadReport() {}

//TODO
function deleteReportPhoto(report) {}


