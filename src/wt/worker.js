import { Transform } from "stream";
import { parentPort } from "worker_threads";

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  console.log("sendResult");
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const value = nthFibonacci(Number(chunk.toString()));
      callback(null, value.toString());
      console.log("transform");
    },
  });
  // Обработчик события 'message' для чтения данных из основного потока
  parentPort.on("message", (message) => {
    // Помещаем данные в поток преобразования
    console.log("parentPort.on message", message);
    transformStream.write(message.toString());
  });
  parentPort.on("close", () => {
    console.log("parentPort.on close");
    transformStream.end();
  });
  // Обработчик события 'finish' для отправки результатов в основной поток
  transformStream.on("finish", () => {
    console.log("transformStream.on finish");
    const transformedData = transformStream.read();
    parentPort.postMessage(transformedData);
  });
};

sendResult();
