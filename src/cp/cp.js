import { fork } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url); // путь к текущему файлу
  const __dirname = dirname(__filename); // путь к текущей папке
  const pathToFiles = join(__dirname, "files"); // путь к целевой папке
  const pathToFile = join(pathToFiles, "script.js"); // путь к целевому файлу
  fork(pathToFile, args); // создание дочернего процесса
};

spawnChildProcess(["someArgument1", "someArgument2", "someArgument3"]);
