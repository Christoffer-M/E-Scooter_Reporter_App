// Google API Key (for reverse geolocation)
// Source: https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
const googleAPIKey = "AIzaSyBlIX7AEtFoMzF-bBZgIqRXdiyF7womVOI";

export async function geolocationReverseLookup(latitude, longitude) {
  if (latitude == 0.0 && longitude == 0.0) {
    console.log(
      "ReverseGeolocationLookup failed on geolocation:",
      latitude,
      longitude
    );
  }

  let foundAddress = "";

  await fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      latitude +
      "," +
      longitude +
      "&key=" +
      googleAPIKey
  )
    .then((response) => response.json())
    .then((responseJson) => {
      for (i = 0; i < responseJson.results.length; i++) {
        if (responseJson.results[i].formatted_address != null) {
          foundAddress = responseJson.results[i].formatted_address;
          break;
        }
      }
    })
    .catch((error) => {
      console.error("Report .setAddress() Error:", error);
    });
  return foundAddress;
}
