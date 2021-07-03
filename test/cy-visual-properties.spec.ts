import { AspectCytoscape } from '../src/helpers/enums/aspects.enum';
import { _cyVisualPropertiesArr } from '../src/schema/cy-visual-properties.schema';
import * as validator from '../src/validate';
import * as i18 from '../src/i18n';

describe.skip('cy visual properties schema', () => {
  let ajv = validator.getAjvInstance();
  const validate = ajv.compile(_cyVisualPropertiesArr);
  let cyVisualProperties: any;
  it("should fail if 'properties_of' property is missing", () => {
    // arrange
    cyVisualProperties = [
      {
        properties: {
          NETWORK_ANNOTATION_SELECTION: 'false',
          NETWORK_BACKGROUND_PAINT: '#FFFFFF',
          NETWORK_EDGE_SELECTION: 'true',
          NETWORK_NODE_SELECTION: 'true',
        },
      },
    ];

    // act
    validate(cyVisualProperties);
    let errorMessage = validate.errors?.map((error) => error.message).toString();
    // assert
    expect(errorMessage).toEqual(
      i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"properties_of"'),
    );
  });

  it("should fail if 'properties' property is missing", () => {
    // arrange
    cyVisualProperties = [
      {
        properties_of: 'network',
      },
    ];
    // act
    validate(cyVisualProperties);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"properties"'));
  });

  it("should fail if 'mappings' property keys does not match pattern", () => {
    // arrange
    cyVisualProperties = [
      {
        properties_of: 'nodes:default',
        properties: {
          COMPOUND_NODE_PADDING: '10.0',
        },
        dependencies: {
          nodeCustomGraphicsSizeSync: 'true',
          nodeSizeLocked: 'false',
        },
        mappings: {
          NODE_BORDER_PAINT: {
            type: 'DISCRETE',
            definition:
              'COL=type,T=string,K=0=smallmolecule,V=0=#D0D378,K=1=geneproduct,V=1=#0099CC,K=2=antibody,V=2=#333333,K=3=gene,V=3=#467CA8,K=4=proteinfamily,V=4=#285FF0,K=5=complex,V=5=#0099FF,K=6=variant,V=6=#80DFCD,K=7=pathway,V=7=#666666,K=8=mrna,V=8=#F46761',
          },
          'NODE_HEIGHT~': {
            type: 'DISCRETE',
            definition:
              'COL=type,T=string,K=0=rna,V=0=100.0,K=1=gene,V=1=25.0,K=2=proteinfamily,V=2=65.0,K=3=stimulus,V=3=60.0,K=4=biologicalprocess,V=4=20.0,K=5=mrna,V=5=100.0,K=6=cellularcomponent,V=6=20.0,K=7=drug,V=7=20.0,K=8=molecularfunction,V=8=20.0,K=9=smallmolecule,V=9=20.0,K=10=geneproduct,V=10=25.0,K=11=chemical,V=11=10.0,K=12=complex,V=12=60.0,K=13=protein,V=13=35.0,K=14=mirna,V=14=6.0,K=15=variant,V=15=25.0,K=16=pathway,V=16=55.0,K=17=signal,V=17=20.0',
          },
        },
      },
    ];
    // act
    validate(cyVisualProperties);
    let errorMessage = validate.errors?.map((error) => error.message).toString();

    // assert
    expect(errorMessage).toEqual(
      i18.getErrorMessage('invalid_pattern', AspectCytoscape.CY_VISUAL_PROPERTIES, '"NODE_HEIGHT~"'),
    );
  });
});
