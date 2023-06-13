import { mkdir, access, constants, readdir, copyFile } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToCopyFiles = join(__dirname, "files_copy"); // путь к копированной папке
  // проверка существования папки с файлами
  access(pathToFiles, constants.F_OK, (error) => {
    if (error) {
      throw new Error("FS operation failed");
    } else {
      // проверка существования скопированой папки
      access(pathToCopyFiles, constants.F_OK, (error) => {
        if (error) {
          // создает новую папку
          mkdir(pathToCopyFiles, { recursive: true }, (err) => {});
          // получает массив файлов вложенных в папку
          readdir(pathToFiles, { withFileTypes: true }, (err, files) => {
            // перебор массива по обьектам
            files.forEach((file) => {
              const pathToFile = join(pathToFiles, file.name); // путь к файлу
              const newPathToFile = join(pathToCopyFiles, file.name); // новый путь к файлу
              // копирует файлы в нувую папку
              copyFile(pathToFile, newPathToFile, (err) => {});
            });
          });
        } else {
          throw new Error("FS operation failed");
        }
      });
    }
  });
};

await copy();
