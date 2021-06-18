import * as schemas from './schema';
import * as validator from './validate';

var data = [
  {
    numberVerification: [
      {
        longNumber: 281474976710655,
      },
    ],
  },
  {
    metaData: [
      {
        name: 'cyVisualProperties',
        elementCount: 3,
        version: '1.0',
        consistencyGroup: 1,
      },
      {
        name: 'nodes',
        elementCount: 155,
        idCounter: 155,
        version: '1.0',
        consistencyGroup: 1,
      },
      {
        name: 'edges',
        elementCount: 312,
        idCounter: 312,
        version: '1.0',
        consistencyGroup: 1,
      },
      {
        name: 'networkAttributes',
        elementCount: 14,
        idCounter: 14,
        version: '1.0',
        consistencyGroup: 1,
      },
      {
        name: 'nodeAttributes',
        elementCount: 330,
        idCounter: 330,
        version: '1.0',
        consistencyGroup: 1,
      },
      {
        name: 'edgeAttributes',
        elementCount: 3120,
        idCounter: 3120,
        version: '1.0',
        consistencyGroup: 1,
      },
      {
        name: 'cartesianLayout',
        elementCount: 155,
        idCounter: 156,
      },
    ],
  },
  {
    status: [
      {
        error: '',
        success: true,
      },
    ],
  },
];

validator.validateSchema(schemas._networkArr, data);
