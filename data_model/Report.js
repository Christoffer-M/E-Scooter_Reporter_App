// File that contains the report class + functions to get a new report and recreate an existing report

import * as Firebase from "Firebase";
import * as Google from "../utility/GoogleAPIs";
import { v4 as uuidv4 } from "uuid";

export const newReport = (user) => {
	return new Report(user);
};

export const existingReport = (
	uuid,
	user,
	imageName,
	timestamp,
	geolocation,
	address,
	qr,
	brand,
	laying,
	broken,
	misplaced,
	other,
	comment
) => {
	const report = new Report(user);

	this.uuid = uuid;
	this.user = user;
	this.imageName = imageName;
	this.timestamp = timestamp;
	this.geolocation[0] = geolocation[0]; //Latitude
	this.geolocation[1] = geolocation[1]; //Longitude
	this.address = address;
	this.qr = qr;
	this.brand = brand;
	this.laying = laying;
	this.broken = broken;
	this.misplaced = misplaced;
	this.other = other;
    this.comment = comment;    

	return report;
};

// The report class!
class Report {
	uuid = "";
	user = ""; // userid
	imageName = ""; // scooter image name
	imageURI = "";
	timestamp = "";
	geolocation = []; //[55.660572° N, 12.590942° E]
	address = "";
	qr = ""; // URL from QR code
	brand = "unknown";
	laying = false;
	broken = false;
	misplaced = false;
	other = false;
    comment = "";
    progress = 0.0; // Used to track upload or download progress where needed

	constructor(user) {
		this.uuid = uuidv4();
		this.user = user ? user : "guest";
		this.imageName = uuid + ".jpg";
	}

	hasUser() {
		// Return false if no valid username is set
		return !(this.user == "guest" || this.user == "");
	}

	setImageUri(uri) {
        this.imageURI = uri;
        this.uploadProgress = 1.0 // Assume image exists
	}

	hasImage() {
		return this.imageURI.length > 0;
	}

	setTimestampToNow() {
		// We want to set the timestamp of the report to when the report photo was taken
		this.timestamp = Firebase.firebase.firestore.Timestamp.now();
		console.log("Set timestamp for new report to", this.timestamp.valueOf());
		return this.timestamp.valueOf();
	}

	setTimestampToDate(date) {
		this.timestamp = Firebase.firebase.firestore.Timestamp.fromDate(date);
		console.log("Set timestamp for report to", this.timestamp.valueOf());
		return this.timestamp.valueOf();
	}

	async setGeoLocation(latitude, longitude) {
		console.log("Set geolocation for new report:", latitude + " " + longitude);
		this.geolocation = Firebase.firebase.firestore.GeoPoint(
			latitude,
			longitude
		);
		this.findAddress();
		//return this.geolocation.toLocaleString();
	}

	getGeoLocationLatitude() {
		return this.geolocation.getLatitude();
	}

	getGeoLocationLongitude() {
		return this.geolocation.getLongitude();
	}

	async findAddress() {
		this.address = Google.geolocationReverseLookup(
			this.geolocation[0],
			this.geolocation[1]
		);
		console.log("Found reverse lookup address for report to be:", this.address);
	}

	hasAddress() {
		return this.address.length > 0;
	}

	getReadableAddress() {
		return this.hasAddress() ? this.address : "Unknown location";
	}

	getAddressCropped(maxLength) {
		const address = this.getAddress();
		if (address.length > maxLength) {
			// Only cut address if it is too long
			const length = Math.max(maxLength, 3); // Avoid sub 3 length values
			return (trimmedString = address.substring(0, length - 3) + "...");
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
		if (qrCode.includes("li.me")) {
			this.brand = "lime";
		} else if (qrCode.includes("voi") || qrCode.length == 4) {
			// Voi sometimes uses 4 character codes
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
		return this.brand;
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
		console.log(categories);
		return categories;
	}

	isSubmittable() {
		// Report must cotain a userid, image, timestamp and geolocation
		if (this.imageURI && this.timestamp && this.geolocation) {
			// One description must be selected
			if (this.laying || this.broken || this.misplaced || this.other) {
				return true;
			}
		}
		return false;
	}
}
