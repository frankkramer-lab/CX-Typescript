import { Injectable } from '@angular/core';
import { AspectCore, AspectCytoscape } from '../helpers/enums/aspects.enum';
import { MappingTypes } from '../helpers/enums/mappings.enum';
import {
  AppliesTo,
  DataTypes,
  ElementProperties,
  Relationship,
} from '../helpers/enums/types.enum';
import { KeyValue } from '../helpers/key-value';
import { Aspect } from '../models/aspect';
import { AspectElement } from '../models/aspect-element';
import { CartesianLayout } from '../models/cartesian-layout';
import { CyGroups } from '../models/cy-groups';
import { CyHiddenAttributes } from '../models/cy-hidden-attributes';
import { CyNetworkRelations } from '../models/cy-network-relations';
import { CySubNetworks } from '../models/cy-sub-networks';
import { CyTableColumn } from '../models/cy-table-column';
import { CyVisualProperties } from '../models/cy-visual-properties';
import { EdgeAttributes } from '../models/edge-attributes';
import { Edges } from '../models/edges';
import { GradientColor } from '../models/gradient-color';
import { Mapping } from '../models/mapping';
import { MappingContinuous } from '../models/mapping-continuous';
import { MappingDiscrete } from '../models/mapping-discrete';
import { MappingPassthrough } from '../models/mapping-passthrough';
import { Metadata } from '../models/metadata';
import { Network } from '../models/network';
import { NetworkAttributes } from '../models/network-attributes';
import { NodeAttributes } from '../models/node-attributes';
import { Nodes } from '../models/nodes';
import { NumberVerification } from '../models/number-verification';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root',
})
export class ParseService {
  network: Network = { aspects: [] };
  /**
   * ParseService constructor
   */
  constructor() {}

  /**
   * This method is used to convert a CX file into a Network class
   * @param data any[]
   * @returns Network
   */
  parseCXToObjects(data: any[]): Network {
    data.map((aspect: any, aspectIndex: number) => {
      // get aspect names
      const key = Object.keys(aspect).toString();
      switch (key) {
        case AspectCore.NUMBER_VERIFICATION:
          (aspect[key] as NumberVerification[]).map(
            (numberVerification: NumberVerification) => {
              this.network.numberVerification = numberVerification;
            }
          );
          break;

        case AspectCore.METADATA:
          (aspect[key] as Metadata[]).map((metadata: Metadata) => {
            this.parseMetaData(aspectIndex, metadata);
          });
          break;

        case AspectCore.NODES:
          let nodeAspect = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as { '@id': number; n?: string; r?: string }[]).map(
            (node: { '@id': number; n?: string; r?: string }) => {
              nodeAspect = this.parseNodes(nodeAspect, node, key);
            }
          );
          break;

        case AspectCore.EDGES:
          let edgeAspect = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            '@id': number;
            s: number;
            t: number;
            i?: string;
          }[]).map(
            (edge: { '@id': number; s: number; t: number; i?: string }) => {
              edgeAspect = this.parseEdges(edgeAspect, edge, key);
            }
          );
          break;
        case AspectCore.NODE_ATTRIBUTES:
          let nodeAttributes = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            po: number;
            n: string;
            v: string | string[];
            d?: DataTypes;
            s?: number;
          }[]).map(
            (na: {
              po: number;
              n: string;
              v: any;
              d?: DataTypes;
              s?: number;
            }) => {
              nodeAttributes = this.parseNodeAttributes(
                nodeAttributes,
                na,
                key
              );
            }
          );
          break;
        case AspectCore.EDGE_ATTRIBUTES:
          let edgeAttributes = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            po: number;
            n: string;
            v: string | string[];
            d?: DataTypes;
            s?: number;
          }[]).map(
            (ea: {
              po: number;
              n: string;
              v: any;
              d?: DataTypes;
              s?: number;
            }) => {
              edgeAttributes = this.parseEdgeAttributes(
                edgeAttributes,
                ea,
                key
              );
            }
          );
          break;
        case AspectCore.NETWORK_ATTRIBUTES:
          let networkAttributes = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            n: string;
            v: string | string[];
            d?: DataTypes;
            s?: number;
          }[]).map((na: { n: string; v: any; d?: DataTypes; s?: number }) => {
            networkAttributes = this.parseNetworkAttributes(
              networkAttributes,
              na,
              key
            );
          });
          break;
        case AspectCore.CARTESIAN_LAYOUT:
          let cartesianLayout = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            node: number;
            x: number;
            y: number;
            z?: number;
            view?: number;
          }[]).map(
            (cl: {
              node: number;
              x: number;
              y: number;
              z?: number;
              view?: number;
            }) => {
              cartesianLayout = this.parseCartesianLayout(
                cartesianLayout,
                cl,
                key
              );
            }
          );
          break;

        case AspectCytoscape.CY_GROUPS:
          let cyGroupsLayout = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            '@id': number;
            n: string;
            nodes: number[];
            external_edges: number[];
            internal_edges: number[];
            collapsed: boolean;
          }[]).map(
            (groups: {
              '@id': number;
              n: string;
              nodes: number[];
              external_edges: number[];
              internal_edges: number[];
              collapsed: boolean;
            }) => {
              cyGroupsLayout = this.parseCyGroups(cyGroupsLayout, groups, key);
            }
          );

          break;
        case AspectCytoscape.CY_HIDDEN_ATTRIBUTES:
          let cyHiddenAttributes = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            s?: number;
            n: string;
            v: any;
            d?: DataTypes;
          }[]).map((ht: { s?: number; n: string; v: any; d?: DataTypes }) => {
            cyHiddenAttributes = this.parseCyHiddenAttributes(
              cyHiddenAttributes,
              ht,
              key
            );
          });

          break;
        case AspectCytoscape.CY_NETWORK_RELATIONS:
          let cyNetworkRelations = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            p?: number;
            c: number;
            r?: Relationship;
            name?: string;
          }[]).map(
            (nr: {
              p?: number;
              c: number;
              r?: Relationship;
              name?: string;
            }) => {
              cyNetworkRelations = this.parseCyNetworkRelations(
                cyNetworkRelations,
                nr,
                key
              );
            }
          );
          break;
        case AspectCytoscape.CY_SUBNETWORKS:
          let cySubNetworks = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            '@id': number;
            edges: number[] | 'all';
            nodes: number[] | 'all';
          }[]).map(
            (sn: {
              '@id': number;
              edges: number[] | 'all';
              nodes: number[] | 'all';
            }) => {
              cySubNetworks = this.parseCySubNetworks(cySubNetworks, sn, key);
            }
          );
          break;
        case AspectCytoscape.CY_TABLE_COLUMN:
          let cyTableColumn = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            s?: number;
            n: string;
            d?: DataTypes;
            applies_to: AppliesTo;
          }[]).map(
            (tc: {
              s?: number;
              n: string;
              d?: DataTypes;
              applies_to: AppliesTo;
            }) => {
              cyTableColumn = this.parseCyTableColumn(cyTableColumn, tc, key);
            }
          );
          break;
        case AspectCytoscape.CY_VISUAL_PROPERTIES:
          let cyVisualProperties = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );
          (aspect[key] as {
            properties_of: ElementProperties;
            applies_to?: number;
            view?: number;
            properties: KeyValue<string>;
            dependencies: KeyValue<string>;
            mappings: any;
          }[]).map(
            (vp: {
              properties_of: ElementProperties;
              applies_to?: number;
              view?: number;
              properties: KeyValue<string>;
              dependencies: KeyValue<string>;
              mappings: any;
            }) => {
              cyVisualProperties = this.parseCyVisualProperties(
                cyVisualProperties,
                vp,
                key
              );
            }
          );
          break;

        case AspectCore.STATUS:
          (aspect[key] as Status[]).map((status: Status) => {
            this.network.status = status;
          });
          break;
        default:
          break;
      }
    });
    return this.network;
  }

  /**
   * Interprets a passthrough mapping and elicits col and style property
   *
   * @param obj JSON containing the mapping's definition
   * @private
   */
  private parseDefinitionPassthrough(obj: any): MappingPassthrough {
    const regex = new RegExp('COL=(.*?),');
    var col = obj.definition.match(regex)[1];

    return {
      col,
    };
  }

  /**
   * Returns true, if the given list consists of distinct values
   * @param thresholds List of values to be checked
   * @private
   */
  private validateThresholds(thresholds: number[] | string[]): boolean {
    const uniqueThresholds: any = [];

    for (const th of thresholds) {
      if (uniqueThresholds.includes(th)) {
        console.log(
          'Thresholds need to be distinct! No color gradient can be built!'
        );
        return false;
      }
      uniqueThresholds.push(th);
    }
    return true;
  }

  /**
   * Builds the color gradient for a continuous mapping with color application
   * @param mapping Mapping to be interpreted as color mapping
   * @private
   */
  private buildColorGradient(mapping: MappingContinuous): GradientColor[] {
    if (!this.validateThresholds(mapping.thresholds)) {
      return [];
    }

    const thresholds = mapping.thresholds as string[];
    const lowers = mapping.lowers as string[];
    const greaters = mapping.greaters as string[];
    const equals = mapping.equals as string[];

    const colorGradientCollection: GradientColor[] = [];
    const range: number =
      Number(thresholds[thresholds.length - 1]) - Number(thresholds[0]);
    if (range === 0) {
      return [];
    }
    colorGradientCollection.push({
      color: lowers[0],
      offset: '-1',
      numericThreshold: '-1',
    });
    for (const th of thresholds) {
      const offset = (
        ((Number(th) - Number(thresholds[0])) * 100) /
        range
      ).toFixed(0);
      const gradient: GradientColor = {
        color: equals[thresholds.indexOf(th)],
        offset: String(offset).concat('%'),
        numericThreshold: th,
      };
      colorGradientCollection.push(gradient);
    }
    colorGradientCollection.push({
      color: greaters[greaters.length - 1],
      offset: '101',
      numericThreshold: '101',
    });

    return colorGradientCollection;
  }

  /**
   * Interprets a continuous mapping and elicits all their thresholds to display intuitively
   *
   * @param obj JSON containing the mapping's definition
   * @param styleProperty Name of the property which is used for this mapping
   * @private
   */
  private parseMappingContinuous(obj: any): MappingContinuous {
    const mappingContinuous: MappingContinuous = {
      col: '',
      type: '',
      lowers: [],
      greaters: [],
      equals: [],
      thresholds: [],
      gradientColor: [],
      isColor: true,
    };

    const commaSplit = obj.definition.split(',');
    for (const cs of commaSplit) {
      const equalSplit = cs.split('=');

      switch (equalSplit[0]) {
        case 'COL':
          mappingContinuous.col = equalSplit[1];
          break;
        case 'T':
          mappingContinuous.type = equalSplit[1];
          break;
        case 'L':
          if (
            mappingContinuous.isColor &&
            (equalSplit[2].length !== 7 || equalSplit[2].indexOf('#') !== 0)
          ) {
            mappingContinuous.isColor = false;
          }
          mappingContinuous.lowers.splice(equalSplit[1], 0, equalSplit[2]);
          break;
        case 'E':
          if (
            mappingContinuous.isColor &&
            (equalSplit[2].length !== 7 || equalSplit[2].indexOf('#') !== 0)
          ) {
            mappingContinuous.isColor = false;
          }
          mappingContinuous.equals.splice(equalSplit[1], 0, equalSplit[2]);
          break;
        case 'G':
          if (
            mappingContinuous.isColor &&
            (equalSplit[2].length !== 7 || equalSplit[2].indexOf('#') !== 0)
          ) {
            mappingContinuous.isColor = false;
          }
          mappingContinuous.greaters.splice(equalSplit[1], 0, equalSplit[2]);
          break;
        case 'OV':
          mappingContinuous.thresholds.splice(equalSplit[1], 0, equalSplit[2]);
          break;
      }
    }
    if (mappingContinuous.isColor) {
      mappingContinuous.gradientColor = this.buildColorGradient(
        mappingContinuous
      );
    } else {
      mappingContinuous.gradientColor = [];
    }
    return mappingContinuous;
  }

  /**
   * Creates a discrete mapping object based on the definition string.
   * Keys and values are always considered to be strings
   *
   * @param obj JSON containing the mapping's definition
   * @private
   */

  private parseMappingDiscrete(obj: any): MappingDiscrete {
    const discreteMapping: MappingDiscrete = {
      col: '',
      type: '',
      keys: [],
      values: [],
    };

    // remove duplicate comma's
    const cleanDefinition = obj.definition.replace(/,,/g, ',');
    const commaSplit = cleanDefinition.split(',');
    const tmpV = [];
    const tmpK = [];

    for (let cs of commaSplit) {
      cs = cs.replace(/%/g, ',');

      const equalSplit = cs.split('=');
      switch (equalSplit[0]) {
        case 'COL':
          discreteMapping.col = equalSplit[1];
          break;
        case 'T':
          discreteMapping.type = equalSplit[1];
          break;
        case 'K':
          discreteMapping.keys.splice(equalSplit[1], 0, equalSplit[2]);
          break;
        case 'V':
          discreteMapping.values.splice(equalSplit[1], 0, equalSplit[2]);
          break;
      }
    }
    return discreteMapping;
  }

  private parseMappings(obj: any): KeyValue<Mapping>[] {
    let mapping: KeyValue<Mapping>[] = [];
    const data = Object.keys(obj);
    data.map((key: string) => {
      var property = obj[key];

      switch (obj[key].type) {
        case MappingTypes.DISCRETE:
          property.definition = this.parseMappingDiscrete(obj[key]);
          property.type = MappingTypes.DISCRETE;
          break;
        case MappingTypes.COUNTINUOUS:
          property.definition = this.parseMappingContinuous(obj[key]);
          property.type = MappingTypes.COUNTINUOUS;
          break;
        case MappingTypes.PASSTHROUGH:
          property.definition = this.parseDefinitionPassthrough(obj[key]);
          property.type = MappingTypes.PASSTHROUGH;
          break;

        default:
          break;
      }
      obj[key] = property;
      mapping.push(obj);
    });
    return mapping;
  }

  private parseCyVisualProperties(
    cyVisualProperties: Aspect<AspectElement> | undefined,
    vp: {
      properties_of: ElementProperties;
      applies_to?: number;
      view?: number;
      properties: KeyValue<string>;
      dependencies: KeyValue<string>;
      mappings: any;
    },
    key: AspectCytoscape
  ) {
    if (cyVisualProperties !== undefined) {
      const cyVisualPropertiesElement = new CyVisualProperties(
        vp.properties_of,
        vp.properties,
        vp.applies_to,
        vp.view,
        vp.dependencies
      );
      if (vp.mappings !== null && vp.mappings !== undefined) {
        cyVisualPropertiesElement.mappings = this.parseMappings(vp.mappings);
      }
      cyVisualProperties.aspectElements.push(cyVisualPropertiesElement);
    } else {
      cyVisualProperties = new Aspect<CyVisualProperties>(key);
      this.network.aspects?.push(cyVisualProperties);
      const cyVisualPropertiesElement = new CyVisualProperties(
        vp.properties_of,
        vp.properties,
        vp.applies_to,
        vp.view,
        vp.dependencies
      );
      if (vp.mappings !== null && vp.mappings !== undefined) {
        cyVisualPropertiesElement.mappings = this.parseMappings(vp.mappings);
      }
      cyVisualProperties.aspectElements.push(cyVisualPropertiesElement);
    }
    return cyVisualProperties;
  }
  private parseCyTableColumn(
    cyTableColumn: Aspect<AspectElement> | undefined,
    tc: {
      s?: number;
      n: string;
      d?: DataTypes;
      applies_to: AppliesTo;
    },
    key: AspectCytoscape
  ) {
    if (cyTableColumn !== undefined) {
      const cyTableColumnElement = new CyTableColumn(
        tc.n,
        tc.applies_to,
        tc.s,
        tc.d
      );
      cyTableColumn.aspectElements.push(cyTableColumnElement);
    } else {
      cyTableColumn = new Aspect<CyTableColumn>(key);
      this.network.aspects?.push(cyTableColumn);
      const cyTableColumnElement = new CyTableColumn(
        tc.n,
        tc.applies_to,
        tc.s,
        tc.d
      );
      cyTableColumn.aspectElements.push(cyTableColumnElement);
    }
    return cyTableColumn;
  }

  private parseCySubNetworks(
    cySubNetworks: Aspect<AspectElement> | undefined,
    sn: {
      '@id': number;
      edges: number[] | 'all';
      nodes: number[] | 'all';
    },
    key: AspectCytoscape
  ) {
    if (cySubNetworks !== undefined) {
      const cySubNetworksElement = new CySubNetworks(
        sn['@id'],
        sn.nodes,
        sn.edges
      );
      cySubNetworks.aspectElements.push(cySubNetworksElement);
    } else {
      cySubNetworks = new Aspect<CyNetworkRelations>(key);
      this.network.aspects?.push(cySubNetworks);
      const cySubNetworksElement = new CySubNetworks(
        sn['@id'],
        sn.nodes,
        sn.edges
      );
      cySubNetworks.aspectElements.push(cySubNetworksElement);
    }
    return cySubNetworks;
  }

  private parseCyNetworkRelations(
    cyNetworkRelations: Aspect<AspectElement> | undefined,
    nr: {
      p?: number;
      c: number;
      r?: Relationship;
      name?: string;
    },
    key: AspectCytoscape
  ) {
    if (cyNetworkRelations !== undefined) {
      const cyNetworkRelationsElement = new CyNetworkRelations(
        nr.c,
        nr.p,
        nr.r,
        nr.name
      );
      cyNetworkRelations.aspectElements.push(cyNetworkRelationsElement);
    } else {
      cyNetworkRelations = new Aspect<CyNetworkRelations>(key);
      this.network.aspects?.push(cyNetworkRelations);
      const cyNetworkRelationsElement = new CyNetworkRelations(
        nr.c,
        nr.p,
        nr.r,
        nr.name
      );
      cyNetworkRelations.aspectElements.push(cyNetworkRelationsElement);
    }
    return cyNetworkRelations;
  }

  private parseCyHiddenAttributes(
    cyHiddenAttributes: Aspect<AspectElement> | undefined,
    ht: {
      s?: number;
      n: string;
      v: any;
      d?: DataTypes;
    },
    key: AspectCytoscape
  ) {
    if (cyHiddenAttributes !== undefined) {
      const cyHiddenAttributesElement = new CyHiddenAttributes(
        ht.n,
        ht.v,
        ht.s,
        ht.d
      );
      cyHiddenAttributes.aspectElements.push(cyHiddenAttributesElement);
    } else {
      cyHiddenAttributes = new Aspect<CyHiddenAttributes>(key);
      this.network.aspects?.push(cyHiddenAttributes);
      const cyHiddenAttributesElement = new CyHiddenAttributes(
        ht.n,
        ht.v,
        ht.s,
        ht.d
      );
      cyHiddenAttributes.aspectElements.push(cyHiddenAttributesElement);
    }
    return cyHiddenAttributes;
  }

  private parseCyGroups(
    cyGroups: Aspect<AspectElement> | undefined,
    groups: {
      '@id': number;
      n: string;
      nodes: number[];
      external_edges: number[];
      internal_edges: number[];
      collapsed: boolean;
    },
    key: AspectCytoscape
  ) {
    if (cyGroups !== undefined) {
      const cyGroupsElement = new CyGroups(
        groups['@id'],
        groups.n,
        groups.nodes,
        groups.external_edges,
        groups.internal_edges,
        groups.collapsed
      );
      cyGroups.aspectElements.push(cyGroupsElement);
    } else {
      cyGroups = new Aspect<CyGroups>(key);
      this.network.aspects?.push(cyGroups);
      const cyGroupsElement = new CyGroups(
        groups['@id'],
        groups.n,
        groups.nodes,
        groups.external_edges,
        groups.internal_edges,
        groups.collapsed
      );
      cyGroups.aspectElements.push(cyGroupsElement);
    }
    return cyGroups;
  }

  private parseNetworkAttributes(
    networkAttributes: Aspect<AspectElement> | undefined,
    na: {
      n: string;
      v: any;
      d?: DataTypes;
      s?: number;
    },
    key: AspectCore
  ) {
    if (networkAttributes !== undefined) {
      const networkAttributesElement = new NetworkAttributes(
        na.n,
        na.v,
        na.d,
        na.s
      );
      networkAttributes.aspectElements.push(networkAttributesElement);
    } else {
      networkAttributes = new Aspect<NetworkAttributes>(key);
      this.network.aspects?.push(networkAttributes);
      const networkAttributesElement = new NetworkAttributes(
        na.n,
        na.v,
        na.d,
        na.s
      );
      networkAttributes.aspectElements.push(networkAttributesElement);
    }
    return networkAttributes;
  }
  private parseCartesianLayout(
    cartesianLayout: Aspect<AspectElement> | undefined,
    cl: {
      node: number;
      x: number;
      y: number;
      z?: number;
      view?: number;
    },
    key: AspectCore
  ) {
    if (cartesianLayout !== undefined) {
      const cartesianLayoutElement = new CartesianLayout(
        cl.node,
        cl.x,
        cl.y,
        cl.z,
        cl.view
      );
      cartesianLayout.aspectElements.push(cartesianLayoutElement);
    } else {
      cartesianLayout = new Aspect<CartesianLayout>(key);
      this.network.aspects?.push(cartesianLayout);
      const cartesianLayoutElement = new CartesianLayout(
        cl.node,
        cl.x,
        cl.y,
        cl.z,
        cl.view
      );
      cartesianLayout.aspectElements.push(cartesianLayoutElement);
    }
    return cartesianLayout;
  }

  private parseEdgeAttributes(
    edgeAttributes: Aspect<AspectElement> | undefined,
    ea: {
      po: number;
      n: string;
      v: any;
      d?: DataTypes | undefined;
      s?: number | undefined;
    },
    key: AspectCore
  ) {
    if (edgeAttributes !== undefined) {
      const edgeAttributesElement = new EdgeAttributes(
        ea.po,
        ea.n,
        ea.v,
        ea.d,
        ea.s
      );
      edgeAttributes.aspectElements.push(edgeAttributesElement);
    } else {
      edgeAttributes = new Aspect<EdgeAttributes>(key);
      this.network.aspects?.push(edgeAttributes);
      const edgeAttributesElement = new EdgeAttributes(
        ea.po,
        ea.n,
        ea.v,
        ea.d,
        ea.s
      );
      edgeAttributes.aspectElements.push(edgeAttributesElement);
    }
    return edgeAttributes;
  }

  private parseNodeAttributes(
    nodeAttributes: Aspect<AspectElement> | undefined,
    na: {
      po: number;
      n: string;
      v: any;
      d?: DataTypes | undefined;
      s?: number | undefined;
    },
    key: AspectCore
  ) {
    if (nodeAttributes !== undefined) {
      const nodeAttributesElement = new NodeAttributes(
        na.po,
        na.n,
        na.v,
        na.d,
        na.s
      );
      nodeAttributes.aspectElements.push(nodeAttributesElement);
    } else {
      nodeAttributes = new Aspect<NodeAttributes>(key);
      this.network.aspects?.push(nodeAttributes);
      const nodeAttributesElement = new NodeAttributes(
        na.po,
        na.n,
        na.v,
        na.d,
        na.s
      );
      nodeAttributes.aspectElements.push(nodeAttributesElement);
    }
    return nodeAttributes;
  }

  private parseEdges(
    edgeAspect: Aspect<AspectElement> | undefined,
    edge: { '@id': number; s: number; t: number; i?: string | undefined },
    key: AspectCore
  ) {
    if (edgeAspect !== undefined) {
      const edgeAspectElement = new Edges(edge['@id'], edge.s, edge.t, edge.i);
      edgeAspect.aspectElements.push(edgeAspectElement);
    } else {
      edgeAspect = new Aspect<Edges>(key);
      this.network.aspects?.push(edgeAspect);
      const edgeAspectElement = new Edges(edge['@id'], edge.s, edge.t, edge.i);
      edgeAspect.aspectElements.push(edgeAspectElement);
    }
    return edgeAspect;
  }

  private parseNodes(
    nodeAspect: Aspect<AspectElement> | undefined,
    node: { '@id': number; n?: string | undefined; r?: string | undefined },
    key: AspectCore
  ) {
    if (nodeAspect !== undefined) {
      const nodeAspectElement = new Nodes(node['@id'], node.n, node.r);
      nodeAspect.aspectElements.push(nodeAspectElement);
    } else {
      nodeAspect = new Aspect<Nodes>(key);
      this.network.aspects?.push(nodeAspect);
      const nodeAspectElement = new Nodes(node['@id'], node.n, node.r);
      nodeAspect.aspectElements.push(nodeAspectElement);
    }
    return nodeAspect;
  }

  private parseMetaData(aspectIndex: number, metadata: Metadata): void {
    if (aspectIndex === 1) {
      const preMetaDataAspect = new Aspect(metadata.name);
      preMetaDataAspect.aspectPreMetaData = metadata;
      this.network.aspects?.push(preMetaDataAspect);
    } else {
      let postMetaDataAspect = this.network.aspects?.find(
        (aspect) => aspect.name === metadata.name
      );
      if (postMetaDataAspect !== undefined) {
        postMetaDataAspect.aspectPostMetaData = metadata;
      } else {
        postMetaDataAspect = new Aspect(metadata.name);
        this.network.aspects?.push(postMetaDataAspect);
      }
    }
  }
}
