const { marked } = require("marked");
const fs = require("fs/promises");
//requiring path and fs modules
const path = require("path");
const os = require("os");
function markedDownToHtml(data) {
  return marked(data);
}

function splitSlide(data) {
  const slide = data.split("---");
  return slide;
}

module.exports = { markedDownToHtml, splitSlide };
/* const slides = splitSlide(await getData("../../public/content/test/pres.md")); */
