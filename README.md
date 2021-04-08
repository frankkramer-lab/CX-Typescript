# Create a Typescript package for CX networks

The Cytoscape Exchange (CX) format is a flexible JSON based data structure for transmission of biological networks. Although JSON is a standard format for data exchange in web applications, working with it holds some pitfalls, especially if the structure must follow a strict and complex scheme. 

In modern web application frameworks, Typescript is used, because it features compile-time type checking, classes and modules. These features can be used to create a model of the CX data structur.

Tasks:
* Develop a Typescript module, that represents the CX data structure definition
* Test the package on some (provided) CX networks
* (Optional) Generate a usage statistics of CX aspects and properties within the official NDEx networks (User: ndexbuttler)
* (Optional) Deploy the module as NPM module

Further reading:
* The CX data model: https://home.ndexbio.org/data-model/
* Typescript: https://www.typescriptlang.org/
* Typescript package development: https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c
* NDEx: http://ndexbio.org/
