// File that contains the report class + functions to get a new report and recreate an existing report

import * as Backend from "./Firebase";
import * as firebase from "firebase/app";
import * as Google from "../utility/GoogleAPIs";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

export const newReport = (user) => {
  return new Report(user);
};

// The report class!
class Report {
  uuid = "";
  user = ""; // userid
  imageName = ""; // scooter image name
  imageURI = ""; // When creating reports, local storage URI
  imageURL = ""; // When downloading reports, show image using URL
  timestamp = "";
  geolocation = firebase.firestore.GeoPoint(0.0, 0.0); //[55.660572° N, 12.590942° E]
  address = "";
  qr = ""; // URL from QR code
  brand = "unknown";
  laying = false;
  broken = false;
  misplaced = false;
  other = false;
  comment = "";

  constructor(user) {
    this.uuid = uuidv4();
    this.user = user ? user : "guest";
    this.imageName = this.uuid + ".jpg";
  }

  hasUser() {
    // Return false if no valid username is set
    return !(this.user == "guest" || this.user == "");
  }

  setImageUri(uri) {
    this.imageURI = uri;
  }

  hasImage() {
    return this.imageURL.length > 0 || this.imageURI.length > 0;
  }

  setTimestampToNow() {
    // We want to set the timestamp of the report to when the report photo was taken
    this.timestamp = firebase.firestore.Timestamp.now();
    console.log("Set timestamp for new report to", this.timestamp.valueOf());
    return this.timestamp.valueOf();
  }

  setTimestampToDate(date) {
    this.timestamp = firebase.firestore.Timestamp.fromDate(date);
    console.log("Set timestamp for report to", this.timestamp.valueOf());
    return this.timestamp.valueOf();
  }

  setGeoLocation(lat, long) {
    console.log("Set geolocation for report:", lat + " " + long);
    this.geolocation = new firebase.firestore.GeoPoint(lat, long);
    this.findAddress();
    //return this.geolocation.toLocaleString();
  }

  getGeoLocationLatitude() {
    return this.geolocation.latitude;
  }

  getGeoLocationLongitude() {
    return this.geolocation.longitude;
  }

  async findAddress() {
    this.address = await Google.geolocationReverseLookup(
      this.getGeoLocationLatitude(),
      this.getGeoLocationLongitude()
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
    const address = this.getReadableAddress();
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
    if (qrCode.includes("lime") || qrCode.includes("li.me")) {
      // Lime sometimes uses two versions of character codes
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
    } else {
      this.brand = "unknown";
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
