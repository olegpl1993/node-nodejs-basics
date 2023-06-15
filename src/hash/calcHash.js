import { createHash } from "crypto";
import { readFile } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "fileToCalculateHashFor.txt"); // путь к целевому файлу
  // чтение файла
  readFile(pathToFile, "utf8", (err, data) => {
    const hash = createHash("sha256").update(data).digest("hex"); // вычисление хэша SHA256
    console.log(hash);
  });
};

await calculateHash();
