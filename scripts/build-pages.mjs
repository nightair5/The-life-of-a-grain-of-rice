import { readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(projectRoot, "index.html");
const appIndexPath = resolve(projectRoot, "index.app.html");

function runViteBuild() {
  const viteBin = resolve(projectRoot, "node_modules", "vite", "bin", "vite.js");

  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(process.execPath, [viteBin, "build"], {
      cwd: projectRoot,
      stdio: "inherit",
    });

    child.on("error", rejectPromise);
    child.on("exit", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      rejectPromise(new Error(`vite build failed with exit code ${code}`));
    });
  });
}

const githubPagesIndex = await readFile(indexPath, "utf8");
const appIndex = await readFile(appIndexPath, "utf8");

try {
  await writeFile(indexPath, appIndex);
  await runViteBuild();
} finally {
  await writeFile(indexPath, githubPagesIndex);
}
