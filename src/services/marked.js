const { marked } = require("marked");
const fs = require("fs/promises");
//requiring path and fs modules
const path = require("path");
const os = require("os");
function markedDownToHtml(data) {
  return marked(data);
}

/**
 * split markdown slides
 * @param {string} data
 * @returns
 */
function splitSlide(data) {
  const slides = data.split("---");
  console.log(slides[0]);
  return slides;
}

module.exports = { markedDownToHtml, splitSlide };
/* const slides = splitSlide(await getData("../../public/content/test/pres.md")); */
