// Native
import { join } from 'path'
import { format } from 'url'
// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

const path = require("path");

let mainWindow: any = null;
let subpy: NodeRequire | null = null;

const PY_EXE_FILE = path.join(
  __dirname, "dist-python/app.exe"
);

const PY_ENTRY_FILE = path.join(
  __dirname, "web/app.py"
);

const startPythonSubprocess = () => {
  if (app.isPackaged) {
    subpy = require("child_process").execFile(PY_EXE_FILE, []);
  } else {
    subpy = require("child_process").spawn("python", [PY_ENTRY_FILE]);
  }
};

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
      pathname: join(__dirname, '../renderer/out/index.html'),
      protocol: 'file:',
      slashes: true,
    })

  mainWindow.loadURL(url)
};


// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')
  createMainWindow();
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (subpy == null)
    startPythonSubprocess();

  if (mainWindow === null)
    createMainWindow();
});
