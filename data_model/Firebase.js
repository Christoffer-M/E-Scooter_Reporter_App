// This file manages all communication with Firebase, including:
// - Uploading reports and photos
// - Downloading reports
// - Getting download links to individual report photos
// - Deleting reports and photos on firebase
// - Authenticating user login

import * as firebase from "firebase/app";
import "firebase/auth"; // Optionally import the additiona firebase services
//import "firebase/database"; // Optionally import the additiona firebase services
import "firebase/firestore"; // Optionally import the additiona firebase services
//import "firebase/functions"; // Optionally import the additiona firebase services
import "firebase/storage"; // Optionally import the additiona firebase services
import * as google from "expo-google-app-auth";

// Our Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDnAWCVQYyaJlSDVvPYDM8zGxmmHK10xM4",
  authDomain: "scooter1-b6f56.firebaseapp.com",
  databaseURL: "https://scooter1-b6f56.firebaseio.com",
  projectId: "scooter1-b6f56",
  storageBucket: "scooter1-b6f56.appspot.com",
  messagingSenderId: "423566385353",
  appId: "1:423566385353:web:b8f05ea08f4db55ce7ed18",
  measurementId: "G-R6K9EHWPQB",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase Cloud Firestore
var db = firebase.firestore();

// Get Firebase Storage reference, which is used to create references to the storage bucket
var storage = firebase.storage().ref();

// Create a scooter_photos_path reference
const scooterFolderPath = "scooter_photos";
const scooterPhotosPath = storage.child(scooterFolderPath);

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
          console.error(error);
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
// TODO: Down thing we need download by user, if we already need to download all reports for display on the map.
// TODO: And if we already have all reports locally, it is faster to folter and sort them on device that another query to firebase :)
// DOWNLOAD REPORT BY USER ID
// Download report by query matching the user
// export async function getUserReports(user) {
// 	let reportsByID = [];
// 	db.collection("reports")
// 		.where("user", "==", user)
// 		.get()
// 		.orderBy("timestamp")
// 		.then(function (querySnapshot) {
// 			querySnapshot.forEach(function (report) {
// 				// report.data() is never undefined for query report snapshots
// 				//console.log(report.id, " => ", report.data());
// 				reportsByID.push(report.id);
// 			});
// 		})
// 		.catch(function (error) {
// 			console.error("Error getting report: ", error);
// 		});
// 	return reportsByID;
// }

// DOWNLOAD ALL REPORT
// Download specific report by uuid
export function downloadAllReports() {
  let foundReports = [];
  db.collection("reports")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (report) {
        foundReports.push(report.data());
        //console.log("Downloading report:",report.id)
      });
    })
    .catch(function (error) {
      console.error("Error getting reports:", error);
    });
  return foundReports;
}

// UPLOAD REPORT
// Upload report document to Firebase FireStore with uuid as name
export async function uploadReport(report) {
  return await db
    .collection("reports")
    .doc(report.uuid)
    .set({
      uuid: report.uuid,
      user: report.user,
      imageName: report.imageName,
      imageURL: report.imageURL,
      timestamp: report.timestamp,
      geolocation: report.geolocation,
      address: report.address,
      qr: report.qr,
      brand: report.brand,
      laying: report.laying,
      broken: report.broken,
      misplaced: report.misplaced,
      other: report.other,
      comment: report.comment,
    })
    .then(() => {
      //Will return true if report has been successfully submitted
      console.log("Report succesfully added!");
      return true;
    })
    .catch((error) => {
      //Will return false if report has not been successfully submitted
      console.error("Error adding report: ", error);
      return false;
    });
}

// UPLOAD REPORT PHOTO
// Uploads report photo to Firebase Storage
export async function uploadReportPhoto(report) {
  const response = await fetch(report.imageURI);
  const blob = await response.blob();

  // File or Blob
  var file = blob;

  // Create the file metadata
  var metadata = {
    contentType: "image/jpeg",
  };

  // Upload photo and metadata to the object 'scooter_photos/[uuid].jpg'
  var uploadTask = scooterPhotosPath
    .child(report.imageName)
    .put(file, metadata);

  // Wraps everything in promise to make sure code runs synchronously.
  const promise = new Promise((resolve, reject) => {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(report.imageName, "upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.error("Upload Error: Firebase Storage not authorized");
            // User doesn't have permission to access the object
            console.error(
              "Upload Error: User",
              report.user,
              "does not have permission!"
            );
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            console.error("Upload Error: Unknown error occurred!");
            break;
        }
        reject(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          report.imageURL = downloadURL;
          resolve(true);
        });
      }
    );
  })
    .then((res) => {
      //If res is returned as true, then run the upload report function
      if (res) {
        return uploadReport(report);
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });

  return promise;
}

//DELETE REPORT DOCUMENT
//Deletes the report document in Firebase FireStore
function deleteReport(report) {
  const uuidToDelete = report.uuid;
  db.collection("reports")
    .doc(uuidToDelete)
    .delete()
    .then(function () {
      console.log("Document successfully deleted with uuid:", uuidToDelete);
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
      return false;
    });
  return true;
}

// DELETE REPORT PHOTO
// Deletes a report photo from Firebase Storage
function deleteReportPhoto(report) {
  // Create a reference to the file to delete
  let photoRef = scooterPhotosPath.child(report.imageName);

  // Delete the photo
  photoRef
    .delete()
    .then(function () {
      console.log(
        report.imageName,
        "successfully delete from Firebase Storage!"
      );
    })
    .catch(function (error) {
      console.error(
        "ERROR: File",
        report.imageName,
        "could not be delete from Firebase Storage!"
      );
      return false;
    });
  return true;
}
