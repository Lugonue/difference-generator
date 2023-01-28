import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parser = (fileName) => {
  const extension = path.extname(fileName);
  const getPath = path.resolve(fileName);

  if (extension === '.json') return JSON.parse(fs.readFileSync(getPath, 'utf8'));
  if (extension === '.yaml' || extension === '.yml') return yaml.load(fs.readFileSync(getPath, 'utf8'));
  throw new Error('Invalid file extantion!');
};
export default parser;
