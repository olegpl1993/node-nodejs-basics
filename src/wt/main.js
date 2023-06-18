import { Worker } from "worker_threads";
import { cpus } from "os";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFile = join(__dirname, "worker.js"); // путь к целевому файлу
  const numThreads = cpus().length; // кол-во ядер процессора

  const workerPromises = [];
  for (let i = 0, j = 10; i < numThreads; i++, j++) {
    const worker = new Worker(pathToFile); // создание рабочего потока
    worker.postMessage(j);
    const workerPromise = new Promise((resolve) => {
      console.log(i, " = ", j);
      worker.on("message", () => {
        console.log("worker.on");
        resolve;
      });
    });
    workerPromises.push(workerPromise);
  }
  const results = await Promise.all(workerPromises);
  console.log("results", results);
};

await performCalculations();
