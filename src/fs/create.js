import { writeFile, access, constants } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const create = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToNewFile = join(pathToFiles, "fresh.txt"); // путь к создаваемому файлу
  // проверка существования файла
  access(pathToNewFile, constants.F_OK, (error) => {
    if (error) {
      // создает файл c текстом
      writeFile(pathToNewFile, "I am fresh and young", (err) => {});
    } else {
      throw new Error("FS operation failed");
    }
  });
};

await create();
