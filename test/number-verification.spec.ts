import { _numberVerificationArr } from '../src/schema';
import { AspectSettings } from '../src/helpers/enums/aspects.enum';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';

describe.skip('number Verification schema', () => {
  let ajv = validator.getAjvInstance();
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
