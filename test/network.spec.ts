import { _network } from '../src/schema/network.schema';
import * as validator from '../src/validate';

describe.skip('network schema', () => {
  let ajv = validator.getAjvInstance();
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
