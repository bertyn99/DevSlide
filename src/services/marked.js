const { marked } = require("marked");
const fs = require("fs/promises");
const { getContentFile, checkFilePres } = require("../utils/check");

//requiring path and fs modules
const path = require("path");
const os = require("os");
function markedDownToHtml(data) {
  return marked(data);
}

function replaceUrlAssetsSlide(content) {
  //recuper les balise image markdown
  //parse mardown with regex
  let imgMD = content.math(/!\[(.*)\]\((.+)\)/g); // array of image in markdown with their url
  console.log(imgMD);
  //change url
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
