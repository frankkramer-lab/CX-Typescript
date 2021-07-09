import { AspectCore, AspectCytoscape } from '../helpers/enums/aspects.enum';
import * as i18 from '../i18n';
import {
  _cyHiddenAttributesArr,
  _edgeAttributesArr,
  _networkAttributesArr,
  _nodeAttributesArr,
  _cyTableColumnArr,
} from './attributes.schema';
import { _cartesianLayoutArr } from './cartesian-layout.schema';
import { _cyGroupArr } from './cy-group.schema';
import { _cyNetworkRelationsArr } from './cy-network-relations.schema';
import { _cySubNetworksArr } from './cy-sub-networks.schema';
import { _cyVisualPropertiesArr } from './cy-visual-properties.schema';
import { _edgesArr } from './edges.schema';
import { _metaDataArr } from './metadata.schema';
import { _nodesArr } from './nodes.schema';
import { _numberVerificationArr } from './number-verification.schema';
import { _statusArr } from './status.schema';

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
