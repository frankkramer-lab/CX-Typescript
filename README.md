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

## Features
Users can go to [Editor](https://frankkramer-lab.github.io/CX-Typescript/editor), and either select a CX file from theire local device, or insert the UUID of a network from [NDEX](https://ndexbio.org/)

After a successful upload, the network will appear in the Available networks list, users then can:

- Show the network in the editor for a better read of the file
- Check the network information
- Check some statistics about the uploaded network
- See errors list

The website also offers the ability to directly search NDEx networks using the [Search on NDEx](https://frankkramer-lab.github.io/CX-Typescript/search) page. the user can search using the netowrk, user or group name.
A list of networks will show up, then users can select some of the networks to then download them, or download all the networks from the search result.

Finally the website offers a general statistics based on all the networks that the user have downloaded

## Next Step
- [Further progression](https://github.com/frankkramer-lab/CX-Typescript/issues/8)
- Integrate this website with [NDExEdit](https://github.com/frankkramer-lab/NDExEdit)
