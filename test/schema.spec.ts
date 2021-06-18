import {
  _cartesianLayoutArr,
  _edgesArr,
  _metaDataArr,
  _nodeAttributesArr,
  _nodes,
  _nodesArr,
  _numberVerificationArr,
  _numberVerificationAspect,
  _statusArr,
} from '../src/schema';
import * as validator from '../src/validate';

let ajv = validator.getAjvInstance();

/******************  Number Verification ******************/
describe.skip('number Verification schema', () => {
  const validate = ajv.compile(_numberVerificationArr);
  let numberVerification: any[];
  it('should fail if longNumber property is missing', () => {
    // arrange
    numberVerification = [{}];
    // assert
    expect(validate(numberVerification)).toBeFalsy();
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
  let status: any[];
  it('should fail if error property is missing', () => {
    // arrange
    status = [
      {
        success: true,
      },
    ];
    // assert
    expect(validate(status)).toBeFalsy();
  });

  it('should fail if success property is missing', () => {
    // arrange
    status = [
      {
        error: '',
      },
    ];
    // assert
    expect(validate(status)).toBeFalsy();
  });

  it('should fail if error property is not of string type', () => {
    // arrange
    status = [
      {
        error: 400,
        success: true,
      },
    ];
    // assert
    expect(validate(status)).toBeFalsy();
  });

  it('should fail if success property is not of boolean type', () => {
    // arrange
    status = [
      {
        error: '',
        success: 'true',
      },
    ];
    // assert
    expect(validate(status)).toBeFalsy();
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
  let metaData: any[];
  it('should fail if name property is missing', () => {
    // arrange
    metaData = [
      {
        version: '1.0',
      },
    ];
    // assert
    expect(validate(metaData)).toBeFalsy();
  });

  it('should fail if version property is missing', () => {
    // arrange
    metaData = [
      {
        name: 'Citation',
      },
    ];
    // assert
    expect(validate(metaData)).toBeFalsy();
  });

  it('should fail if name property is not of string type', () => {
    // arrange
    metaData = [
      {
        name: 90,
        version: '1.0',
        lastUpdate: 1034334343,
        consistencyGroup: 1,
        properties: [{ name: 'curator', value: 'Ideker Lab' }],
      },
    ];
    // assert
    expect(validate(metaData)).toBeFalsy();
  });

  it('should fail if version property is not of string type', () => {
    // arrange
    metaData = [
      {
        name: 'Citation',
        version: 1.0,
        lastUpdate: 1034334343,
        consistencyGroup: 1,
        properties: [{ name: 'curator', value: 'Ideker Lab' }],
      },
    ];
    // assert
    expect(validate(metaData)).toBeFalsy();
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
  let nodes: any[];

  it('should fail if @id is not an integer', () => {
    // arrange
    nodes = [
      {
        '@id': 1.5,
        n: 'TYK2',
        r: 'uniprot:P29597',
      },
    ];
    // assert
    expect(validate(nodes)).toBeFalsy();
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
    // assert
    expect(validate(nodes)).toBeFalsy();
  });

  it('should fail if @id property is missing', () => {
    // arrange
    nodes = [
      {
        n: 'TYK2',
        r: 'uniprot:P29597',
      },
    ];
    // assert
    expect(validate(nodes)).toBeFalsy();
  });

  it('should fail if duplicate @ids are available', () => {
    // arrange
    nodes = [
      {
        '@id': 0,
      },
      {
        '@id': 0,
      },
    ];
    // assert
    expect(validate(nodes)).toBeFalsy();
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
  let edges: any[];

  it('should fail if @id is not an integer', () => {
    // arrange
    edges = [
      {
        '@id': 1.5,
        s: 0,
        t: 1,
      },
    ];
    // assert
    expect(validate(edges)).toBeFalsy();
  });

  it('should fail if @id is not a positive integer', () => {
    // arrange
    edges = [
      {
        '@id': -1,
        s: 0,
        t: 1,
      },
    ];
    // assert
    expect(validate(edges)).toBeFalsy();
  });

  it('should fail if @id property is missing', () => {
    // arrange
    edges = [
      {
        s: 0,
        t: 1,
      },
    ];
    // assert
    expect(validate(edges)).toBeFalsy();
  });

  it('should fail if duplicate @ids are available', () => {
    // arrange
    edges = [
      {
        '@id': 0,
      },
      {
        '@id': 0,
      },
    ];
    // assert
    expect(validate(edges)).toBeFalsy();
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

  it('should fail if po is not a positive integer', () => {
    // arrange
    nodeAttributes = [
      {
        po: 1.5,
        n: 'member',
        v: ['hgnc.symbol:IRF9', 'hgnc.symbol:STAT1', 'hgnc.symbol:STAT2'],
        d: 'list_of_string',
      },
    ];
    // assert
    expect(validate(nodeAttributes)).toBeFalsy();
  });

  it("should fail if property 'd' exist and property 'v' is of type string", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1.5,
        n: 'member',
        v: 'hgnc.symbol:IRF9',
        d: 'list_of_string',
      },
    ];
    // assert
    expect(validate(nodeAttributes)).toBeFalsy();
  });

  it("should fail if type of property 'd' is 'list_of_string' and type of property 'v' is different", () => {
    // arrange
    nodeAttributes = [
      {
        po: 1,
        n: 'member',
        v: 'hgnc.symbol:IRF9',
        d: 'list_of_string',
      },
    ];
    // assert
    expect(validate(nodeAttributes)).toBeFalsy();
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