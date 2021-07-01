import * as validator from './validate';
import * as fs from 'fs';

const file = fs.readFileSync('D:\\CX-Typescript\\test\\DrugBank - Carrier drugs.cx', 'utf-8');

const result = validator.validateDataAgainstSchema(file);

result.map((error) => {
    console.log(error.aspectName);
    console.log(error.message);
    console.log(error.loc);
});
