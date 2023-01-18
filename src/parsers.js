import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';



const parser = (fileName) => { // принимает имя файла => возвращает объект содержимого в файле
    const extension = path.extname(fileName);
    const getPath = path.resolve(fileName);
    return extension === '.json' ? JSON.parse(fs.readFileSync(getPath, 'utf8')) : (extension === '.yaml' || extension === '.yml' ? yaml.load(fs.readFileSync(getPath, 'utf8')) : false);
}


export { parser }