import { createReadStream, createWriteStream } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "fileToCompress.txt"); // путь к целевому файлу
  const pathToZipFile = join(pathToFiles, "archive.gz"); // путь к сжатому файлу

  const readStream = createReadStream(pathToFile); // создание потока чтения
  const writeStream = createWriteStream(pathToZipFile); // создание потока записи
  const gzip = createGzip(); // создание потока сжатия
  readStream.pipe(gzip).pipe(writeStream); // читает файл, передает в поток сжатия, передает в поток записи
};

await compress();