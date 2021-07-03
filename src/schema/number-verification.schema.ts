import { AspectSettings } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';

export const _numberVerificationArr = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      longNumber: {
        type: 'number',
        errorMessage: {
          type: i18.getErrorMessage('type_is_number', AspectSettings.NUMBER_VERIFICATION, '${0#}'),
        },
      },
    },
    required: ['longNumber'],
    additionalProperties: {
      not: true,
      errorMessage: i18.getErrorMessage('additional_properties', AspectSettings.NUMBER_VERIFICATION, '${0#}'),
    },
    errorMessage: {
      required: {
        longNumber: i18.getErrorMessage('required', AspectSettings.NUMBER_VERIFICATION, '"longNumber"'),
      },
    },
  },
  errorMessage: {
    type: i18.getErrorMessage(
      'type_is_array',
      AspectSettings.NUMBER_VERIFICATION,
      `"${AspectSettings.NUMBER_VERIFICATION}"`,
    ),
  },
};
