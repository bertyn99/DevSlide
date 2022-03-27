const { marked } = require("marked");
const fs = require("fs/promises");
const { getContentFile, checkFilePres } = require("../utils/check");
//requiring path and fs modules
const path = require("path");
const os = require("os");
function markedDownToHtml(data) {
  return marked(data);
}

function replaceUrlAssetsSlide(content, dir) {
  //recuper les balise image markdown
  //parse mardown with regex
  return content.replace("./assets/", "file://" + path.join(dir, "assets/")); // array of image in markdown with their url
}

/**
 * split markdown slides
 * @param {string} data
 * @returns
 */
function splitSlide(data) {
  const slides = data.split("---");
  return slides;
}

/* replaceUrlAssetsSlide(
  "# 2. Une image J'espère que votre application supporte l'ajout d'image et qu'elles ne dépasseront pas du cadre! 😉 ![Une image](./assets/image.jpg)",
  "efffmlkk,dzkm,ed"
);
 */
module.exports = { markedDownToHtml, splitSlide, replaceUrlAssetsSlide };
