// File that stores information in our app, such as reports, user information, etc.

import * as Report from "./Report";
import * as Firebase from "./Firebase";
import * as google from "expo-google-app-auth";
import * as firebase from "firebase/app";

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
  this.report = Report.newReport(this.user);
  return this.report;
}

// Submit by uploading the (new) report to Firebase and add it to local storage
//TODO NEED UPLOAD PHOTO TO Firebase
export function submitReport() {
  if (this.report.isSubmittable()) {
    if (this.addReport(this.report)) {
      if (Firebase.uploadReport(report)) {
        console.log(
          "Report uploaded successfully to FireBase with uuid:",
          report.uuid
        );
        return true;
      } else {
        console.log(
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
  if (Firebase.deleteReport(uuid)) {
    if (this.removeReport(report)) {
      console.log("Report deleted from both Firebase and Storage");
    } else {
      throw "Error: Report deleted from Firebase, but was never found in Storage!!";
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
    const filtered = this.reportsNotUploaded.filter(
      (r) => r.uuid != report.uuid
    );
    this.reportsNotUploaded = filtered;
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

//GOOGLE SIGN IN
//TODO: FIND A WAY TO UPLOAD AND AUTHENTICATE THE USER WITH FIREBASE. fire.base.auth().currentUser; ??
export async function signInWithGoogleAsync() {
  try {
    const result = await google.logInAsync({
      androidClientId:
        "423566385353-44d6uehk11b0u68gocjk0cad9q2ke0mv.apps.googleusercontent.com",
      iosClientId:
        "423566385353-kbvdqmr2s6sca20cca1q30sq8ctk7s35.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      // Build Firebase credential with the Google ID token.
      //console.log(result.idToken);
      var credentials = firebase.auth.GoogleAuthProvider.credential(
        result.idToken
      );
      console.log(credentials);

      // Sign in with credential from the Google user.
      const user = firebase
        .auth()
        .signInWithCredential(credentials)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      const res = {
        user: user,
        type: result.type,
      };
      return res;
    } else {
      console.log("fail!!!!");
      alert("Google authentication failed");
      return { cancelled: true };
    }
  } catch (e) {
    console.log(e);
    console.log("ERROR!!!!");
    alert("Sorry. An error has occurred while trying to log in");
    return { error: true };
  }
}

export async function getUser() {
  const user = firebase.auth();
  if (user) {
    console.log("User from firebase: " + user.email);
  }
  return user;
}

export function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Signed out");
    })
    .catch(function (error) {
      console.log(error);
    });
}

//TODO
function downloadReport() {}

//TODO
function deleteReportPhoto(report) {}
