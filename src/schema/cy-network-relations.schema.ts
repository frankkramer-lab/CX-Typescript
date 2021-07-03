import { AspectCytoscape } from '../helpers/enums/aspects.enum';
import { Utilities } from '../helpers/utilities';
import * as i18 from '../i18n';

export const _cyNetworkRelations = {
  type: 'object',
  properties: {
    p: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_NETWORK_RELATIONS, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_NETWORK_RELATIONS, '${0#}'),
      },
    },
    c: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_NETWORK_RELATIONS, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_NETWORK_RELATIONS, '${0#}'),
      },
    },
    r: {
      enum: Utilities.NetworkRelations,
      errorMessage: {
        enum: i18.getErrorMessage(
          'enum',
          AspectCytoscape.CY_NETWORK_RELATIONS,
          `[${Utilities.NetworkRelations.join(', ')}]`,
        ),
      },
    },
    name: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectCytoscape.CY_NETWORK_RELATIONS, '${0#}'),
      },
    },
  },
  required: ['c'],
  errorMessage: {
    required: {
      c: i18.getErrorMessage('required', AspectCytoscape.CY_NETWORK_RELATIONS, '"c"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_NETWORK_RELATIONS, '${0#}'),
  },
};

export const _cyNetworkRelationsArr = {
  type: 'array',
  items: _cyNetworkRelations,
  errorMessage: {
    type: i18.getErrorMessage(
      'type_is_array',
      AspectCytoscape.CY_NETWORK_RELATIONS,
      `"${AspectCytoscape.CY_NETWORK_RELATIONS}"`,
    ),
  },
};
