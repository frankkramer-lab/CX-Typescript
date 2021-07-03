import { AspectCore } from '../src/helpers/enums/aspects.enum';
import { _cartesianLayoutArr } from '../src/schema';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';

describe.skip('cartesian layout schema', () => {
  let ajv = validator.getAjvInstance();
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
