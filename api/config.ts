// config.js
import path from 'path';

interface Config {
  projectRoot: string;
}

const config: Config = {
  projectRoot: path.resolve(__dirname),
}

export default config;
