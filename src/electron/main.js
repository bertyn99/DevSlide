const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const appMenu = require("./contextMenu.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.NODE_ENV !== "production") {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadURL("file:../../dist/index.html");
  }
}
Menu.setApplicationMenu(Menu.buildFromTemplate(appMenu));

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
