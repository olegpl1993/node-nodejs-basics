import { createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const write = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "fileToWrite.txt"); // путь к целевому файлу

  const writableStream = createWriteStream(pathToFile, { flags: "a" }); // создание потока записи в файл
  process.stdin.setEncoding("utf8"); // установка кодировки ввода
  // слушает ввод в консоль
  process.stdin.on("data", (chunk) => {
    writableStream.write(chunk); // передает информацию из ввода в поток записи
  });
};

await write();
