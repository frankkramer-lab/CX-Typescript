import { AspectCytoscape } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';

export const _cyGroup = {
  type: 'object',
  properties: {
    '@id': {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_GROUPS, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_GROUPS, '${0#}'),
      },
    },
    n: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectCytoscape.CY_GROUPS, '${0#}'),
      },
    },
    nodes: {
      type: 'array',
      items: {
        type: 'integer',
        minimum: 0,
        errorMessage: {
          type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_GROUPS, '${0#}'),
          minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_GROUPS, '${0#}'),
        },
      },
      errorMessage: {
        type: i18.getErrorMessage('type_is_array_of_integer', AspectCytoscape.CY_GROUPS, '"nodes"'),
      },
    },
    external_edges: {
      type: 'array',
      items: {
        type: 'integer',
        minimum: 0,
        errorMessage: {
          type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_GROUPS, '${0#}'),
          minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_GROUPS, '${0#}'),
        },
      },
      errorMessage: {
        type: i18.getErrorMessage('type_is_array_of_integer', AspectCytoscape.CY_GROUPS, '"external_edges"'),
      },
    },
    internal_edges: {
      type: 'array',
      items: {
        type: 'integer',
        minimum: 0,
        errorMessage: {
          type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_GROUPS, '${0#}'),
          minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_GROUPS, '${0#}'),
        },
      },
      errorMessage: {
        type: i18.getErrorMessage('type_is_array_of_integer', AspectCytoscape.CY_GROUPS, '"internal_edges"'),
      },
    },
  },
  required: ['@id'],
  errorMessage: {
    required: {
      '@id': i18.getErrorMessage('required', AspectCytoscape.CY_GROUPS, '"@id"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_GROUPS, '${0#}'),
  },
};

export const _cyGroupArr = {
  type: 'array',
  items: _cyGroup,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_GROUPS, `"${AspectCytoscape.CY_GROUPS}"`),
  },
};
