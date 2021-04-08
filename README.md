# Create a Typescript package for CX networks

## Introduction:
Biological signaling pathways, or biological networks in general form the basis of many bioinformatics
analyzes. In order to be able to formally capture the complex relationships in these networks, various
standards have been established, including the JSON-based Cytoscape Exchange (CX) format. Even if JSON
is the standard format for data exchange in web applications, it is often difficult to ensure that the schema,
structure and relationships are correctly implemented. The aim of this work is to model the data structure and
dependencies in Typescript, to test them on official networks and to give a statistical overview of the
elements used therein.

## Range of tasks:
* Implement a Typescript-module representing the CX data structure definition
* Compile statistics of the usage of the different aspects, and their properties within the official NDEx networks
* Testing the module on selected networks
* Integration of the module within a website for the analysis/error recognition of CX files and visualization of the results
* (Optional) Publish the created Typescript module as a NPM package

# Further reading:
* The CX data model: https://home.ndexbio.org/data-model/
* Typescript: https://www.typescriptlang.org/
* Typescript package development: https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c
* NDEx: http://ndexbio.org/

A good starting point is definitely the NDEx developing website:

https://home.ndexbio.org/readme-developers-best-practices/
