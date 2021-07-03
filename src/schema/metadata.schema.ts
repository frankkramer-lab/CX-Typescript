import { AspectSettings } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';

export const _metaData = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectSettings.METADATA, '${0#}'),
      },
    },
    version: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectSettings.METADATA, '${0#}'),
      },
    },
    idCounter: {
      type: 'integer',
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectSettings.METADATA, '${0#}'),
      },
    },
    checksum: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectSettings.METADATA, '${0#}'),
      },
    },
    elementCount: {
      type: 'number',
      errorMessage: {
        type: i18.getErrorMessage('type_is_number', AspectSettings.METADATA, '${0#}'),
      },
    },
    consistencyGroup: {
      type: 'integer',
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectSettings.METADATA, '${0#}'),
      },
    },
    properties: {
      type: 'array',
      items: {
        type: 'object',
      },
      additionalProperties: true,
      errorMessage: {
        type: i18.getErrorMessage('type_is_array', AspectSettings.METADATA, '"properties"'),
      },
    },
  },
  required: ['name', 'version'],
  errorMessage: {
    required: {
      name: i18.getErrorMessage('required', AspectSettings.METADATA, '"name"'),
      version: i18.getErrorMessage('required', AspectSettings.METADATA, '"version"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectSettings.METADATA, '${0#}'),
  },
};

export const _metaDataArr = {
  type: 'array',
  items: _metaData,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectSettings.METADATA, `"${AspectSettings.METADATA}"`),
  },
};
