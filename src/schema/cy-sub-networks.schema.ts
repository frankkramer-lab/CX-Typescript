import { AspectCytoscape } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';

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
    type: i18.getErrorMessage('type_is_array', AspectCytoscape.CY_SUBNETWORKS, `"${AspectCytoscape.CY_SUBNETWORKS}"`),
  },
};
