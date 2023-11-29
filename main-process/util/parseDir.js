const path = require("path");
const fs = require("fs");
// 解析协议和结构体
function parseDir(currentDirPath, structsMap) {
  fs.readdirSync(currentDirPath, { withFileTypes: true }).forEach(function (
    dirent
  ) {
    var filePath = path.join(currentDirPath, dirent.name);
    if (dirent.isFile() && dirent.name.indexOf(".") !== 0) {
      // 如果是结构体则读取文件内容，并存放到map中
      if ((filePath.indexOf("structs/") > -1) || (filePath.indexOf("structs\\") > -1)) {
        const content = fs.readFileSync(filePath, { encoding: "utf-8" });
        try {
          const obj = JSON.parse(content)[0];
          // const formatObj = {
          //   id: obj.id,
          //   name: obj.name,
          //   properties: obj.properties,
          // };
          structsMap.push(obj);
        } catch (error) {}
      }
    } else if (dirent.isDirectory()) {
      // const item = {
      //   title: dirent.name,
      //   key: filePath.replace(prePath, "").replace(/\\/g, "/"),
      //   children: [],
      //   isDir: true,
      //   isLeaf: false,
      // };
      // fileArr.push(item);
      parseDir(filePath, structsMap);
    }
  });
}

module.exports = parseDir;
