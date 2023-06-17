import { createReadStream, createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createUnzip } from "zlib";

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "archive.gz"); // путь к целевому файлу
  const pathToZipFile = join(pathToFiles, "fileToCompress.txt"); // путь к разжатому файлу

  const readStream = createReadStream(pathToFile); // создание потока чтения
  const writeStream = createWriteStream(pathToZipFile); // создание потока записи
  const unzip = createUnzip(); // создание потока разжатия
  readStream.pipe(unzip).pipe(writeStream); // читает файл, передает в поток разжатия, передает в поток записи
};

await decompress();