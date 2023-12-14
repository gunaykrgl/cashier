import path from 'path';

interface Config {
  projectRoot: string;
  DBSOURCE: string;

}

const config: Config = {
  projectRoot: path.resolve(__dirname),
  DBSOURCE: path.join(path.resolve(__dirname), "db", "db.sqlite")
}

export default config;
