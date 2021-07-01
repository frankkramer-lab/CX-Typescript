import {
  _cartesianLayoutArr,
  _cyGroupArr,
  _edgesArr,
  _metaDataArr,
  _network,
  _nodeAttributesArr,
  _nodes,
  _nodesArr,
  _numberVerificationArr,
  _statusArr,
  dataTypes,
  _cyVisualPropertiesArr,
  _cySubNetworksArr,
} from '../src/schema';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';
import { AspectCore, AspectCytoscape, AspectSettings } from '../src/helpers/enums/aspects.enum';

let ajv = validator.getAjvInstance();

/******************  Network ******************/

describe.skip('network schema', () => {
  const validate = ajv.compile(_network);
  let network: any;

  it('should fail if has empty object', () => {
    // arrange
    network = [{}];
    const valid = validate(network);

    // assert
    expect(valid).toBeFalsy();
  });

  it("should fail if metaData has 'nodes' name, but 'nodes' aspect is missing ", () => {
    // arrange
    network = [
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
            name: 'nodes',
            elementCount: 3,
            version: '1.0',
            consistencyGroup: 1,
          },
          {
            name: 'edges',
            elementCount: 3,
            version: '1.0',
            consistencyGroup: 1,
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
    const valid = validate(network);

    // assert
    expect(valid).toBeFalsy();
  });
});

/******************  Number Verification ******************/
describe.skip('number Verification schema', () => {
  const validate = ajv.compile(_numberVerificationArr);
  let numberVerification: any;
  it('should fail if longNumber property is missing', () => {
    // arrange
    numberVerification = [{}];

    // act
    validate(numberVerification);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectSettings.NUMBER_VERIFICATION, '"longNumber"'));
  });

  it('should fail if longNumber property is not of number type', () => {
    // arrange
    numberVerification = [
      {
        longNumber: 'this is not a number type',
      },
    ];

    // act
    validate(numberVerification);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(
      i18.getErrorMessage('type_is_number', AspectSettings.NUMBER_VERIFICATION, '"longNumber"'),
    );
  });

  it('should fail if number verification property is not an array type', () => {
    // arrange
    numberVerification = {
      longNumber: 'this is not a number type',
    };

    // act
    validate(numberVerification);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(
      i18.getErrorMessage('type_is_array', AspectSettings.NUMBER_VERIFICATION, '"number verification"'),
    );
  });

  it('should fail if number verification is not an array of objects', () => {
    // arrange
    numberVerification = ['this is not an object type'];

    // act
    validate(numberVerification);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual('must be object');
  });

  it('should fail if there are additional property', () => {
    // arrange
    numberVerification = [
      {
        longNumber: 281474976710655,
        prop: 'not supposed to be here',
      },
    ];
    // assert
    expect(validate(numberVerification)).toBeFalsy();
  });
});

/******************  Status ******************/
describe.skip('status schema', () => {
  const validate = ajv.compile(_statusArr);
  let status: any;
  it('should fail if error property is missing', () => {
    // arrange
    status = [
      {
        success: true,
      },
    ];

    // act
    validate(status);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectSettings.STATUS, '"error"'));
  });

  it('should fail if success property is missing', () => {
    // arrange
    status = [
      {
        error: '',
      },
    ];

    // act
    validate(status);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectSettings.STATUS, '"success"'));
  });

  it('should fail if error property is not of string type', () => {
    // arrange
    status = [
      {
        error: 400,
        success: true,
      },
    ];

    // act
    validate(status);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_string', AspectSettings.STATUS, '"error"'));
  });

  it('should fail if success property is not of boolean type', () => {
    // arrange
    status = [
      {
        error: '',
        success: 'true',
      },
    ];

    // act
    validate(status);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_boolean', AspectSettings.STATUS, '"success"'));
  });

  it('should fail if status property is not an array type', () => {
    // arrange
    status = {
      error: '',
      success: 'true',
    };

    // act
    validate(status);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_array', AspectSettings.STATUS, '"status"'));
  });

  it('should fail if status property is not an array of objects', () => {
    // arrange
    status = ['this is not an object type'];

    // act
    validate(status);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual('must be object');
  });

  it('should fail if there are additional property', () => {
    // arrange
    status = [
      {
        error: '',
        success: true,
        prop: 'not supposed to be here',
      },
    ];
    // assert
    expect(validate(status)).toBeFalsy();
  });
});

/******************  MetaData ******************/
describe.skip('metaData schema', () => {
  const validate = ajv.compile(_metaDataArr);
  let metaData: any;

  it('should fail if name and version properties are missing', () => {
    // arrange
    metaData = [{}];

    // act
    validate(metaData);
    let errorMessage = validate.errors?.map((error) => error.message);

    // assert
    expect(errorMessage).toEqual([
      i18.getErrorMessage('required', AspectSettings.METADATA, '"name"'),
      i18.getErrorMessage('required', AspectSettings.METADATA, '"version"'),
    ]);
  });

  it('should fail if name property is missing', () => {
    // arrange
    metaData = [
      {
        version: '1.0',
      },
    ];

    // act
    validate(metaData);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectSettings.METADATA, '"name"'));
  });

  it('should fail if version property is missing', () => {
    // arrange
    metaData = [
      {
        name: 'Citation',
      },
    ];

    // act
    validate(metaData);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectSettings.METADATA, '"version"'));
  });

  it('should fail if name property is not of string type', () => {
    // arrange
    metaData = [
      {
        name: 90,
        version: '1.0',
        consistencyGroup: 1,
        properties: [{ name: 'curator', value: 'Ideker Lab' }],
      },
    ];

    // act
    validate(metaData);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_string', AspectSettings.METADATA, '"name"'));
  });

  it('should fail if version property is not of string type', () => {
    // arrange
    metaData = [
      {
        name: 'Citation',
        version: 1.0,
        consistencyGroup: 1,
        properties: [{ name: 'curator', value: 'Ideker Lab' }],
      },
    ];

    // act
    validate(metaData);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_string', AspectSettings.METADATA, '"version"'));
  });

  it('should fail if metaData property is not an array type', () => {
    // arrange
    (metaData = {
      name: 'Citation',
      version: 1.0,
      consistencyGroup: 1,
      properties: [{ name: 'curator', value: 'Ideker Lab' }],
    }),
      // act
      validate(metaData);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_array', AspectSettings.METADATA, '"metaData"'));
  });

  it('should fail if metaData property is not an array of objects', () => {
    // arrange
    metaData = ['this is not an object type'];

    // act
    validate(metaData);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual('must be object');
  });

  it('should fail if there are additional property', () => {
    // arrange
    metaData = [
      {
        name: 'Citation',
        version: 1.0,
        lastUpdate: 1034334343,
        consistencyGroup: 1,
        properties: [{ name: 'curator', value: 'Ideker Lab' }],
        prop: 'not supposed to be here',
      },
    ];

    // assert
    expect(validate(metaData)).toBeFalsy();
  });
});

/****************** Nodes ******************/
describe.skip('nodes schema', () => {
  const validate = ajv.compile(_nodesArr);
  let nodes: any;

  it('should fail if @id property is missing', () => {
    // arrange
    nodes = [
      {
        n: 'TYK2',
        r: 'uniprot:P29597',
      },
    ];

    // act
    validate(nodes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.NODES, '"@id"'));
  });

  it('should fail if @id is not an integer', () => {
    // arrange
    nodes = [
      {
        '@id': 1.5,
        n: 'TYK2',
        r: 'uniprot:P29597',
      },
    ];

    // act
    validate(nodes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_integer', AspectCore.NODES, '"@id"'));
  });

  it('should fail if @id is not a positive integer', () => {
    // arrange
    nodes = [
      {
        '@id': -1,
        n: 'TYK2',
        r: 'uniprot:P29597',
      },
    ];
    // act
    validate(nodes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('minimum', AspectCore.NODES, '"@id"'));
  });

  it('should fail if n property is not a string', () => {
    // arrange
    nodes = [
      {
        '@id': 0,
        n: true,
        r: 'uniprot:P29597',
      },
    ];

    // act
    validate(nodes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_string', AspectCore.NODES, '"n"'));
  });

  it('should fail if r property is not a string', () => {
    // arrange
    nodes = [
      {
        '@id': 0,
        n: 'TYK2',
        r: true,
      },
    ];

    // act
    validate(nodes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_string', AspectCore.NODES, '"r"'));
  });

  it('should fail if nodes property is not an array type', () => {
    // arrange
    (nodes = {
      '@id': 0,
      n: 'TYK2',
      r: true,
    }),
      // act
      validate(nodes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_array', AspectCore.NODES, '"nodes"'));
  });

  it('should fail if nodes is not an array of objects', () => {
    // arrange
    nodes = ['this is not an object type'];

    // act
    validate(nodes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual('must be object');
  });

  it('should fail if there are additional property', () => {
    // arrange
    nodes = [
      {
        '@id': 0,
        n: 'TYK2',
        r: 'uniprot:P29597',
        prop: 'not supposed to be here',
      },
    ];
    // assert
    expect(validate(nodes)).toBeFalsy();
  });
});

/****************** Edges ******************/
describe.skip('edges schema', () => {
  const validate = ajv.compile(_edgesArr);
  let edges: any;

  it("should fail if '@id' property is missing", () => {
    // arrange
    edges = [
      {
        s: 0,
        t: 1,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.EDGES, '"@id"'));
  });

  it("should fail if '@id' is not an integer", () => {
    // arrange
    edges = [
      {
        '@id': 1.5,
        s: 0,
        t: 1,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_integer', AspectCore.EDGES, '"@id"'));
  });

  it("should fail if '@id' is not a positive integer", () => {
    // arrange
    edges = [
      {
        '@id': -1,
        s: 0,
        t: 1,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('minimum', AspectCore.EDGES, '"@id"'));
  });

  it("should fail if 's' property is missing", () => {
    // arrange
    edges = [
      {
        '@id': 1,
        t: 1,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.EDGES, '"s"'));
  });

  it("should fail if 's' is not an integer", () => {
    // arrange
    edges = [
      {
        '@id': 1,
        s: 1.5,
        t: 1,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_integer', AspectCore.EDGES, '"s"'));
  });

  it("should fail if 's' is not a positive integer", () => {
    // arrange
    edges = [
      {
        '@id': 0,
        s: -1,
        t: 1,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('minimum', AspectCore.EDGES, '"s"'));
  });

  it("should fail if 't' property is missing", () => {
    // arrange
    edges = [
      {
        '@id': 1,
        s: 0,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.EDGES, '"t"'));
  });

  it("should fail if 't' is not an integer", () => {
    // arrange
    edges = [
      {
        '@id': 1,
        s: 1,
        t: 1.5,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_integer', AspectCore.EDGES, '"t"'));
  });

  it("should fail if 't' is not a positive integer", () => {
    // arrange
    edges = [
      {
        '@id': 0,
        s: 1,
        t: -1,
      },
    ];
    // act
    validate(edges);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('minimum', AspectCore.EDGES, '"t"'));
  });

  it('should fail if there are additional property', () => {
    // arrange
    edges = [
      {
        '@id': 0,
        s: 0,
        t: 1,
        i: 'up-regulates activity',
        prop: 'not supposed to be here',
      },
    ];
    // assert
    expect(validate(edges)).toBeFalsy();
  });
});

/****************** Node, Edge, Network Attributes ******************/
/**
 * This section describe all node, edge, network Attribute Aspects because they share the same properties
 */
describe.skip('node, edge, network attributes schema', () => {
  const validate = ajv.compile(_nodeAttributesArr);
  let nodeAttributes: any[];

  it("should fail if 'po' property is missing", () => {
    // arrange
    nodeAttributes = [
      {
        n: 'member',
        v: ['hgnc.symbol:IRF9', 'hgnc.symbol:STAT1', 'hgnc.symbol:STAT2'],
        d: 'list_of_string',
      },
    ];

    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.NODE_ATTRIBUTES, '"po"'));
  });

  it("should fail if 'po' is not a integer", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1.5,
        n: 'member',
        v: ['hgnc.symbol:IRF9', 'hgnc.symbol:STAT1', 'hgnc.symbol:STAT2'],
        d: 'list_of_string',
      },
    ];

    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_integer', AspectCore.NODE_ATTRIBUTES, '"po"'));
  });

  it("should fail if 'po' is not a positive integer", () => {
    // arrange
    nodeAttributes = [
      {
        po: -1,
        n: 'member',
        v: ['hgnc.symbol:IRF9', 'hgnc.symbol:STAT1', 'hgnc.symbol:STAT2'],
        d: 'list_of_string',
      },
    ];
    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('minimum', AspectCore.NODE_ATTRIBUTES, '"po"'));
  });

  it("should fail if 'n' property is missing", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1,
        v: ['hgnc.symbol:IRF9', 'hgnc.symbol:STAT1', 'hgnc.symbol:STAT2'],
        d: 'list_of_string',
      },
    ];
    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.NODE_ATTRIBUTES, '"n"'));
  });

  it("should fail if 'n' is not a string", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1,
        n: true,
        v: ['hgnc.symbol:IRF9', 'hgnc.symbol:STAT1', 'hgnc.symbol:STAT2'],
        d: 'list_of_string',
      },
    ];
    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_string', AspectCore.NODE_ATTRIBUTES, '"n"'));
  });

  it("should fail if 'v' property is missing", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1,
        n: 'member',
        d: 'list_of_string',
      },
    ];
    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.NODE_ATTRIBUTES, '"v"'));
  });

  it("should fail if property 'd' exist and property 'v' is of type string", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1,
        n: 'member',
        v: 'hgnc.symbol:IRF9',
        d: 'list_of_string',
      },
    ];
    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message);

    // assert
    expect(errorMessage).toEqual([
      i18.getErrorMessage('type_is_array_of_string', AspectCore.NODE_ATTRIBUTES, '"v"'),
      'must match "then" schema',
    ]);
  });

  it("should fail if type of property 'd' is 'list_of_boolean' and type of property 'v' is different", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1,
        n: 'member',
        v: 'hgnc.symbol:IRF9',
        d: 'list_of_boolean',
      },
    ];
    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message);

    // assert
    expect(errorMessage).toEqual([
      i18.getErrorMessage('type_is_array_of_boolean', AspectCore.NODE_ATTRIBUTES, '"v"'),
      'must match "then" schema',
    ]);
  });

  it("should fail if type of property 'd' is not a value from the enum", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1,
        n: 'member',
        v: ['hgnc.symbol:IRF9', 'hgnc.symbol:STAT1', 'hgnc.symbol:STAT2'],
        d: 'not from enum',
      },
    ];
    // act
    validate(nodeAttributes);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('enum', AspectCore.NODE_ATTRIBUTES, `[${dataTypes.join(', ')}]`));
  });

  it("should succeed if type of property 'd' is 'list_of_string' and type of property 'v' is the same", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1,
        n: 'member',
        v: ['hgnc.symbol:IRF9', 'hgnc.symbol:STAT1', 'hgnc.symbol:STAT2'],
        d: 'list_of_string',
      },
    ];
    // assert
    expect(validate(nodeAttributes)).toBeTruthy();
  });
});

/****************** Cartesian Layout  ******************/
describe.skip('cartesian layout schema', () => {
  const validate = ajv.compile(_cartesianLayoutArr);
  let cartesianLayout: any;

  it("should fail if 'node' property is missing", () => {
    // arrange
    cartesianLayout = [
      {
        x: 97.73626669665249,
        y: -114.99468800778627,
      },
    ];
    // act
    validate(cartesianLayout);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.CARTESIAN_LAYOUT, '"node"'));
  });

  it("should fail if 'node' is not an integer", () => {
    // arrange
    cartesianLayout = [
      {
        node: 1.5,
        x: 97.73626669665249,
        y: -114.99468800778627,
      },
    ];
    // act
    validate(cartesianLayout);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_integer', AspectCore.CARTESIAN_LAYOUT, '"node"'));
  });

  it("should fail if 'node' is not a positive integer", () => {
    // arrange
    cartesianLayout = [
      {
        node: -1,
        x: 97.73626669665249,
        y: -114.99468800778627,
      },
    ];
    // act
    validate(cartesianLayout);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('minimum', AspectCore.CARTESIAN_LAYOUT, '"node"'));
  });

  it("should fail if 'x' property is missing", () => {
    // arrange
    cartesianLayout = [
      {
        node: 1,
        y: -114.99468800778627,
      },
    ];
    // act
    validate(cartesianLayout);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.CARTESIAN_LAYOUT, '"x"'));
  });

  it("should fail if 'x' is not an number", () => {
    // arrange
    cartesianLayout = [
      {
        node: 1,
        x: true,
        y: -114.99468800778627,
      },
    ];
    // act
    validate(cartesianLayout);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_number', AspectCore.CARTESIAN_LAYOUT, '"x"'));
  });

  it("should fail if 'y' property is missing", () => {
    // arrange
    cartesianLayout = [
      {
        node: 1,
        x: 97.73626669665249,
      },
    ];
    // act
    validate(cartesianLayout);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.CARTESIAN_LAYOUT, '"y"'));
  });

  it("should fail if 'y' is not an number", () => {
    // arrange
    cartesianLayout = [
      {
        node: 1,
        x: 97.73626669665249,
        y: true,
      },
    ];
    // act
    validate(cartesianLayout);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('type_is_number', AspectCore.CARTESIAN_LAYOUT, '"y"'));
  });

  it('should fail if there are additional property', () => {
    // arrange
    cartesianLayout = [
      {
        node: 1,
        x: 97.73626669665249,
        y: -114.99468800778627,
        prop: 'not supposed to be here',
      },
    ];
    // assert
    expect(validate(cartesianLayout)).toBeFalsy();
  });
});

/****************** Cy Groups  ******************/
describe.skip('cy groups schema', () => {
  const validate = ajv.compile(_cyGroupArr);
  let cyGroups: any;

  it("should fail if '@id' property is missing", () => {
    // arrange
    cyGroups = [
      {
        n: 'Group One',
        nodes: [167, 165],
        external_edges: [172],
        internal_edges: [171, 170],
      },
    ];

    // act
    validate(cyGroups);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.CARTESIAN_LAYOUT, '"@id"'));
  });

  it('should fail if there are additional property', () => {
    // arrange
    cyGroups = [
      {
        '@id': 1501,
        n: 'Group One',
        nodes: [167, 165],
        external_edges: [172],
        internal_edges: [171, 170],
        prop: 'not supposed to be here',
      },
    ];
    // act
    validate(cyGroups);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('additional_properties', AspectCore.CARTESIAN_LAYOUT, '"prop"'));
  });
});

/****************** Cy Visual Properties  ******************/
describe.skip('cy visual properties schema', () => {
  const validate = ajv.compile(_cyVisualPropertiesArr);
  let cyVisualProperties: any;
  it("should fail if 'properties_of' property is missing", () => {
    // arrange
    cyVisualProperties = [
      {
        properties: {
          NETWORK_ANNOTATION_SELECTION: 'false',
          NETWORK_BACKGROUND_PAINT: '#FFFFFF',
          NETWORK_EDGE_SELECTION: 'true',
          NETWORK_NODE_SELECTION: 'true',
        },
      },
    ];

    // act
    validate(cyVisualProperties);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(
      i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"properties_of"'),
    );
  });

  it("should fail if 'properties' property is missing", () => {
    // arrange
    cyVisualProperties = [
      {
        properties_of: 'network',
      },
    ];
    // act
    validate(cyVisualProperties);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"properties"'));
  });

  it("should fail if 'mappings' property keys does not match pattern", () => {
    // arrange
    cyVisualProperties = [
      {
        properties_of: 'nodes:default',
        properties: {
          COMPOUND_NODE_PADDING: '10.0',
        },
        dependencies: {
          nodeCustomGraphicsSizeSync: 'true',
          nodeSizeLocked: 'false',
        },
        mappings: {
          NODE_BORDER_PAINT: {
            type: 'DISCRETE',
            definition:
              'COL=type,T=string,K=0=smallmolecule,V=0=#D0D378,K=1=geneproduct,V=1=#0099CC,K=2=antibody,V=2=#333333,K=3=gene,V=3=#467CA8,K=4=proteinfamily,V=4=#285FF0,K=5=complex,V=5=#0099FF,K=6=variant,V=6=#80DFCD,K=7=pathway,V=7=#666666,K=8=mrna,V=8=#F46761',
          },
          'NODE_HEIGHT~': {
            type: 'DISCRETE',
            definition:
              'COL=type,T=string,K=0=rna,V=0=100.0,K=1=gene,V=1=25.0,K=2=proteinfamily,V=2=65.0,K=3=stimulus,V=3=60.0,K=4=biologicalprocess,V=4=20.0,K=5=mrna,V=5=100.0,K=6=cellularcomponent,V=6=20.0,K=7=drug,V=7=20.0,K=8=molecularfunction,V=8=20.0,K=9=smallmolecule,V=9=20.0,K=10=geneproduct,V=10=25.0,K=11=chemical,V=11=10.0,K=12=complex,V=12=60.0,K=13=protein,V=13=35.0,K=14=mirna,V=14=6.0,K=15=variant,V=15=25.0,K=16=pathway,V=16=55.0,K=17=signal,V=17=20.0',
          },
        },
      },
    ];
    // act
    validate(cyVisualProperties);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(
      i18.getErrorMessage('invalid_pattern', AspectCytoscape.CY_VISUAL_PROPERTIES, '"NODE_HEIGHT~"'),
    );
  });
});

/****************** Cy Sub Networks  ******************/
describe.skip('cy sub networks schema', () => {
  const validate = ajv.compile(_cySubNetworksArr);
  let cyGroups: any;

  it("should fail if '@id' property is missing", () => {
    // arrange
    cyGroups = [
      {
        n: 'Group One',
        nodes: [167, 165],
        external_edges: [172],
        internal_edges: [171, 170],
      },
    ];

    // act
    validate(cyGroups);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCore.CARTESIAN_LAYOUT, '"@id"'));
  });

  it('should fail if there are additional property', () => {
    // arrange
    cyGroups = [
      {
        '@id': 1501,
        n: 'Group One',
        nodes: [167, 165],
        external_edges: [172],
        internal_edges: [171, 170],
        prop: 'not supposed to be here',
      },
    ];
    // act
    validate(cyGroups);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('additional_properties', AspectCore.CARTESIAN_LAYOUT, '"prop"'));
  });
});
