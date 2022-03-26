const { contextBridge, ipcRenderer } = require("electron");
const { unzip, toZip } = require("../services/archiver");
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

const openFile = (callback) => {
  ipcRenderer.send("open-a-dialog");
  ipcRenderer.on("selected-file", (e, data) => {
    unzip(data[0], data[1]);
    console.log(data[1]);
    callback(data);
  });
};

contextBridge.exposeInMainWorld("api", {
  sayHelloInTerminal: () => process.stdout.write("Hello\n"),
  openFile,
});
