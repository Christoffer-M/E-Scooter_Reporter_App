import * as firebase from "../data_model/Firebase";

export const report = firebase.newReport("defaultreport");

let isGues = true;
export function setGues(bool) {
  isGues = bool;
}

export function getGues() {
  return isGues;
}

export let pictureURI = null;
