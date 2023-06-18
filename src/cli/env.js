const parseEnv = () => {
  const arr = [];
  for (const [key, value] of Object.entries(process.env).filter(([key]) =>
    key.startsWith("RSS_")
  )) {
    arr.push(`${key}=${value}`);
  }
  console.log(arr.join("; "));
};

parseEnv();
