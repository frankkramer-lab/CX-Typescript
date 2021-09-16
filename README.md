## Introduction:
Biological signaling pathways, or biological networks in general form the basis of many bioinformatics analyzes. In order to be able to formally capture the complex relationships in these networks, various standards have been established, including the JSON-based Cytoscape Exchange (CX) format. Even if JSON is the standard format for data exchange in web applications, it is often difficult to ensure that the schema, structure and relationships are correctly implemented. The aim of this work is to model the data structure and dependencies in Typescript, to test them on official networks and to give a statistical overview of the elements used therein.

## Demo
https://frankkramer-lab.github.io/CX-Typescript/

## Getting started
This project was generated with Angular CLI version 12.1.2.

This website was build as an interface for the [CX-Typescript](https://github.com/frankkramer-lab/CX-Typescript) npm package.

This website can be used by researchers to:
- Validate their uploaded networks.
- Run a statistics based on downloaded set of networks.
- Check networks information.

## Development server
Run `npm install` to download required packages.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## Next Step
- [Further progression](https://github.com/frankkramer-lab/CX-Typescript/issues/8)
- Integrate this website with [NDExEdit](https://github.com/frankkramer-lab/NDExEdit)
