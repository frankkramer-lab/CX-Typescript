export interface NumberVerification {
  longNumber: number;
}

export interface MetaData {
  name: string;
  elementCount: number;
  version: string;
  idCounter: number | null;
}

export interface NodeAttribute {
  po: number;
  n: string;
  v: string;
  d: string;
}

export interface CyHiddenAttribute {
  n: string;
  v: string;
}

export interface Node {
  "@id": number;
  n: string;
  r: string;
}

export interface NetworkAttribute {
  n: string;
  v: string;
  d: string;
}

export interface CyTableColumn {
  applies_to: string;
  n: string;
  d: string;
}

export interface CartesianLayout {
  node: number;
  x: number;
  y: number;
}

export interface EdgeAttribute {
  po: number;
  n: string;
  v: string;
  d: string;
}

export interface Edge {
  "@id": number;
  s: number;
  t: number;
  i: string;
}

export interface Properties {
  nETWORK_ANNOTATION_SELECTION: string;
  nETWORK_BACKGROUND_PAINT: string;
  nETWORK_CENTER_X_LOCATION: string;
  nETWORK_CENTER_Y_LOCATION: string;
  nETWORK_CENTER_Z_LOCATION: string;
  nETWORK_DEPTH: string;
  nETWORK_EDGE_SELECTION: string;
  nETWORK_FORCE_HIGH_DETAIL: string;
  nETWORK_HEIGHT: string;
  nETWORK_NODE_LABEL_SELECTION: string;
  nETWORK_NODE_SELECTION: string;
  nETWORK_SCALE_FACTOR: string;
  nETWORK_SIZE: string;
  nETWORK_WIDTH: string;
  cOMPOUND_NODE_PADDING: string;
  cOMPOUND_NODE_SHAPE: string;
  nODE_BORDER_PAINT: string;
  nODE_BORDER_STROKE: string;
  nODE_BORDER_TRANSPARENCY: string;
  nODE_BORDER_WIDTH: string;
  nODE_CUSTOMGRAPHICS_1: string;
  nODE_CUSTOMGRAPHICS_2: string;
  nODE_CUSTOMGRAPHICS_3: string;
  nODE_CUSTOMGRAPHICS_4: string;
  nODE_CUSTOMGRAPHICS_5: string;
  nODE_CUSTOMGRAPHICS_6: string;
  nODE_CUSTOMGRAPHICS_7: string;
  nODE_CUSTOMGRAPHICS_8: string;
  nODE_CUSTOMGRAPHICS_9: string;
  nODE_CUSTOMGRAPHICS_POSITION_1: string;
  nODE_CUSTOMGRAPHICS_POSITION_2: string;
  nODE_CUSTOMGRAPHICS_POSITION_3: string;
  nODE_CUSTOMGRAPHICS_POSITION_4: string;
  nODE_CUSTOMGRAPHICS_POSITION_5: string;
  nODE_CUSTOMGRAPHICS_POSITION_6: string;
  nODE_CUSTOMGRAPHICS_POSITION_7: string;
  nODE_CUSTOMGRAPHICS_POSITION_8: string;
  nODE_CUSTOMGRAPHICS_POSITION_9: string;
  nODE_CUSTOMGRAPHICS_SIZE_1: string;
  nODE_CUSTOMGRAPHICS_SIZE_2: string;
  nODE_CUSTOMGRAPHICS_SIZE_3: string;
  nODE_CUSTOMGRAPHICS_SIZE_4: string;
  nODE_CUSTOMGRAPHICS_SIZE_5: string;
  nODE_CUSTOMGRAPHICS_SIZE_6: string;
  nODE_CUSTOMGRAPHICS_SIZE_7: string;
  nODE_CUSTOMGRAPHICS_SIZE_8: string;
  nODE_CUSTOMGRAPHICS_SIZE_9: string;
  nODE_CUSTOMPAINT_1: string;
  nODE_CUSTOMPAINT_2: string;
  nODE_CUSTOMPAINT_3: string;
  nODE_CUSTOMPAINT_4: string;
  nODE_CUSTOMPAINT_5: string;
  nODE_CUSTOMPAINT_6: string;
  nODE_CUSTOMPAINT_7: string;
  nODE_CUSTOMPAINT_8: string;
  nODE_CUSTOMPAINT_9: string;
  nODE_DEPTH: string;
  nODE_FILL_COLOR: string;
  nODE_HEIGHT: string;
  nODE_LABEL_COLOR: string;
  nODE_LABEL_FONT_FACE: string;
  nODE_LABEL_FONT_SIZE: string;
  nODE_LABEL_POSITION: string;
  nODE_LABEL_TRANSPARENCY: string;
  nODE_LABEL_WIDTH: string;
  nODE_NESTED_NETWORK_IMAGE_VISIBLE: string;
  nODE_PAINT: string;
  nODE_SELECTED: string;
  nODE_SELECTED_PAINT: string;
  nODE_SHAPE: string;
  nODE_SIZE: string;
  nODE_TRANSPARENCY: string;
  nODE_VISIBLE: string;
  nODE_WIDTH: string;
  nODE_X_LOCATION: string;
  nODE_Y_LOCATION: string;
  nODE_Z_LOCATION: string;
  eDGE_CURVED: string;
  eDGE_LABEL_COLOR: string;
  eDGE_LABEL_FONT_FACE: string;
  eDGE_LABEL_FONT_SIZE: string;
  eDGE_LABEL_TRANSPARENCY: string;
  eDGE_LABEL_WIDTH: string;
  eDGE_LINE_TYPE: string;
  eDGE_PAINT: string;
  eDGE_SELECTED: string;
  eDGE_SELECTED_PAINT: string;
  eDGE_SOURCE_ARROW_SELECTED_PAINT: string;
  eDGE_SOURCE_ARROW_SHAPE: string;
  eDGE_SOURCE_ARROW_SIZE: string;
  eDGE_SOURCE_ARROW_UNSELECTED_PAINT: string;
  eDGE_STROKE_SELECTED_PAINT: string;
  eDGE_STROKE_UNSELECTED_PAINT: string;
  eDGE_TARGET_ARROW_SELECTED_PAINT: string;
  eDGE_TARGET_ARROW_SHAPE: string;
  eDGE_TARGET_ARROW_SIZE: string;
  eDGE_TARGET_ARROW_UNSELECTED_PAINT: string;
  eDGE_TRANSPARENCY: string;
  eDGE_UNSELECTED_PAINT: string;
  eDGE_VISIBLE: string;
  eDGE_WIDTH: string;
}

export interface Dependencies {
  nodeCustomGraphicsSizeSync: string;
  nodeSizeLocked: string;
  arrowColorMatchesEdge: string;
}

export interface NODEFILLCOLOR {
  type: string;
  definition: string;
}

export interface NODELABEL {
  type: string;
  definition: string;
}

export interface NODELABELFONTFACE {
  type: string;
  definition: string;
}

export interface NODELABELFONTSIZE {
  type: string;
  definition: string;
}

export interface NODESHAPE {
  type: string;
  definition: string;
}

export interface NODESIZE {
  type: string;
  definition: string;
}

export interface EDGEUNSELECTEDPAINT {
  type: string;
  definition: string;
}

export interface EDGEWIDTH {
  type: string;
  definition: string;
}

export interface Mappings {
  nODE_FILL_COLOR: NODEFILLCOLOR;
  nODE_LABEL: NODELABEL;
  nODE_LABEL_FONT_FACE: NODELABELFONTFACE;
  nODE_LABEL_FONT_SIZE: NODELABELFONTSIZE;
  nODE_SHAPE: NODESHAPE;
  nODE_SIZE: NODESIZE;
  eDGE_UNSELECTED_PAINT: EDGEUNSELECTEDPAINT;
  eDGE_WIDTH: EDGEWIDTH;
}

export interface CyVisualProperty {
  properties_of: string;
  properties: Properties;
  dependencies: Dependencies;
  mappings: Mappings;
}


export interface Root {
  numberVerification: NumberVerification[];
  metaData: MetaData[];
  nodeAttributes: NodeAttribute[];
  cyHiddenAttributes: CyHiddenAttribute[];
  nodes: Node[];
  networkAttributes: NetworkAttribute[];
  cyTableColumn: CyTableColumn[];
  cartesianLayout: CartesianLayout[];
  edgeAttributes: EdgeAttribute[];
  edges: Edge[];
  cyVisualProperties: CyVisualProperty[];
  status: Status[];
}
