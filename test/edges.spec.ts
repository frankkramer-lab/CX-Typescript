import { AspectCore } from '../src/helpers/enums/aspects.enum';
import { _edgesArr } from '../src/schema/edges.schema';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';

describe.skip('edges schema', () => {
  let ajv = validator.getAjvInstance();
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
