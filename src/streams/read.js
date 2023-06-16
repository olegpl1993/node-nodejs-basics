import { createReadStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "fileToRead.txt"); // путь к целевому файлу

  let data = ""; // переменная для записи содержимого файла
  const readableStream = createReadStream(pathToFile); // создание потока

  // чтение файла с помощью потока
  readableStream.on("data", (chunk) => {
    data += chunk; // запись в переменную
  });

  // после завершения работы потока
  readableStream.on("end", () => {
    process.stdout.write(data); // вывод переменной в консоль
  })
};

await read();
