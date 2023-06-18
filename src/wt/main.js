import { Worker } from "worker_threads";
import { cpus } from "os";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFile = join(__dirname, "worker.js"); // путь к целевому файлу
  const numThreads = cpus().length; // кол-во ядер процессора

  const finalOutput = [];
  const runWorker = async (j) => {
    return new Promise((resolve) => {
      const worker = new Worker(pathToFile); // создание рабочего потока
      worker.postMessage(j); // передача данных в воркер

      // получение данных из воркера
      worker.on("message", (data) => {
        finalOutput.push({ status: "resolved", data: data });
        resolve();
      });

      // получение ошибки из воркера
      worker.on("error", () => {
        finalOutput.push({ status: 'error', data: null });
        resolve();
      });
    });
  };

  for (let i = 0; i < numThreads; i++) {
    await runWorker(i + 10);
  }

  console.log(finalOutput);
};

await performCalculations();
