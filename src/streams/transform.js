import { Transform } from "stream";

const transform = async () => {
  // создание потока преобразования
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const reverseData = chunk.toString().split('').reverse().join(''); // переворачиваем строку
      process.stdout.write(reverseData); // Выводим результат в консоль
      callback(); // завершение обработки текущего фрагмента данных
    },
  });
  process.stdin.pipe(transformStream);
};

await transform();
