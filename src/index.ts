import * as validator from './validate';
import * as fs from 'fs';
export * from './models/index';

const file = fs.readFileSync('D:\\CX-Typescript\\test\\networks\\Fanconi Anemia Gene Ontology (FangO).cx', 'utf-8');

const result = validator.validateCxData(file);

result.map((error) => {
    console.log(error.aspectName);
    console.log(error.message);
    console.log(error.loc);
});
