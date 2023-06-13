import fs, { access, constants } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const rename = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "wrongFilename.txt"); // путь к целевому файлу
  const pathToRenamedFile = join(pathToFiles, "properFilename.md"); // путь к перменному файлу
    // проверка существования целевого файла
    access(pathToFile, constants.F_OK, (error) => {
      if (error) {
        throw new Error("FS operation failed");
      } else {
        // проверка существования переименованого файла
        access(pathToRenamedFile, constants.F_OK, (error) => {
          if (error) {
            fs.rename(pathToFile, pathToRenamedFile, (err) => {})
          } else {
            throw new Error("FS operation failed");
          }
        });
      }
    });
};

await rename();