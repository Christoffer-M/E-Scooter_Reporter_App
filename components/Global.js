import * as storage from "../data_model/Storage";

export const report = storage.report;

let isGues = true;
export function setGues(bool) {
  isGues = bool;
}

export function getGues() {
  return isGues;
}

export let pictureURI = null;
