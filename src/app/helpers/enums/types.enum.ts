/**
 * This enum represents different DataTypes that can be available in a CX file
 */
export enum DataTypes {
  BOOLEAN = 'boolean',
  DOUBLE = 'double',
  INTEGER = 'integer',
  LONG = 'long',
  STRING = 'string',
  LIST_OF_BOOLEAN = 'list_of_boolean',
  LIST_OF_DOUBLE = 'list_of_double',
  LIST_OF_INTEGER = 'list_of_integer',
  LIST_OF_LONG = 'list_of_long',
  LIST_OF_STRING = 'list_of_string'
}

/**
 * This enum represents different ElementProperties that can be available in a CX file
 */
export enum ElementProperties {
  NETWORK = 'network',
  NODES_DEFAULT = 'nodes:default',
  EDGES_DEFAULT = 'edges:default',
  NODES = 'nodes',
  EDGES = 'edges'
}

/**
 * This enum represents different AppliesTo properties that can be available in a CX file
 */
export enum AppliesTo {
  NODE_TABLE = 'node_table',
  EDGE_TABLE = 'edge_table',
  NETWORK_TABLE = 'network_table'
}

/**
 * This enum represents different Relationship that can be available in a CX file
 */
export enum Relationship {
  VIEW = 'view',
  SUBNETWork = 'subnetwork'
}
