import { AspectCore } from '../src/helpers/enums/aspects.enum';
import { _nodesArr } from '../src/schema/nodes.schema';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';

describe.skip('nodes schema', () => {
  let ajv = validator.getAjvInstance();
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
