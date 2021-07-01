import { AspectCore, AspectCytoscape, AspectSettings } from './helpers/enums/aspects.enum';
import * as i18 from './i18n';

export const dataTypes = [
  'boolean',
  'double',
  'integer',
  'long',
  'string',
  'list_of_boolean',
  'list_of_double',
  'list_of_integer',
  'list_of_long',
  'list_of_string',
];

export const visualProperties = ['network', 'nodes:default', 'edges:default', 'nodes', 'edges'];
export const networkRelations = ['view', 'subnetwork'];
export const tableColumnAppliesTo = ['node_table', 'edge_table', 'network_table'];

/******************  Number Verification ******************/

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
    type: i18.getErrorMessage('type_is_array', AspectSettings.NUMBER_VERIFICATION, '"number verification"'),
  },
};

/******************  Status ******************/

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
    type: i18.getErrorMessage('type_is_array', AspectSettings.STATUS, '"status"'),
  },
};

/******************  MetaData ******************/

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
    type: i18.getErrorMessage('type_is_array', AspectSettings.METADATA, '"metaData"'),
  },
};

/****************** Nodes  ******************/
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
    type: i18.getErrorMessage('type_is_array', AspectCore.NODES, '"nodes"'),
  },
};

/******************  Edges ******************/
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
    type: i18.getErrorMessage('type_is_array', AspectCore.EDGES, '"edges"'),
  },
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
        enum: dataTypes,
        errorMessage: {
          enum: i18.getErrorMessage('enum', aspectType, `[${dataTypes.join(', ')}]`),
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

/******************  Node Attributes ******************/
export const _nodeAttributesArr = {
  type: 'array',
  items: _sharedAttributes(AspectCore.NODE_ATTRIBUTES),
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCore.NODE_ATTRIBUTES, '"nodeAttributes"'),
  },
};

/******************  Edge Attributes ******************/

export const _edgeAttributesArr = {
  type: 'array',
  items: _sharedAttributes(AspectCore.EDGE_ATTRIBUTES),
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCore.EDGE_ATTRIBUTES, '"edgeAttributes"'),
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
      enum: dataTypes,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCore.NETWORK_ATTRIBUTES, `[${dataTypes.join(', ')}]`),
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

/******************  Cartesian Layout ******************/

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
    type: i18.getErrorMessage('type_is_array', AspectCore.CARTESIAN_LAYOUT, '"cartesianLayout"'),
  },
};

/******************  Cy Groups ******************/
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
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_GROUPS, '"cyGroups"'),
  },
};

/******************  Cy Visual Properties ******************/
export const _cyVisualProperties = {
  type: 'object',
  properties: {
    properties_of: {
      enum: visualProperties,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCytoscape.CY_VISUAL_PROPERTIES, `[${visualProperties.join(', ')}]`),
      },
    },
    applies_to: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
    view: {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
    properties: {
      type: 'object',
      additionalProperties: true,
      errorMessage: {
        type: i18.getErrorMessage('type_is_object', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
    dependencies: {
      type: 'object',
      additionalProperties: true,
      errorMessage: {
        type: i18.getErrorMessage('type_is_object', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
    mappings: {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z0-9_]+$': {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              errorMessage: {
                type: i18.getErrorMessage('type_is_string', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
              },
            },
            definition: {
              type: 'string',
              errorMessage: {
                type: i18.getErrorMessage('type_is_string', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
              },
            },
          },
          required: ['type', 'definition'],
          errorMessage: {
            type: i18.getErrorMessage('type_is_object', AspectCytoscape.CY_VISUAL_PROPERTIES, 'mappings/${0#}'),
            required: {
              properties_of: i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"type"'),
              properties: i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"definition"'),
            },
          },
          additionalProperties: {
            not: true,
            errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
          },
        },
      },
      errorMessage: {
        type: i18.getErrorMessage('type_is_object', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
      additionalProperties: {
        not: true,
        errorMessage: i18.getErrorMessage('invalid_pattern', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
      },
    },
  },
  required: ['properties_of', 'properties'],
  errorMessage: {
    required: {
      properties_of: i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"properties_of"'),
      properties: i18.getErrorMessage('required', AspectCytoscape.CY_VISUAL_PROPERTIES, '"properties"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_VISUAL_PROPERTIES, '${0#}'),
  },
};

export const _cyVisualPropertiesArr = {
  type: 'array',
  items: _cyVisualProperties,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_VISUAL_PROPERTIES, '"cyVisualProperties"'),
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
      enum: dataTypes,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, `[${dataTypes.join(', ')}]`),
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
  allOf: typeRules(AspectCytoscape.CY_HIDDEN_ATTRIBUTES),
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_HIDDEN_ATTRIBUTES, '"cyHiddenAttributes"'),
  },
};

/******************  Cy Network Relations ******************/

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
      enum: networkRelations,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCytoscape.CY_NETWORK_RELATIONS, `[${networkRelations.join(', ')}]`),
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
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_NETWORK_RELATIONS, '"cyNetworkRelations"'),
  },
};

/******************  Cy Sub Networks ******************/

export const _cySubNetworks = {
  type: 'object',
  properties: {
    '@id': {
      type: 'integer',
      minimum: 0,
      errorMessage: {
        type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_SUBNETWORKS, '${0#}'),
        minimum: i18.getErrorMessage('minimum', AspectCytoscape.CY_SUBNETWORKS, '${0#}'),
      },
    },
    nodes: {
      type: ['array', 'string'],
    },
    edges: {
      type: ['array', 'string'],
    },
  },
  required: ['@id', 'nodes', 'edges'],
  errorMessage: {
    required: {
      '@id': i18.getErrorMessage('required', AspectCytoscape.CY_NETWORK_RELATIONS, '"@id"'),
      nodes: i18.getErrorMessage('required', AspectCytoscape.CY_NETWORK_RELATIONS, '"nodes"'),
      edges: i18.getErrorMessage('required', AspectCytoscape.CY_NETWORK_RELATIONS, '"edges"'),
    },
  },
  additionalProperties: {
    not: true,
    errorMessage: i18.getErrorMessage('additional_properties', AspectCytoscape.CY_NETWORK_RELATIONS, '${0#}'),
  },
  anyOf: [
    {
      oneOf: [
        {
          properties: {
            nodes: {
              const: 'all',
            },
          },
        },
        {
          properties: {
            nodes: {
              type: 'array',
              items: {
                type: 'integer',
                errorMessage: {
                  type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_SUBNETWORKS, '${0#}'),
                },
              },
              errorMessage: {
                type: i18.getErrorMessage('type_is_array_of_integer', AspectCytoscape.CY_SUBNETWORKS, '${0#}'),
              },
            },
          },
        },
      ],
    },
    {
      oneOf: [
        {
          properties: {
            edges: {
              const: 'all',
            },
          },
        },
        {
          properties: {
            edges: {
              type: 'array',
              items: {
                type: 'integer',
                errorMessage: {
                  type: i18.getErrorMessage('type_is_integer', AspectCytoscape.CY_SUBNETWORKS, '${0#}'),
                },
              },
              errorMessage: {
                type: i18.getErrorMessage('type_is_array_of_integer', AspectCytoscape.CY_SUBNETWORKS, '${0#}'),
              },
            },
          },
        },
      ],
    },
  ],
};

export const _cySubNetworksArr = {
  type: 'array',
  items: _cySubNetworks,
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_SUBNETWORKS, '"cySubNetworks"'),
  },
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
      enum: dataTypes,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCytoscape.CY_TABLE_COLUMN, `[${dataTypes.join(', ')}]`),
      },
    },
    applies_to: {
      enum: tableColumnAppliesTo,
      errorMessage: {
        enum: i18.getErrorMessage('enum', AspectCytoscape.CY_TABLE_COLUMN, `[${tableColumnAppliesTo.join(', ')}]`),
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
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_TABLE_COLUMN, '"cyTableColumn"'),
  },
};

/****************** Network  ******************/

const number_verification_is_required_in_network = {
  contains: {
    type: 'object',
    required: ['numberVerification'],
  },
  errorMessage: {
    contains: i18.getErrorMessage('contains', 'network', '"numberVerification"'),
  },
};

const metaData_is_required_in_network = {
  contains: {
    type: 'object',
    required: ['metaData'],
  },
  errorMessage: {
    contains: i18.getErrorMessage('contains', 'network', '"metaData"'),
  },
};
const status_is_required_in_network = {
  contains: {
    type: 'object',
    required: ['status'],
  },
  errorMessage: {
    contains: i18.getErrorMessage('contains', 'network', '"status"'),
  },
};

function if_metadata_has_aspect_name_then_aspect_is_required(aspectName: AspectCore | AspectCytoscape): any {
  return {
    if: {
      type: 'array',
      contains: {
        type: 'object',
        properties: {
          metaData: {
            type: 'array',
            contains: {
              type: 'object',
              properties: {
                name: { const: aspectName },
              },
              required: ['name'],
            },
          },
        },
        required: ['metaData'],
      },
    },
    then: {
      contains: { type: 'object', required: [aspectName] },
      errorMessage: {
        contains: i18.getErrorMessage('contains', 'network', `"${aspectName}"`),
      },
    },
  };
}

export const _network = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      numberVerification: _numberVerificationArr,
      metaData: _metaDataArr,
      nodes: _nodesArr,
      edges: _edgesArr,
      nodeAttributes: _nodeAttributesArr,
      edgeAttributes: _edgeAttributesArr,
      networkAttributes: _networkAttributesArr,
      cartesianLayout: _cartesianLayoutArr,
      cyGroups: _cyGroupArr,
      cyVisualProperties: _cyVisualPropertiesArr,
      cyHiddenAttributes: _cyHiddenAttributesArr,
      cyNetworkRelations: _cyNetworkRelationsArr,
      cySubNetworks: _cySubNetworksArr,
      cyTableColumn: _cyTableColumnArr,
      status: _statusArr,
    },
    minProperties: 1,
    maxProperties: 1,
    errorMessage: {
      minProperties: i18.getErrorMessage('min_properties', 'network', '"network"'),
      maxProperties: i18.getErrorMessage('max_properties', 'network', '"network"'),
    },
  },
  errorMessage: {
    type: i18.getErrorMessage('type_is_array', 'network', '"network"'),
  },
  allOf: [
    number_verification_is_required_in_network,
    metaData_is_required_in_network,
    status_is_required_in_network,
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCore.NODES),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCore.EDGES),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCore.NODE_ATTRIBUTES),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCore.EDGE_ATTRIBUTES),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCore.NETWORK_ATTRIBUTES),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCore.CARTESIAN_LAYOUT),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCytoscape.CY_GROUPS),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCytoscape.CY_VISUAL_PROPERTIES),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCytoscape.CY_HIDDEN_ATTRIBUTES),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCytoscape.CY_NETWORK_RELATIONS),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCytoscape.CY_SUBNETWORKS),
    if_metadata_has_aspect_name_then_aspect_is_required(AspectCytoscape.CY_TABLE_COLUMN),
  ],
};
