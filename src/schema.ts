/******************  Number Verification ******************/

export const _numberVerificationArr = {
  $id: 'http://example.com/schemas/numberVerificationArr.json',
  type: 'array',
  items: {
    type: 'object',
    properties: {
      longNumber: { type: 'number' },
    },
    required: ['longNumber'],
    additionalProperties: false,
  },
};

export const _numberVerificationAspect = {
  $id: 'http://example.com/schemas/numberVerificationAspect.json',
  type: 'object',
  properties: {
    numberVerification: _numberVerificationArr,
  },
  additionalProperties: false,
};

/******************  Status ******************/

export const _status = {
  $id: 'http://example.com/schemas/status.json',
  type: 'object',
  properties: {
    error: { type: 'string' },
    success: { type: 'boolean' },
  },
  required: ['error', 'success'],
  additionalProperties: false,
};

export const _statusArr = {
  $id: 'http://example.com/schemas/statusArr.json',
  type: 'array',
  items: _status,
};

export const _statusAspect = {
  $id: 'http://example.com/schemas/statusAspect.json',
  type: 'object',
  properties: {
    status: _statusArr,
  },
  additionalProperties: false,
};

/******************  MetaData ******************/

export const _metaData = {
  $id: 'http://example.com/schemas/metaData.json',
  type: 'object',
  properties: {
    name: { type: 'string' },
    version: { type: 'string' },
    idCounter: { type: 'integer' },
    checksum: { type: 'string' },
    elementCount: { type: 'number' },
    consistencyGroup: { type: 'integer' },
    properties: {
      type: 'object',
      additionalProperties: true,
    },
  },
  required: ['name', 'version'],
  additionalProperties: false,
};

export const _metaDataArr = {
  $id: 'http://example.com/schemas/metaDataArr.json',
  type: 'array',
  items: _metaData,
  uniqueItemProperties: ['name'],
};

export const _metaDataAspect = {
  $id: 'http://example.com/schemas/metaDataAspect.json',
  type: 'object',
  properties: {
    metaData: _metaDataArr,
  },
  additionalProperties: false,
};

/****************** Nodes  ******************/
export const _nodes = {
  type: 'object',
  properties: {
    '@id': { type: 'integer', minimum: 0 },
    n: { type: 'string' },
    r: { type: 'string' },
  },
  required: ['@id'],
  additionalProperties: false,
};

export const _nodesArr = {
  type: 'array',
  items: _nodes,
  uniqueItemProperties: ['@id'],
};

export const _nodeAspect = {
  type: 'object',
  properties: {
    nodes: _nodesArr,
  },
  additionalProperties: false,
};

/******************  Edges ******************/
export const _edges = {
  type: 'object',
  properties: {
    '@id': { type: 'integer', minimum: 0 },
    s: { type: 'integer', minimum: 0 },
    t: { type: 'integer', minimum: 0 },
    i: { type: 'string' },
  },
  required: ['@id', 's', 't'],
  additionalProperties: false,
};

export const _edgesArr = {
  type: 'array',
  items: _edges,
  uniqueItemProperties: ['@id'],
};

export const _edgesAspect = {
  type: 'object',
  properties: {
    edgeAttributes: _edgesArr,
  },
  additionalProperties: false,
};

/******************  Shared Attributes ******************/

export const typeRules = [
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
    },
    then: {
      properties: {
        v: {
          type: 'boolean',
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
    },
    then: {
      properties: {
        v: {
          type: 'integer',
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
    },
    then: {
      properties: {
        v: {
          type: 'number',
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
    },
    then: {
      properties: {
        v: {
          type: 'array',
          items: { type: 'boolean' },
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
    },
    then: {
      properties: {
        v: {
          type: 'array',
          items: { type: 'string' },
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
    },
    then: {
      properties: {
        v: {
          type: 'array',
          items: { type: 'integer' },
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
    },
    then: {
      properties: {
        v: {
          type: 'array',
          items: { type: 'number' },
        },
      },
    },
  },
];

const _sharedAttributes = {
  type: 'object',
  properties: {
    po: {
      type: 'integer',
      minimum: 0,
    },
    n: {
      type: 'string',
    },
    v: {
      type: ['array', 'string', 'boolean', 'integer', 'number'],
    },
    d: {
      enum: [
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
      ],
    },
    s: {
      type: 'integer',
      minimum: 0,
    },
  },
  required: ['po', 'n', 'v'],
  allOf: typeRules,
};

/******************  Node Attributes ******************/
export const _nodeAttributesArr = {
  type: 'array',
  items: _sharedAttributes,
};

export const _nodeAttributesAspect = {
  type: 'object',
  properties: {
    nodeAttributes: _nodeAttributesArr,
  },
  additionalProperties: false,
};

/******************  Edge Attributes ******************/

export const _edgeAttributesArr = {
  $id: 'http://example.com/schemas/edgeAttributesArr.json',
  type: 'array',
  items: _sharedAttributes,
};

/******************  Network Attributes ******************/

export const _networkAttributesArr = {
  $id: 'http://example.com/schemas/networkAttributesArr.json',
  type: 'array',
  items: _sharedAttributes,
};

/******************  Cartesian Layout ******************/

export const _cartesianLayout = {
  $id: 'http://example.com/schemas/cartesianLayout.json',
  type: 'object',
  properties: {
    node: { type: 'integer', minimum: 0 },
    x: { type: 'number' },
    y: { type: 'number' },
    z: { type: 'number' },
    view: { type: 'integer', minimum: 0 },
  },
  required: ['node', 'x', 'y', 'z'],
  additionalProperties: false,
};

export const _cartesianLayoutArr = {
  $id: 'http://example.com/schemas/cartesianLayoutArr.json',
  type: 'array',
  items: _cartesianLayout,
  uniqueItems: true,
};

/******************  Cy Groups ******************/
export const _cyGroup = {
  $id: 'http://example.com/schemas/cyGroup.json',
  type: 'object',
  properties: {
    '@id': { type: 'integer', minimum: 0 },
    n: { type: 'string' },
    nodes: { type: 'array', items: { type: 'integer', minimum: 0 } },
    external_edges: { type: 'array', items: { type: 'integer', minimum: 0 }, uniqueItems: true },
    internal_edges: { type: 'array', items: { type: 'integer', minimum: 0 }, uniqueItems: true },
  },
  required: ['@id', 'n', 'nodes', 'external_edges', 'internal_edges'],
  additionalProperties: false,
};

export const _cyGroupArr = {
  $id: 'http://example.com/schemas/cyGroupArr.json',
  type: 'array',
  items: _cyGroup,
};

/******************  Cy Visual Properties ******************/
export const _cyVisualProperties = {
  $id: 'http://example.com/schemas/cyVisualProperties.json',
  type: 'object',
  properties: {
    properties_of: { enum: ['network', 'nodes:default', 'edges:default', 'nodes', 'edges'] },
    applies_to: { type: 'integer', minimum: 0 },
    view: { type: 'integer', minimum: 0 },
    properties: { type: 'object', additionalProperties: true },
    dependencies: { type: 'object', additionalProperties: true },
    mappings: { type: 'object', patternProperties: { '^[a-z]+$': { type: 'object', additionalProperties: true } } },
  },
  required: ['properties_of', 'applies_to'],
  additionalProperties: false,
};

export const _cyVisualPropertiesArr = {
  $id: 'http://example.com/schemas/cyVisualPropertiesArr.json',
  type: 'array',
  items: _cyVisualProperties,
};

/******************  Cy Hidden Attributes ******************/

export const _cyHiddenAttributes = {
  $id: 'http://example.com/schemas/cyHiddenAttributes.json',
  type: 'object',
  properties: {
    s: { type: 'integer', minimum: 0 },
    n: { type: 'integer', minimum: 0 },
    v: {
      type: ['array', 'string', 'boolean', 'integer', 'number'],
    },
    d: {
      enum: [
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
      ],
    },
  },
  required: ['n', 'v'],
  additionalProperties: false,
};

export const _cyHiddenAttributesArr = {
  $id: 'http://example.com/schemas/cyHiddenAttributesArr.json',
  type: 'array',
  items: _cyHiddenAttributes,
  allOf: typeRules,
};

/******************  Cy Network Relations ******************/

export const _cyNetworkRelations = {
  $id: 'http://example.com/schemas/cyNetworkRelations.json',
  type: 'object',
  properties: {
    p: { type: 'integer', minimum: 0 },
    c: { type: 'integer', minimum: 0 },
    r: {
      enum: ['view', 'subnetwork'],
    },
    name: { type: 'string' },
  },
  required: ['c'],
  additionalProperties: false,
};

export const _cyNetworkRelationsArr = {
  $id: 'http://example.com/schemas/cyNetworkRelationsArr.json',
  type: 'array',
  items: _cyNetworkRelations,
};

/******************  Cy Sub Networks ******************/

export const _cySubNetworks = {
  $id: 'http://example.com/schemas/cySubNetworks.json',
  type: 'object',
  properties: {
    '@id': { type: 'integer', minimum: 0 },
    nodes: {
      type: ['array', 'string'],
    },
    edges: {
      type: ['array', 'string'],
    },
  },
  required: ['@id', 'nodes', 'edges'],
  additionalProperties: false,
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
              },
            },
          },
        },
      ],
    },
  ],
};

export const _cySubNetworksArr = {
  $id: 'http://example.com/schemas/cySubNetworksArr.json',
  type: 'array',
  items: _cySubNetworks,
  uniqueItemProperties: ['@id'],
};

/******************  Cy Table Column ******************/
export const _cyTableColumn = {
  $id: 'http://example.com/schemas/cyTableColumn.json',
  type: 'object',
  properties: {
    s: { type: 'integer', minimum: 0 },
    n: { type: 'string' },
    d: {
      enum: [
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
      ],
    },
    applies_to: {
      enum: ['node_table', 'edge_table', 'network_table'],
    },
  },
  required: ['n', 'applies_to'],
  additionalProperties: false,
};

export const _cyTableColumnArr = {
  $id: 'http://example.com/schemas/cyTableColumnArr.json',
  type: 'array',
  items: _cyTableColumn,
};

/****************** Network  ******************/

// export const _network = {
//   $id: 'http://example.com/schemas/network.json',
//   type: 'array',
//   items: {
//       oneOf: [
//           _numberVerificationAspect,
//           _metaDataAspect,
//           _statusAspect,
//           _nodeAspect,
//           _edgesAspect,
//           _nodeAttributesAspect,
//       ],
//     },
// };
