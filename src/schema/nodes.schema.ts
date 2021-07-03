import { AspectCore } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';

export const _nodes = {
  type: 'object',
  properties: {
    '@id': {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCore.NODES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCore.NODES, '${0#}'),
      },
    },
    n: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectCore.NODES, '${0#}'),
      },
    },
    r: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectCore.NODES, '${0#}'),
      },
    },
  },
  required: ['@id'],
  errorMessage: {
    required: {
      '@id': i18.getErrorMessage('required', AspectCore.NODES, '"@id"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCore.NODES, '${0#}'),
  },
};

export const _nodesArr = {
  type: 'array',
  items: _nodes,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCore.NODES, `"${AspectCore.NODES}"`),
  },
};
