const path = require("path");
const fs = require("fs/promises");
const fse = require("fs-extra");
const os = require("os");

const isOsx = process.platform === "darwin";

const EXTENSIONS_CODEPRES = Object.freeze(["md", "css", "json"]);

/*  const MARKDOWN_INCLUSIONS = Object.freeze(
  MARKDOWN_EXTENSIONS.map((x) => "*." + x)
); */

/**
 * Returns true if the filename matches one of the markdown extensions.
 *
 * @param {string} filename Path or filename
 */
const hasMarkdownExtension = (filename) => {
  if (!filename || typeof filename !== "string") return false;
  return MARKDOWN_EXTENSIONS.some((ext) =>
    filename.toLowerCase().endsWith(`.${ext}`)
  );
};

/**
 * Return a array of file inside a directory
 * @async
 * @param {String} dir path directory
 * @returns {String[]}
 */
async function listFilesTmp(dir) {
  const directoryPath = dir;
  console.log(directoryPath);
  try {
    //passsing directoryPath and callback function
    const files = await fs.readdir(directoryPath);
    return files;
  } catch (error) {
    return console.log("Unable to scan directory: " + error);
  }
}

/**
 * Test whether or not the given path exists.
 *
 * @param {string} p The path to the file or directory.
 * @returns {boolean}
 */
const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Returns true if the path is a file with read access.
 *
 * @param {string} filepath The file path.
 */
const isFile = (filepath) => {
  try {
    return fs.existsSync(filepath) && fs.lstatSync(filepath).isFile();
  } catch (_) {
    return false;
  }
};

/**
 * Check if a important file for a prez are present
 * @param {String[]} files
 * @returns
 */
function checkFilePres(files) {
  let validCheckEnum = 0;
  EXTENSIONS_CODEPRES.forEach((elm) => {
    validCheckEnum = files.some((f) => f.includes(elm))
      ? validCheckEnum + 1
      : +0;
  });
  return validCheckEnum == 3;
}

async function getContentFile(dir, ext) {
  //* Done: check if ext is include in
  if (!EXTENSIONS_CODEPRES.includes(ext)) return;

  //* Done:  check if file with this extension exist in a file
  let files = await listFilesTmp(dir);
  let fileName;
  for (const file of files) {
    if (file.match(new RegExp(`\.${ext}$`, "gmi"))) {
      fileName = file;
      break;
    }
  }

  // TODO: get content of this file

  let data = await fs.readFile(path.join(dir, fileName), "utf8");
  return data;
}

/* try {
  getContentFile(
    path.join(os.tmpdir(), path.join("codePrez", "example-presentation")),
    "css"
  );
} catch (error) {
  console.log(error);
} */

module.exports = { listFilesTmp, getContentFile, exists, checkFilePres };
