import { AspectCytoscape } from '../helpers/enums/aspects.enum';
import { Utilities } from '../helpers/utilities';
import * as i18 from '../i18n';

export const _cyVisualProperties = {
  type: 'object',
  properties: {
    properties_of: {
      enum: Utilities.VisualProperties,
      errorMessage: {
        enum: i18.getErrorMessage(
          'enum',
          AspectCytoscape.CY_VISUAL_PROPERTIES,
          `[${Utilities.VisualProperties.join(', ')}]`,
        ),
      },
    },
    applies_to: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
    view: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
    properties: {
      type: 'object',
      additionalProperties: true,
      errorMessage: {
        type: i18.getErrorMessage('type_is_object', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
    dependencies: {
      type: 'object',
      additionalProperties: true,
      errorMessage: {
        type: i18.getErrorMessage('type_is_object', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
    mappings: {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z0-9_]+$': {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              errorMessage: {
                type: i18.getErrorMessage('type_is_string', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
              },
            },
            definition: {
              type: 'string',
              errorMessage: {
                type: i18.getErrorMessage('type_is_string', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
              },
            },
          },
          required: ['type', 'definition'],
          errorMessage: {
            type: i18.getErrorMessage('type_is_object', AspectCytoscape.CY_VISUAL_PROPERTIES, 'mappings/${0#}'),
            required: {
              properties_of: i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"type"'),
              properties: i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"definition"'),
            },
          },
          additionalProperties: {
            not: true,
            errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
          },
        },
      },
      errorMessage: {
        type: i18.getErrorMessage('type_is_object', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
      additionalProperties: {
        not: true,
        errorMessage: i18.getErrorMessage('invalid_pattern', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
  },
  required: ['properties_of', 'properties'],
  errorMessage: {
    required: {
      properties_of: i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"properties_of"'),
      properties: i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"properties"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
  },
};

export const _cyVisualPropertiesArr = {
  type: 'array',
  items: _cyVisualProperties,
  errorMessage: {
    type: i18.getErrorMessage(
      'type_is_array',
      AspectCytoscape.CY_VISUAL_PROPERTIES,
      `"${AspectCytoscape.CY_VISUAL_PROPERTIES}"`,
    ),
  },
};
