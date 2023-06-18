import { Transform } from "stream";
import { parentPort } from "worker_threads";

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // поток трансформатор
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const value = nthFibonacci(Number(chunk.toString()));
      callback(null, value.toString());
    },
  });

  // данных из основного потака направляет в поток трансформатор
  parentPort.on("message", (message) => {
    transformStream.write(message.toString());
  });

  // данные из трансформатора направляются в основный поток
  transformStream.on("data", (transformedData) => {
    parentPort.postMessage(transformedData.toString());
  });

  // разкоментировать для проверки на ошибку
  //if (Math.random() < 0.5) throw new Error("Error worker");
};

sendResult();
