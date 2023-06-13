import { access, constants, readdir } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const list = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  // проверка существования папки с файлами
  access(pathToFiles, constants.F_OK, (error) => {
    if (error) {
      throw new Error("FS operation failed");
    } else {
      // получает массив файлов вложенных в папку
      readdir(pathToFiles, { withFileTypes: true }, (err, files) => {
        // перебор массива по обьектам
        files.forEach((file) => {
          console.log(file.name);
        });
      });
    }
  });
};

await list();
