// require modules
import fs from "fs";
import archiver from "archiver";
import extract from "extract-zip";
import path from "path";

async function main() {
  try {
    await extract(
      "../../public/content/compressed/example-presentation.codeprez",
      {
        dir: path.resolve("../../public/content"),
      }
    );
    console.log("Extraction complete");
  } catch (err) {
    console.error(err);
    // handle any errors
  }
}

// create a file to stream archive data to.
// var output = fs.createWriteStream(__dirname + "/example.zip");
//Set the compression format to zip
// var archive = archiver("zip", {
//  zlib: { level: 9 }, // Sets the compression level.
//});
main();
