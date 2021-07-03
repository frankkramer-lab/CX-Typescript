import { _cyGroupArr } from '../src/schema';
import { AspectCore } from '../src/helpers/enums/aspects.enum';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';

describe.skip('cy groups schema', () => {
  let ajv = validator.getAjvInstance();
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
