import { access, constants, unlink } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "fileToRemove.txt"); // путь к целевому файлу
  // проверка существования файла
  access(pathToFile, constants.F_OK, (error) => {
    if (error) {
      throw new Error("FS operation failed");
    } else {
      // удаление файла
      unlink(pathToFile, (err) => {});
    }
  });
};

await remove();
