import fs from "fs";
import path from "path";

const isOsx = process.platform === "darwin";

export const MARKDOWN_EXTENSIONS = Object.freeze([
  "markdown",
  "mdown",
  "mkdn",
  "md",
  "mkd",
  "mdwn",
  "mdtxt",
  "mdtext",
  "text",
  "txt",
]);

export const MARKDOWN_INCLUSIONS = Object.freeze(
  MARKDOWN_EXTENSIONS.map((x) => "*." + x)
);

export const STYLE_EXTENSIONS = Object.freeze(["css", "scss"]);

/**
 * Returns true if the filename matches one of the markdown extensions.
 *
 * @param {string} filename Path or filename
 */
export const hasMarkdownExtension = (filename) => {
  if (!filename || typeof filename !== "string") return false;
  return MARKDOWN_EXTENSIONS.some((ext) =>
    filename.toLowerCase().endsWith(`.${ext}`)
  );
};
