import { AspectCytoscape } from '../helpers/enums/aspects.enum';
import { Utilities } from '../helpers/utilities';
import * as i18 from '../i18n';

export const _cyTableColumn = {
  type: 'object',
  properties: {
    s: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_TABLE_COLUMN, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_TABLE_COLUMN, '${0#}'),
      },
    },
    n: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectCytoscape.CY_TABLE_COLUMN, '${0#}'),
      },
    },
    d: {
      enum: Utilities.DataTypes,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCytoscape.CY_TABLE_COLUMN, `[${Utilities.DataTypes.join(', ')}]`),
      },
    },
    applies_to: {
      enum: Utilities.TableColumnAppliesTo,
      errorMessage: {
        enum: i18.getErrorMessage(
          'enum',
          AspectCytoscape.CY_TABLE_COLUMN,
          `[${Utilities.TableColumnAppliesTo.join(', ')}]`,
        ),
      },
    },
  },
  required: ['n', 'applies_to'],
  errorMessage: {
    required: {
      n: i18.getErrorMessage('required', AspectCytoscape.CY_TABLE_COLUMN, '"n"'),
      applies_to: i18.getErrorMessage('required', AspectCytoscape.CY_TABLE_COLUMN, '"applies_to"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_TABLE_COLUMN, '${0#}'),
  },
};

export const _cyTableColumnArr = {
  type: 'array',
  items: _cyTableColumn,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_TABLE_COLUMN, `"${AspectCytoscape.CY_TABLE_COLUMN}"`),
  },
};
