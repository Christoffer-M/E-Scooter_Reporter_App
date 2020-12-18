import * as firebase from "firebase/app";
import "firebase/auth"; // Optionally import the additiona firebase services
//import "firebase/database"; // Optionally import the additiona firebase services
import "firebase/firestore"; // Optionally import the additiona firebase services
//import "firebase/functions"; // Optionally import the additiona firebase services
import "firebase/storage"; // Optionally import the additiona firebase services

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
var scooterImages = storage.child(scooterFolderPath);

// SCOOTER_PHOTOS
export const getScooterImage = (scooterImageName) => {
	imageRef = scooterImages
		.get(scooterImageName)
		.getDownloadURL()
		.then((url) => {
			return url;
		})
		.catch(function (error) {
			console.log("Error getting file image file from url");
			return null;
		});
};

export const getUserReports = (user) => {
	let reportsByID = [];
	db.collection("reports")
		.where("user", "==", user)
		.get()
		.orderBy("timestamp")
		.then(function (querySnapshot) {
			querySnapshot.forEach(function (report) {
				// report.data() is never undefined for query report snapshots
				//console.log(report.id, " => ", report.data());
				reportsByID.push(report.id);
			});
		})
		.catch(function (error) {
			console.log("Error getting report: ", error);
		});
	return reportsByID;
};

//Download report by
export const getReportByUUID = async (uuid) => {
	const report = db.collection("reports").doc(uuid);
	const reportData = null;

	// Valid options for source are 'server', 'cache', or
	// 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
	// for more information.
	var getOptions = {
		source: "default",
	};

	// Get a report
	report
		.get(getOptions)
		.then(function (reportDoc) {
			// Document was found in the cache. If no cached document exists,
			// an error will be returned to the 'catch' block below.
			//console.log("Cached document data:", report.data());
			reportData = reportDoc.data();
		})
		.catch(function (error) {
			console.log("Error getting report:", error);
		});

	// Return report
	return reportData;
};

//Upload report document
export const uploadReport = async (report) => {
	db.collection("reports")
		.doc(report.uuid)
		.set({
			uuid: report.uuid,
			user: report.user,
			image: report.imageFileName,
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
		.then(function (docRef) {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function (error) {
			console.error("Error adding report: ", error);
			return false;
		});
	return true;
};

//Delete report document
export const deleteReport = async (uuid) => {
	db.collection("reports")
		.doc(uuid)
		.delete()
		.then(function () {
			console.log("Document successfully deleted with uuid:", uuid);
		})
		.catch(function (error) {
			console.error("Error removing document: ", error);
			return false;
		});
	return true;
};

//Upload report photo to Firebase Storage
export const uploadReportPhoto = async (report) => {
	const response = await fetch(report.imageURI);
	const blob = await response.blob();

	// File or Blob
	var file = blob;

	// Create the file metadata
	var metadata = {
		contentType: "image/jpeg",
	};

	// Upload photo and metadata to the object 'scooter_photos/[uuid].jpg'
	var uploadTask = scooterImages.put(file, metadata);

	// Listen for state changes, errors, and completion of the upload.
	uploadTask.on(
		firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		function (snapshot) {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log(report.imageName, "upload is " + progress + "% done");
			report.progress = progress / 100.0;
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
					console.log("Upload Error: Firebase Storage not authorized");
					// User doesn't have permission to access the object
					console.log(
						"Upload Error: User",
						report.user,
						"does not have permission!"
					);
					break;

				case "storage/unknown":
					// Unknown error occurred, inspect error.serverResponse
					console.log("Upload Error: Unknown error occurred!");
					break;
			}
			return false;
		},
		function () {
			// Upload completed successfully, now we can get the download URL
			uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
				console.log("File available at", downloadURL);
			});
		}
	);
	report.progress = 1.0;
	return true;
};

const getDownloadReportPhotoURL = async (report) => {
	// Create a reference to the file we want to download
	let imagePath = scooterFolderPath + "/" + report.imageName
	let starsRef = storageRef.child(imagePath);
	let downloadURL = ""

	// Get the download URL
	starsRef
		.getDownloadURL()
		.then(function (url) {
			downloadURL = url
			// Insert url into an <img> tag to "download"
		})
		.catch(function (error) {
			// A full list of error codes is available at
			// https://firebase.google.com/docs/storage/web/handle-errors
			switch (error.code) {
				case "storage/object-not-found":
					// File doesn't exist
					console.log("Download URL error: File",imagePath,"doesn't exist!")
					break;

				case "storage/unauthorized":
					// User doesn't have permission to access the object
					console.log("Download URL error: User doesn't have permission to access the object!")
					break;

				case "storage/canceled":
					// User canceled the download
					console.log("Download URL error: User canceled the download!")
					break;

				case "storage/unknown":
					// Unknown error occurred, inspect the server response
					console.log("Download URL error: Unknown error occurred, inspect the server response")
					break;
			}
			console.log("Image from",imagePath,"was not downloaded")
			return "";
		});
	return downloadURL;
}
