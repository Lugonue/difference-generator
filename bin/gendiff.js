#!/usr/bin/env node

import { program } from 'commander';
import { compareData } from '../src/flatDiffGen.js';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filepath1,filepath2) => {
    console.log(compareData(filepath1, filepath2));
  })
  

program.parse();
