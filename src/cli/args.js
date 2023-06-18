const parseArgs = () => {
  const args = process.argv.slice(2);
  const arr = [];
  for (let i = 0; i < args.length; i += 2) {
    arr.push(`${args[i].slice(2)} is ${args[i + 1]}`);
  }
  console.log(arr.join(", "));
};

parseArgs();
