import { AspectCore } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';

export const _cartesianLayout = {
  type: 'object',
  properties: {
    node: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCore.CARTESIAN_LAYOUT, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCore.CARTESIAN_LAYOUT, '${0#}'),
      },
    },
    x: {
      type: 'number',
      errorMessage: {
        type: i18.getErrorMessage('type_is_number', AspectCore.CARTESIAN_LAYOUT, '${0#}'),
      },
    },
    y: {
      type: 'number',
      errorMessage: {
        type: i18.getErrorMessage('type_is_number', AspectCore.CARTESIAN_LAYOUT, '${0#}'),
      },
    },
    z: {
      type: 'number',
      errorMessage: {
        type: i18.getErrorMessage('type_is_number', AspectCore.CARTESIAN_LAYOUT, '${0#}'),
      },
    },
    view: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCore.CARTESIAN_LAYOUT, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCore.CARTESIAN_LAYOUT, '${0#}'),
      },
    },
  },
  required: ['node', 'x', 'y'],
  errorMessage: {
    required: {
      node: i18.getErrorMessage('required', AspectCore.CARTESIAN_LAYOUT, '"node"'),
      x: i18.getErrorMessage('required', AspectCore.CARTESIAN_LAYOUT, '"x"'),
      y: i18.getErrorMessage('required', AspectCore.CARTESIAN_LAYOUT, '"y"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCore.CARTESIAN_LAYOUT, '${0#}'),
  },
};

export const _cartesianLayoutArr = {
  type: 'array',
  items: _cartesianLayout,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCore.CARTESIAN_LAYOUT, `"${AspectCore.CARTESIAN_LAYOUT}"`),
  },
};
