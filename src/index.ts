export * from './i18n';
import * as validator from './validate';
export * from './models/index';

import * as fs from 'fs';

const file = fs.readFileSync('D:\\CX-Typescript\\test\\networks\\DrugBank - Carrier drugs.cx', 'utf-8');

const result = validator.validateCxData(file);

result.map((error) => {
  console.log(error.aspectName);
  console.log(error.message);
  console.log(error.loc);
});
