const { app, ipcMain, dialog } = require("electron");
const path = require("path");
const child_process = require("child_process");

function execShell (cmd) {
  try {
    const res = child_process
      .execSync(cmd, {
        cwd: protocalBasePath,
      })
      .toString();
    return { code: 0, msg: res };
  } catch (error) {
    console.log(error);
    return { code: -1, msg: error.message };
  }
}

ipcMain.handle("cmd:gitpush", async (event, msg) => {
  const cmd = `git pull && git add . && git commit -m "${msg}" && git push`;
  return execShell(cmd);
});

ipcMain.handle("cmd:gitpull", async (event) => {
  const cmd = `git pull`;
  return execShell(cmd);
});

ipcMain.handle("cmd:gitdiff", async (event) => {
  const cmd = `git diff --name-only .`;
  // const cmd = `echo 1 & cd ../ & (echo 2 && sleep 1 && echo 3)`;
  // const cmd = `pwd & cd ../ & sleep 1 & pwd`;
  const res = child_process
    .execSync(cmd, {
      cwd: protocalBasePath,
    })
    .toString();
  return res;
});
ipcMain.handle("cmd:gitlog", async (event, filePath) => {
  const wholeFilePath = path.join(protocalBasePath, filePath);
  const realPath = wholeFilePath.replace(protocalBasePath, "");
  const cmd = `git log -p .${realPath}`;
  console.log(cmd);
  const res = child_process.execSync(cmd, {
    cwd: protocalBasePath,
  });
  return res.toString();
});
ipcMain.handle("cmd:gitshow", async (event, filePath, commitid) => {
  const wholeFilePath = path.join(protocalBasePath, filePath);
  const realPath = wholeFilePath.replace(protocalBasePath, "");
  const cmd = `git show ${commitid}:.${realPath}`;
  // const cmd = `git show ${commitid}:${wholeFilePath}`;
  console.log(cmd);
  const res = child_process.execSync(cmd, {
    cwd: protocalBasePath,
  });
  return res.toString();
});
ipcMain.handle("cmd:gitstatus", async (event) => {
  const cmd = `git status`;
  const res = child_process
    .execSync(cmd, {
      cwd: protocalBasePath,
    })
    .toString();
  return res;
});

ipcMain.handle("cmd:git", async (event, detailCmd) => {
  const cmd = `git ${detailCmd}`;
  const res = child_process
    .execSync(cmd, {
      cwd: protocalBasePath,
    })
    .toString();
  return res;
});