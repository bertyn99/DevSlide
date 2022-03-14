const { BrowserWindow } = require("electron");
const appMenu = [
  {
    label: "Fichier",
    submenu: [
      {
        label: "Ouvrir",
        accelerator: "Ctrl+O",
      },
      {
        label: "New presentation",
        accelerator: "Ctrl+N",
      },
      {
        label: "Sauvegarder",
        accelerator: "Ctrl+S",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("save-file", {});
        },
      },
      {
        label: "Preview",
        accelerator: "Ctrl+P",
        click: () => {
          createPreviewWindow(BrowserWindow.getFocusedWindow());
        },
      },
      {
        label: "Basculer le plein ecran",
        accelerator: "F11",
        click: () => {
          const win = BrowserWindow.getFocusedWindow();
          win.setFullScreen(!win.fullScreen);
        },
      },
    ],
  },
  {
    label: "Edition",
    submenu: [
      {
        label: "Retour en arriere",
        accelerator: "Ctrl+Z",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.undo();
        },
      },
      {
        label: "Retour en avant",
        accelerator: "Ctrl+Y",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.redo();
        },
      },
      {
        label: "Copier",
        accelerator: "Ctrl+c",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.pasteAndMatchStyle();
        },
      },
      {
        label: "Cut",
        accelerator: "Ctrl+c",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.cut();
        },
      },
    ],
  },
  {
    label: "Deveoloppeur",
    submenu: [
      {
        role: "toggleDevTools",
      },
    ],
  },
];

module.exports = appMenu;
