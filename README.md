## Introduction:
Biological signaling pathways, or biological networks in general form the basis of many bioinformatics
analyzes. In order to be able to formally capture the complex relationships in these networks, various
standards have been established, including the JSON-based Cytoscape Exchange (CX) format. Even if JSON
is the standard format for data exchange in web applications, it is often difficult to ensure that the schema,
structure and relationships are correctly implemented. The aim of this work is to model the data structure and
dependencies in Typescript, to test them on official networks and to give a statistical overview of the
elements used therein.

## Demo
https://frankkramer-lab.github.io/CX-Typescript/

## Install
```
npm install cx-typescript
```

## Getting started
This packages is built as an npm service to handle error validation and data structuring for CX file formats.
It is intended to be used for web server and front-end development that's why we used these configuration:

- **target:** We want to compile to **es5** since we want to build a package with browser compatibility.
- **module:** Use commonjs for compatibility.

If you want to use this service as an independent npm package in your project you need to do these steps:
```
npm install cx-typescript
```
then you need to install the dependent packages:
```
npm install ajv
npm install ajv-errors
npm install json-source-map
npm install localized-strings
```

### Validation 
Using json-schema approach we validated the structure of CX files, by creating a json schema for each aspect with its corresponding set of elements.
Schemas can be found in [src/schema](https://github.com/frankkramer-lab/CX-Typescript/tree/main/src/schema).
Using ajv-errors we were able to define our own custom error messages, as well the ability to change the error message language (using localized-strings).
We tried to get the errors to be as detailed as possible, that is why we are using the combination of ajv and json-source-map to get the location of the error inside the CX file.

We also checked the validity of relationships between different aspects using their internal ids.

**P.S** Please make sure to pass the CX file as a string to the `validateCxData` method because `json-pointer` is handling the parsing in order to get error locations.
 
**Error validation example**

If you want to check that the package works you can change this [line](https://github.com/frankkramer-lab/CX-Typescript/blob/main/test/networks/DrugBank%20-%20Carrier%20drugs.cx#L5) into `"longNumber": true` and it should return an error like this:

```
[
    {
        "aspectName": "numberVerification",
        "message": "\"longNumber\" must be of type \"number\"",
        "loc": [
            {
                "value": {
                    "line": 1,
                    "column": 38,
                    "pos": 38
                },
                "valueEnd": {
                    "line": 1,
                    "column": 43,
                    "pos": 43
                },
                "key": {
                    "line": 1,
                    "column": 25,
                    "pos": 25
                },
                "keyEnd": {
                    "line": 1,
                    "column": 37,
                    "pos": 37
                }
            }
        ]
    }
]
```
