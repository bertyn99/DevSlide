const { marked } = require("marked");
const fs = require("fs/promises");
//requiring path and fs modules
const path = require("path");
const os = require("os");
function markedDownToHtml(data) {
  return marked(data);
}

async function getData(url) {
  let data = await fs.readFile(url, "utf8");
  console.log(data);
  return data;
}

function splitSlide(data) {
  const slide = data.split("---");
  console.log(slide);
  return slide;
}

modules.exports = { markedDownToHtml, getData, splitSlide };
/* const slides = splitSlide(await getData("../../public/content/test/pres.md")); */
