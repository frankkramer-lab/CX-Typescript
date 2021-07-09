import { AspectCore, AspectCytoscape } from '../helpers/enums/aspects.enum';
import { Utilities } from '../helpers/utilities';
import * as i18 from '../i18n';

/******************  Node Attributes ******************/
export const _nodeAttributesArr = {
  type: 'array',
  items: _sharedAttributes(AspectCore.NODE_ATTRIBUTES),
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCore.NODE_ATTRIBUTES, `"${AspectCore.NODE_ATTRIBUTES}"`),
  },
};

/******************  Edge Attributes ******************/

export const _edgeAttributesArr = {
  type: 'array',
  items: _sharedAttributes(AspectCore.EDGE_ATTRIBUTES),
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCore.EDGE_ATTRIBUTES, `"${AspectCore.EDGE_ATTRIBUTES}"`),
  },
};

/******************  Network Attributes ******************/

export const _networkAttributes = {
  type: 'object',
  properties: {
    n: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectCore.NETWORK_ATTRIBUTES, '${0#}'),
      },
    },
    v: {
      type: ['array', 'string', 'boolean', 'integer', 'number'],
    },
    d: {
      enum: Utilities.DataTypes,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCore.NETWORK_ATTRIBUTES, `[${Utilities.DataTypes.join(', ')}]`),
      },
    },
    s: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCore.NETWORK_ATTRIBUTES, '${0#}'),
      },
    },
  },
  required: ['n', 'v'],
  errorMessage: {
    required: {
      n: i18.getErrorMessage('required', AspectCore.NETWORK_ATTRIBUTES, '"n"'),
      v: i18.getErrorMessage('required', AspectCore.NETWORK_ATTRIBUTES, '"v"'),
    },
  },
  allOf: typeRules(AspectCore.NETWORK_ATTRIBUTES),
};

export const _networkAttributesArr = {
  type: 'array',
  items: _networkAttributes,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCore.NETWORK_ATTRIBUTES, '"networkAttributes"'),
  },
};

/******************  Cy Hidden Attributes ******************/

export const _cyHiddenAttributes = {
  type: 'object',
  properties: {
    s: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, '${0#}'),
      },
    },
    n: {
      type: 'string',
      errorMessage: {
        type: i18.getErrorMessage('type_is_string', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, '${0#}'),
      },
    },
    v: {
      type: ['array', 'string', 'boolean', 'integer', 'number'],
    },
    d: {
      enum: Utilities.DataTypes,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, `[${Utilities.DataTypes.join(', ')}]`),
      },
    },
  },
  required: ['n', 'v'],
  errorMessage: {
    required: {
      n: i18.getErrorMessage('required', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, '"n"'),
      v: i18.getErrorMessage('required', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, '"v"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, '${0#}'),
  },
};

export const _cyHiddenAttributesArr = {
  type: 'array',
  items: _cyHiddenAttributes,
  errorMessage: {
    type: i18.getErrorMessage(
      'type_is_array',
      AspectCytoscape.CY_HIDDEN_ATTRIBUTES,
      `"${AspectCytoscape.CY_HIDDEN_ATTRIBUTES}"`,
    ),
  },
  allOf: typeRules(AspectCytoscape.CY_HIDDEN_ATTRIBUTES),
};


/******************  Cy Table Column ******************/

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
  allOf: typeRules(AspectCytoscape.CY_TABLE_COLUMN),
};



/******************  Shared Attributes ******************/

function typeRules(aspectType: AspectCore | AspectCytoscape) {
  return [
    {
      if: {
        properties: {
          d: false,
        },
      },
      then: {
        properties: {
          v: {
            type: 'string',
            errorMessage: {
              type: i18.getErrorMessage('type_is_string', aspectType, '${0#}'),
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          d: {
            const: 'boolean',
          },
        },
        required: ['d'],
        errorMessage: {
          required: {
            d: i18.getErrorMessage('required', aspectType, '"d"'),
          },
        },
      },
      then: {
        properties: {
          v: {
            type: 'boolean',
            errorMessage: {
              type: i18.getErrorMessage('type_is_boolean', aspectType, '${0#}'),
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          d: {
            const: 'integer',
          },
        },
        required: ['d'],
        errorMessage: {
          required: {
            d: i18.getErrorMessage('required', aspectType, '"d"'),
          },
        },
      },
      then: {
        properties: {
          v: {
            type: 'integer',
            errorMessage: {
              type: i18.getErrorMessage('type_is_integer', aspectType, '${0#}'),
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          d: {
            enum: ['double', 'long'],
          },
        },
        required: ['d'],
        errorMessage: {
          required: {
            d: i18.getErrorMessage('required', aspectType, '"d"'),
          },
        },
      },
      then: {
        properties: {
          v: {
            type: 'number',
            errorMessage: {
              type: i18.getErrorMessage('type_is_number', aspectType, '${0#}'),
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          d: {
            const: 'list_of_boolean',
          },
        },
        required: ['d'],
        errorMessage: {
          required: {
            d: i18.getErrorMessage('required', aspectType, '"d"'),
          },
        },
      },
      then: {
        properties: {
          v: {
            type: 'array',
            items: {
              type: 'boolean',
              errorMessage: {
                type: i18.getErrorMessage('type_is_boolean', aspectType, '${0#}'),
              },
            },
            errorMessage: {
              type: i18.getErrorMessage('type_is_array_of_boolean', aspectType, '"v"'),
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          d: {
            const: 'list_of_string',
          },
        },
        required: ['d'],
        errorMessage: {
          required: {
            d: i18.getErrorMessage('required', aspectType, '"d"'),
          },
        },
      },
      then: {
        properties: {
          v: {
            type: 'array',
            items: {
              type: 'string',
              errorMessage: {
                type: i18.getErrorMessage('type_is_string', aspectType, '${0#}'),
              },
            },
            errorMessage: {
              type: i18.getErrorMessage('type_is_array_of_string', aspectType, '"v"'),
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          d: {
            const: 'list_of_integer',
          },
        },
        required: ['d'],
        errorMessage: {
          required: {
            d: i18.getErrorMessage('required', aspectType, '"d"'),
          },
        },
      },
      then: {
        properties: {
          v: {
            type: 'array',
            items: {
              type: 'integer',
              errorMessage: {
                type: i18.getErrorMessage('type_is_integer', aspectType, '${0#}'),
              },
            },
            errorMessage: {
              type: i18.getErrorMessage('type_is_array_of_integer', aspectType, '"v"'),
            },
          },
        },
      },
    },
    {
      if: {
        properties: {
          d: {
            enum: ['list_of_double', 'list_of_long'],
          },
        },
        required: ['d'],
        errorMessage: {
          required: {
            d: i18.getErrorMessage('required', aspectType, '"d"'),
          },
        },
      },
      then: {
        properties: {
          v: {
            type: 'array',
            items: {
              type: 'number',
              errorMessage: {
                type: i18.getErrorMessage('type_is_number', aspectType, '${0#}'),
              },
            },
            errorMessage: {
              type: i18.getErrorMessage('type_is_array_of_number', aspectType, '${0#}'),
            },
          },
        },
      },
    },
  ];
}

function _sharedAttributes(aspectType: AspectCore): any {
  return {
    type: 'object',
    properties: {
      po: {
        type: 'integer',
        minimum: 0,
        errorMessage: {
          type: i18.getErrorMessage('type_is_integer', aspectType, '${0#}'),
          minimum: i18.getErrorMessage('minimum', aspectType, '${0#}'),
        },
      },
      n: {
        type: 'string',
        errorMessage: {
          type: i18.getErrorMessage('type_is_string', aspectType, '${0#}'),
        },
      },
      v: {
        type: ['array', 'string', 'boolean', 'integer', 'number'],
      },
      d: {
        enum: Utilities.DataTypes,
        errorMessage: {
          enum: i18.getErrorMessage('enum', aspectType, `[${Utilities.DataTypes.join(', ')}]`),
        },
      },
      s: {
        type: 'integer',
        minimum: 0,
        errorMessage: {
          type: i18.getErrorMessage('type_is_integer', aspectType, '${0#}'),
        },
      },
    },
    required: ['po', 'n', 'v'],
    errorMessage: {
      required: {
        po: i18.getErrorMessage('required', aspectType, '"po"'),
        n: i18.getErrorMessage('required', aspectType, '"n"'),
        v: i18.getErrorMessage('required', aspectType, '"v"'),
      },
    },
    allOf: typeRules(aspectType),
  };
}
