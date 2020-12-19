// File that stores information in our app, such as reports, report photos, user information, etc.
// Most information is uploaded/downloaded using method calls to Firebase.js

import * as Backend from "./Firebase";
import * as FileSystem from "expo-file-system";
import * as Report from "./Report";

export let user = "";

export let reports = new Map(); //Empty map to hold reports
export let report = null; //Use newReport() to get a new (clean) report
export let guest = true;

//In case of failed internet connection:
export let reportsNotUploaded = [];

export function isSignedIn() {
  return this.user.length > 0;
}

export function signOut() {
  this.user = "";
}

export function setGuest(boolean) {
  guest = boolean;
}

// CREATE NEW REPORT
// NOTE: Remember to call this first when starting on a new report!
export function newReport() {
  this.report = Report.newReport(this.user);
  return this.report;
}

// SUBMIT NEW REPORT
// Submit by uploading first the report photo, then get the URL to the uploaded photo into the report, and then upload the report.
export function submitReport() {
  if (this.report.isSubmittable()) {
    //We first upload the report photo...
    if (!Backend.uploadReportPhoto(this.report)) {
      console.error(
        "ERROR: Submitting aborted, unable to upload report photo!"
      );
      return false;
    }

    //...Then we get the URL to the just uploaded report photo...
    this.report = Backend.getPhotoDownloadURL(this.report);
    if (!this.report.imageURL) {
      console.error(
        "ERROR: Submitting aborted, unable to get URL for report photo!"
      );
      return false;
    }

    //...And then we upload the report now with the photo URL as well
    if (!Backend.uploadReport(this.report)) {
      console.error(
        "ERROR: Submitting aborted, unable to upload report to FireStore"
      );
      return false;
    }
  } else {
    throw "Error: Report missing information! check .isSubmittable() first before trying to submit!";
  }
  return true;
}

// Delete reports from Firebase and Storage
export function deleteReport(report) {
  // Delete report photo on backend
  if (!Backend.deleteReportPhoto(report)) {
    console.error("ERROR: Report photo was not deleted from backend");
    return false;
  }

  // Delete report on backend
  if (!Backend.deleteReport(report)) {
    console.error("ERROR: Report was not deleted from backend");
    return false;
  }

  // Delete report locally
  if (!this.removeReport(report)) {
    console.error("ERROR: Report was not deleted locally");
    return false;
  }

  console.log("Report and photo deleted from both backend and local storage");
  return true;
}

//TODO NOT DONE YET (need to check format of returned data from FireBase)
export function syncReports(report) {
  let fetchedReports = Backend.downloadAllReports();
  console.log("Syncing with", fetchedReports.length, "reports:");

  for (report in fetchedReports) {
    console.log(report);
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

//NOTE: COMMENTED OUT SINCE WE DONT NEED TO DOWNLOAD IMAGES FROM URL AND SAVE THEM LOCALLY
// // Download report photo to device filesystem
// function downloadReportPhoto(report) {
// 	//Get report photo URL:
// 	const url = Backend.getDownloadReportPhotoURL(report);
// 	if (url == "") {
// 		console.error(
// 			"Unable to get URL to download report photo for:",
// 			report.imageName
// 		);
// 		return false;
// 	}
// 	console.log("Trying to download report photo from:", url);

// 	FileSystem.downloadAsync(url, FileSystem.documentDirectory + report.imageName)
// 		.then(({ uri }) => {
// 			console.log("Finished downloading to ", uri);
// 			report.imageURI = uri;
// 		})
// 		.catch((error) => {
// 			console.error("Was unable to download photo:", error);
// 			return false;
// 		});
// 	return true;
// }

//NOTE: COMMENTED OUT SINCE WE ALREADY CLEAR THE LOCAL IMAGE AFTER SUBMITTING?
// //Delete report photo from local storage
// function deleteReportPhoto(report) {
// 	//Get report photo uri
// 	const uri = report.imageURI;
// 	if (uri == "") {
// 		console.error("No local image found for", report.uuid);
// 		return false;
// 	}
// 	console.log("Deleting report photo from local storage:", uri);

// 	FileSystem.deleteAsync(uri).catch((error) => {
// 		console.error("Unable to delete local photo file", error);
// 		return false;
// 	});
// 	return true;
// }
