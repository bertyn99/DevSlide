import { spawn } from "child_process";

const vite = spawn("npm", ["run", "dev"]);
let electron;
vite.stdout.on("data", (data) => {
  const str = data.toString();
  if (str.includes("ready in ")) {
    electron = spawn("npm", ["run", "electron:start"]);
    electron.stdout.pipe(process.stdout);
    electron.stdout.pipe(process.stderr);
  }
});
vite.stdout.pipe(process.stdout);
vite.stdout.pipe(process.stderr);
