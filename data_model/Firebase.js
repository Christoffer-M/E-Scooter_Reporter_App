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

// Google API Key (for reverse geolocation)
// Source: https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
const googleAPIKey = "AIzaSyBlIX7AEtFoMzF-bBZgIqRXdiyF7womVOI";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase Cloud Firestore
var db = firebase.firestore();

// Get Firebase Storage reference, which is used to create references to the storage bucket
var storage = firebase.storage().ref();

// Create a scooter_photos_path reference
var scooterImages = storage.child("scooter_photos");

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

// REPORTS
export const newReport = (user) => {
	return new Report(user);
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

export const getReportByID = (reportID) => {
	const report = db.collection("reports").doc(reportID);
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

class Report {
	user = ""; // userid
	image = ""; // scooter image name
	timestamp = "";
	geolocation = []; //[55.660572° N, 12.590942° E]
	address = "";
	qr = ""; // qr code url
	imageObject = {
		width: "",
		height: "",
		uri: "",
	};

	brand = "unknown";

	laying = false;
	broken = false;
	misplaced = false;
	other = false;
	comment = "";

	constructor(user) {
		user ? (this.user = user) : (this.user = "guest"); //default
	}

	setImageFile(file) {
		// https://firebase.google.com/docs/storage/web/file-metadata
		var metadata = {
			contentType: "image/jpeg",
		};

		// use the Blob or File API
		fileName = this.user + "-" + setTimestampToNow() + ".jpg";
		fileLocation = scooterImages.child(fileName);
		fileLocation.put(file, metadata).then(function (snapshot) {
			console.log("Uploaded an image!");
		});

		this.image = file.name;
		return this.image;
	}

	setImage(uri, width, height) {
		this.imageObject.height = height;
		this.imageObject.width = width;
		this.imageObject.uri = uri;
	}

	getImage() {
		return this.imageObject;
	}

	hasImageURI() {
		return this.imageObject.uri.length > 0;
	}

	setTimestampToNow() {
		this.timestamp = firebase.firestore.Timestamp.now();
		return this.timestamp.valueOf();
	}

	setTimestampToDate(date) {
		this.timestamp = firebase.firestore.Timestamp.fromDate(date);
		return this.timestamp.valueOf();
	}

	setGeoLocation(latitude, longitude) {
		this.geolocation = firebase.firestore.GeoPoint(latitude, longitude);
		this.setAddress(latitude, longitude);
		return this.geolocation.toLocaleString();
	}

	getGeoLocationLatitude() {
		return this.geolocation.getLatitude();
	}

	getGeoLocationLongitude() {
		return this.geolocation.getLongitude();
	}

	async setAddress(latitude, longitude) {
		const myApiKey = googleAPIKey;
		const myLat = latitude;
		const myLon = longitude;

		await fetch(
			"https://maps.googleapis.com/maps/api/geocode/json?address=" +
				myLat +
				"," +
				myLon +
				"&key=" +
				myApiKey
		)
			.then((response) => response.json())
			.then((responseJson) => {
				let response = JSON.stringify(responseJson);
				this.address = response["formatted_address"];
				console.log("GoogleAPI Reverse geolocation response: " + this.address);
			})
			.catch((error) => {
				console.error("Report .setAddress() Error:", error);
			});
		return this.getAddress();
	}

	hasAddress() {
		return this.address.length > 0;
	}

	getAddress() {
		return this.hasAddress() ? this.address : "Unknown location"
	}

	getAddressCropped(maxLength) {
		const address = this.getAddress();
		if (address.length > maxLength) {
			// Only cut address if it is too long
			const length = Math.max(maxLength, 3); // Avoid sub 3 length values
			return (trimmedString = getAddress().substring(0, length - 3) + "...");
		} else {
			return address;
		}
	}

	setQR(qrCode) {
		this.qr = qrCode;
		this.setBrand(qrCode);
		return this.qr;
	}

	hasQR() {
		return this.qr.length > 0;
	}

	setBrand(qrCode) {
		if (qrCode.includes("lime")) {
      this.brand = "lime";
    } else if (qrCode.includes("voi")) {
			this.brand = "voi";
		} else if (qrCode.includes("tier")) {
			this.brand = "tier";
		} else if (qrCode.includes("bird")) {
			this.brand = "bird";
		} else if (qrCode.includes("wind")) {
			this.brand = "wind";
		} else if (qrCode.includes("circ")) {
			this.brand = "circ";
		}
    return this.brand
	}

	getBrand() {
		return this.brand;
	}

	isLaying() {
		return this.laying;
	}

	toggleLaying() {
		this.laying = !this.laying;
		return this.isLaying();
	}

	isBroken() {
		return this.broken;
	}

	toggleBroken() {
		this.broken = !this.broken;
		return this.isBroken();
	}

	isMisplaced() {
		return this.misplaced;
	}

	toggleMisplaced() {
		this.misplaced = !this.misplaced;
		return this.isMisplaced();
	}

	isOther() {
		return this.other;
	}

	toggleOther() {
		this.other = !this.other;
		return this.isOther();
	}

	setComment(text) {
		this.comment = text;
	}

	isCommented() {
		return this.other && this.comment;
	}

	// Get method to display types of violations in the report overview before submitting.
	getCategories() {
		const misplaced = "Misplaced";
		const laying = "Laying Down";
		const broken = "Broken";
		const other = "Other";
		let categories = [];

		if (this.isMisplaced()) {
			categories.push(misplaced);
		}
		if (this.isLaying()) {
			categories.push(laying);
		}
		if (this.isBroken()) {
			categories.push(broken);
		}
		if (this.isOther()) {
			categories.push(other);
		}

		return categories;
	}

	isSubmittable() {
		// Report must cotain a userid, image, timestamp and geolocation
		if (this.user && this.image && this.timestamp && this.geolocation) {
			// One description must be selected
			if (this.laying || this.broken || this.misplaced || this.other) {
				return true;
			}
		}
		return false;
	}

	submit(doIfSuccessful) {
		if (this.isSubmittable()) {
			db.collection("reports")
				.add({
					user: this.user,
					image: this.image,
					timestamp: this.timestamp,
          geolocation: this.geolocation,
          address: this.address,
					qr: this.qr,
					brand: this.brand,
					laying: this.laying,
					broken: this.broken,
					misplaced: this.misplaced,
					other: this.other,
					comment: this.comment,
				})
				.then(function (docRef) {
					console.log("Document written with ID: ", docRef.id);
				})
				.catch(function (error) {
					console.error("Error adding report: ", error);
				});
			doIfSuccessful();
			return true;
		} else {
			alert("The report is missing important information.");
			throw "Error: Report missing information! check .isSubmittable() first";
			//return false;
		}
	}
}
