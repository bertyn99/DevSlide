import { marked } from "marked";
import { promises } from "fs";

function markedDownToHtml(data) {
  return marked(data);
}

async function getData(url) {
  let data = await promises.readFile(url, "utf8");
  console.log(data);
  return data;
}

function splitSlide(data) {
  const slide = data.split("---");
  console.log(slide);
  return slide;
}

const slides = splitSlide(await getData("../../public/content/test/pres.md"));
console.log(markedDownToHtml(slides[1]));
