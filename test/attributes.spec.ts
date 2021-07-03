import { _nodeAttributesArr } from '../src/schema/attributes.schema';
import { AspectCore } from '../src/helpers/enums/aspects.enum';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';
import { Utilities } from '../src/helpers/utilities';

describe.skip('node, edge attributes schema', () => {
  let ajv = validator.getAjvInstance();
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
    expect(errorMessage).toEqual(
      i18.getErrorMessage('enum', AspectCore.NODE_ATTRIBUTES, `[${Utilities.DataTypes.join(', ')}]`),
    );
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
