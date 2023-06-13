import { access, constants, readFile } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "fileToRead.txt"); // путь к целевому файлу
  // проверка существования файла
  access(pathToFile, constants.F_OK, (error) => {
    if (error) {
      throw new Error("FS operation failed");
    } else {
      // чтение файла и вывод содержимого в консоль
      readFile(pathToFile, "utf8", (err, data) => {
        console.log(data);
      });
    }
  });
};

await read();
