import { Injectable } from '@angular/core';
import {
  AspectCore,
  AspectCytoscape,
  AspectSettings,
} from '../helpers/enums/aspects.enum';
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
  aspectElementsMap: {
    [key: string]: any;
  } = {
    [AspectCore.NODES]: Nodes,
    [AspectCore.EDGES]: Edges,
    [AspectCore.NODE_ATTRIBUTES]: NodeAttributes,
    [AspectCore.EDGE_ATTRIBUTES]: EdgeAttributes,
    [AspectCore.NETWORK_ATTRIBUTES]: NetworkAttributes,
    [AspectCore.CARTESIAN_LAYOUT]: CartesianLayout,
    [AspectCytoscape.CY_GROUPS]: CyGroups,
    [AspectCytoscape.CY_VISUAL_PROPERTIES]: CyVisualProperties,
    [AspectCytoscape.CY_HIDDEN_ATTRIBUTES]: CyHiddenAttributes,
    [AspectCytoscape.CY_NETWORK_RELATIONS]: CyNetworkRelations,
    [AspectCytoscape.CY_SUBNETWORKS]: CySubNetworks,
    [AspectCytoscape.CY_TABLE_COLUMN]: CyTableColumn,
  };

  constructor() {}

  /**
   * This method is used to convert a CX file into a Network class
   * @param data any[]
   * @returns Network
   */
  parseCXToObjects(data: any[]): Network {
    // loop on the aspects read from the CX file
    data.map((aspect: any, aspectIndex: number) => {
      // get aspect names
      const key = Object.keys(aspect).toString();

      if (key === AspectSettings.NUMBER_VERIFICATION) {
        (aspect[key] as NumberVerification[]).map(
          (numberVerification: NumberVerification) => {
            this.network.numberVerification = numberVerification;
          }
        );
      } else if (key === AspectSettings.METADATA) {
        (aspect[key] as Metadata[]).map((metadata: Metadata) => {
          this.parseMetaData(aspectIndex, metadata);
        });
      } else if (key === AspectSettings.STATUS) {
        (aspect[key] as Status[]).map((status: Status) => {
          this.network.status = status;
        });
      } else if (
        Object.values(AspectCore).includes(key as AspectCore) ||
        Object.values(AspectCytoscape).includes(key as AspectCytoscape)
      ) {
          const aspectElementType = this.aspectElementsMap[key];

          let networkAspect = this.network.aspects?.find(
            (aspect) => aspect.name === key
          );

          if (networkAspect === undefined) {
            networkAspect = new Aspect<typeof aspectElementType>(key);
            this.network.aspects?.push(networkAspect);
          }
          aspect[key].map((aspectElement: any) => {
            const parsedElement = this.parseAspectElements(
              aspectElementType,
              aspectElement
            );
            if (parsedElement !== null && parsedElement !== undefined) {
              networkAspect?.aspectElements.push(parsedElement);
            }
          });
      }
    });
    return this.network;
  }

  parseAspectElements<Type extends AspectElement>(
    type: new (...args: any) => Type,
    ...args: any
  ): Type {
    return new type().parseElement(...args);
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
