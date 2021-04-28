/**
 * This enum represents different core aspects that can be available  in a CX file
 */
export enum AspectCore {
  NUMBER_VERIFICATION = 'numberVerification',
  METADATA = 'metaData',
  NODES = 'nodes',
  EDGES = 'edges',
  NODE_ATTRIBUTES = 'nodeAttributes',
  EDGE_ATTRIBUTES = 'edgeAttributes',
  NETWORK_ATTRIBUTES = 'networkAttributes',
  CARTESIAN_LAYOUT = 'cartesianLayout',
  STATUS = 'status',
}

/**
 * This enum represents different cytoscape aspects that can be available in a CX file
 */
export enum AspectCytoscape {
  CY_GROUPS = 'cyGroups',
  CY_VISUAL_PROPERTIES = 'cyVisualProperties',
  CY_HIDDEN_ATTRIBUTES = 'cyHiddenAttributes',
  CY_NETWORK_RELATIONS = 'cyNetworkRelations',
  CY_SUBNETWORKS = 'cySubNetworks',
  CY_TABLE_COLUMN = 'cyTableColumn',
}

/**
 * This enum represents different opaque aspects that can be available in a CX file
 */
export enum AspectOpaque {
  NDEX_STATUS = 'ndexStatus',
  CITATIONS = 'citations',
  NODE_CITATIONS = 'nodeCitations',
  EDGE_CITATIONS = 'edgeCitations',
  SUPPORT = 'supports',
  EDGE_SUPPORTS = 'edgeSupports',
  NODE_SUPPORT = 'nodeSupports',
  FUNCTION_TERMS = 'functionTerms',
  REIEFIED_EDGES = 'reiefiedEdges',
  PROVENANCE_HISTORY = 'provenanceHistory',
}

/**
 * This enum represents the aspect type
 */
export enum AspectTypes {
  CORE,
  CYTOSCAPE,
  OPAQUE,
}
