//@ts-check

/**
 * Archiver Module
 *
 * @module /archives.js
 *
 * @description Module qui réunis les fonction qiui permettent de  decompresser/compresser des fichier codePree
 */

// require modules
const fs = require("fs");
const archiver = require("archiver");
const extract = require("extract-zip");
const path = require("path");

/**
 * unzip a file
 * @param {String} sourceFile path of origin
 * @param {String} targetDir  path of destination
 */
async function unzip(sourceFile, targetDir) {
  try {
    await extract(sourceFile, {
      dir: path.resolve(targetDir),
    });
    console.log("Extraction complete");
  } catch (err) {
    console.error(err);
    // handle any errors
  }
}

async function convertToCodePrez() {}

/**
 * Compresser un dossier et le transformer en codeprez
 * @param {*} sourceDir
 * @param {*} fileName
 */
async function toZip(sourceDir, fileName) {
  // create a file to stream archive data to.
  const output = fs.createWriteStream(
    path.resolve("../../public/content/" + fileName)
  );
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  output.on("end", function () {
    console.log("Data has been drained");
  });

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      // log warning
    } else {
      // throw error
      throw err;
    }
  });

  // good practice to catch this error explicitly
  archive.on("error", function (err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(path.resolve(sourceDir), false);

  /*   // append files from a glob pattern
  archive.glob("file*.txt", { cwd: __dirname }); */

  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize();
}
/* 
unzip(
  "../../public/content/compressed/example-presentation.codeprez",
  "../../public/content"
); */

module.exports = { unzip, convertToCodePrez, toZip };
