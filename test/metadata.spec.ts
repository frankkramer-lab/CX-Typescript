import { AspectSettings } from '../src/helpers/enums/aspects.enum';
import { _metaDataArr } from '../src/schema/metadata.schema';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';

describe.skip('metaData schema', () => {
  let ajv = validator.getAjvInstance();
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
