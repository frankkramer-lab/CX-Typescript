import { AspectSettings } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';

export const _status = {
  type: 'object',
  properties: {
    error: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectSettings.STATUS, '${0#}'),
      },
    },
    success: {
      type: 'boolean',
      errorMessage: {
        type: i18.getErrorMessage('type_is_boolean', AspectSettings.STATUS, '${0#}'),
      },
    },
  },
  required: ['error', 'success'],
  errorMessage: {
    required: {
      error: i18.getErrorMessage('required', AspectSettings.STATUS, '"error"'),
      success: i18.getErrorMessage('required', AspectSettings.STATUS, '"success"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectSettings.STATUS, '${0#}'),
  },
};

export const _statusArr = {
  type: 'array',
  items: _status,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectSettings.STATUS, `"${AspectSettings.STATUS}"`),
  },
};
