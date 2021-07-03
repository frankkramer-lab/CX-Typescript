import { AspectSettings } from '../src/helpers/enums/aspects.enum';
import { _statusArr } from '../src/schema/status.schema';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';

/******************  Status ******************/
describe.skip('status schema', () => {
  let ajv = validator.getAjvInstance();
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
