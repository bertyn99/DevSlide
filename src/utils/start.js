const { spawn, exec } = require("child_process");
const { createInterface } = require("readline");
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
const relaunchElectron = () => {
  if (electron) {
    if (os.platform() === "win32") {
      console.log(electron.pid);
      electron.on("error", (err) => {
        console.log(err);
      });
      /* exec("taskkill /pid " + electron.pid + " /T /F", (err, data) => {
        console.log(err);
      }); */
    }
    electron.kill();

    electron = null;
  }
  electron = spawn(cmd, ["run", "electron:start"]);
  electron.stdout.pipe(process.stdout);
  electron.stderr.pipe(process.stderr);
};

let rl = createInterface(process.stdin, process.stdout);

const reloadLoop = () => {
  const answer = rl.question("", (answer) => {
    if (answer == "rl") {
      relaunchElectron();
    }
    reloadLoop();
  });
};

reloadLoop();
