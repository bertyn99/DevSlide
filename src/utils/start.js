const { spawn } = require("child_process");
const os = require("os");

let cmd = "npm";
if (os.platform() === "win32") {
  cmd = "npm.cmd";
}

const vite = spawn(cmd, ["run", "dev"]);
let electron;
vite.stdout.on("data", (data) => {
  const str = data.toString();
  if (str.includes("ready in ")) {
    electron = spawn(cmd, ["run", "electron:start"]);
    electron.stdout.pipe(process.stdout);
    electron.stderr.pipe(process.stderr);
  }
});
vite.stdout.pipe(process.stdout);
vite.stderr.pipe(process.stderr);
