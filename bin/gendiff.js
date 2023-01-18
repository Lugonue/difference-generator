#!/usr/bin/env node

import { program } from 'commander';
import { compareFiles } from '../src/compareFiles.js';
import { stylish } from '../src/stylish.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filepath1, filepath2) => {
    if (program.opts().format === 'stylish') console.log(stylish(compareFiles(filepath1, filepath2)));
  })

program.parse();


