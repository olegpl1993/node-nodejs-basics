const parseEnv = () => {
  for (const [key, value] of Object.entries(process.env).filter(([key]) =>
    key.startsWith("RSS_")
  )) {
    console.log(`${key}=${value};`);
  }
};

parseEnv();
