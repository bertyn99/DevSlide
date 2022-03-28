const { marked } = require("marked");
const fs = require("fs/promises");
const { getContentFile, checkFilePres } = require("../utils/check");
//requiring path and fs modules
const path = require("path");
const os = require("os");
function markedDownToHtml(data) {
  return marked(data);
}

async function rFile(path, type) {
  if (type == "image") return await fs.readFile(path, { encoding: "base64" });

  if (type == "code") return await fs.readFile(path, { encoding: "utf-8" });
}

async function replaceUrlAssetsSlide(content, dir) {
  //recuper les balise assets markdown
  let assets = content.match(/\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/gi);
  //parse mardown with regex
  console.log("avant filter");
  if (assets) {
    let assetsImg = assets.filter((asset) => asset.includes("[Une image]"));
    let assetsCode = assets.filter((asset) => asset.includes("[Code]"));
    if (assetsImg != null || assetsImg != undefined || assetsImg != []) {
      for (let asset of assetsImg) {
        let fileName = /\((.*?)\s*("(?:.*[^"])")?\s*\)/gi.exec(asset)[1];
        let filePath = path.join(dir, fileName);

        let fileType = filePath.split(".").pop();
        let data = await rFile(filePath, "image");

        content = content.replace(
          asset,
          `[](data:image/${fileType};base64,${data})`
        );
      }
    }
    if (assetsCode != null || assetsCode != undefined || assetsCode != []) {
      for (let asset of assetsCode) {
        let file = /\((.*?)\s*("(?:.*[^"])")?\s*\)/gi.exec(asset)[1];
        fileName = file.split("#")[0];
        let interval = file.split("#")[1];
        let filePath = path.join(dir, fileName);
        let start = interval.split("-")[0] - 1;
        let end = interval.split("-")[1];
        let data = await rFile(filePath, "code");
        let snippet = data.split("\n").slice(start, end).join("\n");
        let test = data.split("\n");
        console.log(data.split("\n").slice(start, end).join("\n"));
        content = content.replace(asset, "```js\n" + snippet + "\n```");
      }
    }
  }
  return content;
  //return content.replace("./assets/", "file://" + path.join(dir, "assets/")); // array of image in markdown with their url
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
  "# 2. Une image J'espère que votre application supporte l'ajout d'image et qu'elles [Code](./assets/index.js#3-6) ne dépasseront pas du cadre! 😉 ![Une image](./assets/image.jpg) ",
  path.join(os.tmpdir(), "devSlide/example-presentation")
); */

module.exports = { markedDownToHtml, splitSlide, replaceUrlAssetsSlide };
