const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
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

const openNewFile = async () => {
  try {
    const open = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
      title: "Ouvrir une présentation",
      buttonLabel: "Ouvrir",
      properties: ["openFile"],
    });

    if (!open.canceled) {
      return open.filePaths;
    }
    return null;
  } catch (error) {}
};

ipcMain.on("open-a-dialog", async (e) => {
  const file = await openNewFile();
  e.reply("selected-file", [file[0], app.getPath("temp")]);
});
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
