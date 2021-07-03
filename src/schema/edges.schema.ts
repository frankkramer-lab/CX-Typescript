import { AspectCore } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';

export const _edges = {
  type: 'object',
  properties: {
    '@id': {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCore.EDGES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCore.EDGES, '${0#}'),
      },
    },
    s: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCore.EDGES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCore.EDGES, '${0#}'),
      },
    },
    t: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCore.EDGES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCore.EDGES, '${0#}'),
      },
    },
    i: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectCore.EDGES, '${0#}'),
      },
    },
  },
  required: ['@id', 's', 't'],
  errorMessage: {
    required: {
      '@id': i18.getErrorMessage('required', AspectCore.EDGES, '"@id"'),
      s: i18.getErrorMessage('required', AspectCore.EDGES, '"s"'),
      t: i18.getErrorMessage('required', AspectCore.EDGES, '"t"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCore.EDGES, '${0#}'),
  },
};

export const _edgesArr = {
  type: 'array',
  items: _edges,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCore.EDGES, `"${AspectCore.EDGES}"`),
  },
};
