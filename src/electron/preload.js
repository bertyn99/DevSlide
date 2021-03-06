const path = require("path");
const { contextBridge, ipcRenderer } = require("electron");
const { unzip, toZip } = require("../services/archiver");
const {
  markedDownToHtml,
  splitSlide,
  replaceUrlAssetsSlide,
} = require("../services/marked.js");
const { getContentFile, checkFilePres } = require("../utils/check");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Escape":
      console.log("escape");
      ipcRenderer.send("fullScreenOff");
      break;
  }
});

const openFile = (callback) => {
  ipcRenderer.send("open-a-dialog");
  ipcRenderer.on("selected-file", (e, data) => {
    unzip(data[0], data[1]);
    console.log(data[1]);
    ipcRenderer.send("fullScreenOn");
    callback(path.join(data[1], path.basename(data[0], ".codeprez")));
  });
};

contextBridge.exposeInMainWorld("api", {
  sayHelloInTerminal: () => process.stdout.write("Hello\n"),
  openFile,
  markedDownToHtml,
  splitSlide,
  getContentFile,
  checkFilePres,
  replaceUrlAssetsSlide,
});
