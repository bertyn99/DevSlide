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

getData("../../public/content/test/pres.md");
