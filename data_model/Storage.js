// File that stores information in our app, such as reports, report photos, user information, etc.
// Most information is uploaded/downloaded using method calls to Firebase.js

import * as Backend from "./Firebase";
import * as FileSystem from "expo-file-system";
import * as Report from "./Report";

let lastUpdate = null;
let firstTimeSyncing = true; //Will only be true once, until after first sync
let minSecondsBetweenUpdates = 5; // Don't sync with backend more often than every X second

export let user = "";

export let location = null;

export let reports = []; //To hold reports
export let userReports = []; //To hold only the logged in user's reports
export let report = null; //Use newReport() to get a new (clean) report
export let rep;

export const BrandLogos = {
  lime: require("../assets/brand_logos/logo_lime.png"),
  voi: require("../assets/brand_logos/logo_voi.png"),
  tier: require("../assets/brand_logos/logo_tier.png"),
  bird: require("../assets/brand_logos/logo_bird.png"),
  wind: require("../assets/brand_logos/logo_wind.png"),
  circ: require("../assets/brand_logos/logo_circ.png"),
  unknown: require("../assets/brand_logos/logo_unknown.png"),
};

export function fillArray() {}

export function isSignedIn() {
  return user.length > 0 && user != "guest";
}

export function signOut() {
  Backend.logout();
  userReports = [];
  user = "";
}

export function isGuest() {
  return user == "" || user == "guest";
}

export function setUser(value) {
  console.log("Setting value to " + value);
  user = value;
}

export function getUser() {
  return user ? user : "guest";
}

export function getLocation() {
  return location;
}

export function setLocation(newLocation) {
  location = newLocation;
}

export function getReports() {
  return reports;
}

export function getUserReports() {
  return userReports;
}

export function getReport() {
  return report;
}

// CREATE NEW REPORT
// NOTE: Remember to call this first when starting on a new report!
export function newReport() {
  report = Report.newReport(getUser());
  return report;
}

// SUBMIT NEW REPORT
// Submit by uploading first the report photo, then get the URL to the uploaded photo into the report, and then upload the report.
export async function submitReport() {
  //Checks if report is submittable
  if (report.isSubmittable()) {
    //Now tries to upload photo to Firebase
    const res = await Backend.uploadReportPhoto(report);

    //If returned error or something bad happened it will return false
    if (!res) {
      console.error(
        "ERROR: Submitting aborted, unable to upload report photo!"
      );
      return false;
    } else {
      //Will return true if report has been successfully submitted
      console.log("Report submitted succesfully!");
      return true;
    }
  } else {
    throw "Error: Report missing information! check .isSubmittable() first before trying to submit!";
  }
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
  if (!removeReport(report)) {
    console.error("ERROR: Report was not deleted locally");
    return false;
  }

  console.log("Report and photo deleted from both backend and local storage");
  return true;
}

// SYNC (DOWNLOAD) REPORTS
// Sync no more often than minSecondsBetweenUpdates value, and only add new reports not already in array.
export async function syncReports() {
  if (lastUpdate == null) lastUpdate = new Date();

  const now = new Date();
  const secondsSinceLastSync = (now.getTime() - lastUpdate.getTime()) / 1000;

  if (firstTimeSyncing || secondsSinceLastSync > minSecondsBetweenUpdates) {
    lastUpdate = new Date(); // Update time since last fetch
    firstTimeSyncing = false; // Only allowed once!

    let fetchedReports = await Backend.downloadAllReports();
    console.log("Syncing with", fetchedReports.length, "reports:");

    // If we have reports that are no longer on the server, remove all reports before syncing:
    if (reports.length > fetchedReports.length) reports = [];

    // Put new reports in our reports array:
    fetchedReports.forEach((obj) => {
      if (reports.some((r) => r.uuid === obj.uuid)) {
        //console.log("Skipped adding", obj.uuid, "(already exists!)");
      } else {
        const newReport = Report.newReport(obj.user);
        Object.assign(newReport, obj);
        reports.push(newReport);
        //console.log("Downloaded report:", newReport.uuid);
      }
    });
    // Finally, we update the users reports after syncing:
  } else {
    console.log(
      "Please wait",
      (minSecondsBetweenUpdates - secondsSinceLastSync).toFixed(2),
      "seconds before syncing again..."
    );
  }
  updateUserReportsList();
}

// GET USERS REPORTS ONLY
// The array is sorted by time
export function updateUserReportsList() {
  // Filter reports by user:
  //console.log("reports length before:", reports.length);
  const updatedUserReports = reports.filter((r) => r.user == getUser());
  //console.log("updatedUserReports length after:", updatedUserReports.length);

  // Only update users reports if there there are any new ones:
  if (userReports.length != updatedUserReports.length) {
    //console.log("Updated user report list for user:", getUser());
    function compareTime(a, b) {
      const aSec = a.timestamp.seconds;
      const bSec = b.timestamp.seconds;
      if (aSec > bSec) return -1;
      if (aSec < bSec) return 1;
      return 0;
    }
    // Sort reports by time they where created in decending order
    updatedUserReports.sort(compareTime);

    // Use the updated user reports list

    userReports = updatedUserReports;
  }
  //console.log("Skipped updating user reports (already updated)");
}

//PRIVATE FUNCTIONS
//Add report from local storage
function addReport(report) {
  if (reports.has(reports.uuid)) {
    console.error(
      "Report could not be added to Storage (already exists) with uuid",
      report.uuid
    );
    return false;
  } else {
    reports.set(report.uuid, report);
    console.log("Report added to Storage with uuid", report.uuid);
    return true;
  }
}

//Remove report from local storage
function removeReport(report) {
  if (reports.delete(report.uuid)) {
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
