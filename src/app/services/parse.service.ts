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
   let network: Network = { networkInformation: {}, aspects: [], editorOption: {}, showInDashboard: true };

    // loop on the aspects read from the CX file
    data.map((aspect: any, aspectIndex: number) => {
      // get aspect names
      const key = Object.keys(aspect).toString();

      if (key === AspectSettings.NUMBER_VERIFICATION) {
        (aspect[key] as NumberVerification[]).map(
          (numberVerification: NumberVerification) => {
            network.numberVerification = numberVerification;
          }
        );
      } else if (key === AspectSettings.METADATA) {
        (aspect[key] as Metadata[]).map((metadata: Metadata) => {
          this.parseMetaData(network, aspectIndex, metadata);
        });
      } else if (key === AspectSettings.STATUS) {
        (aspect[key] as Status[]).map((status: Status) => {
          network.status = status;
        });
      } else if (
        Object.values(AspectCore).includes(key as AspectCore) ||
        Object.values(AspectCytoscape).includes(key as AspectCytoscape)
      ) {
        const aspectElementType = this.aspectElementsMap[key];

        let networkAspect = network.aspects?.find(
          (aspect) => aspect.name === key
        );

        if (networkAspect === undefined) {
          networkAspect = new Aspect<typeof aspectElementType>(key);
          network.aspects?.push(networkAspect);
        }
        aspect[key].map((aspectElement: any) => {
          const parsedElement = this.parseAspectElements(
            aspectElementType,
            aspectElement
          );
          if (parsedElement !== null && parsedElement !== undefined) {
            networkAspect?.aspectElements.push(parsedElement);
          }
          if (key === AspectCore.NETWORK_ATTRIBUTES) {
            var networkAttribute = parsedElement as NetworkAttributes;
            switch (networkAttribute.name) {
              case 'name':
                network.networkInformation!.name = networkAttribute.value;
                break;
              case 'rightsHolder':
                network.networkInformation!.rightsHolder =
                  networkAttribute.value;
                break;
              case 'rights':
                network.networkInformation!.rights =
                  networkAttribute.value;
                break;
              case 'networkType':
                network.networkInformation!.networkType =
                  networkAttribute.value;
                break;
              case 'organism':
                network.networkInformation!.organism =
                  networkAttribute.value;
                break;
              case 'description':
                network.networkInformation!.description =
                  networkAttribute.value;
                break;
              case 'version':
                network.networkInformation!.version =
                  networkAttribute.value;
                break;
              case 'author':
                network.networkInformation!.author =
                  networkAttribute.value;
                break;
            }
          }
        });
      }
    });
    return network;
  }

  parseAspectElements<Type extends AspectElement>(
    type: new (...args: any) => Type,
    ...args: any
  ): Type {
    return new type().parseElement(...args);
  }

  private parseMetaData(network: Network, aspectIndex: number, metadata: Metadata): void {
    if (aspectIndex === 1) {
      const preMetaDataAspect = new Aspect(metadata.name);
      preMetaDataAspect.aspectPreMetaData = metadata;
      network.aspects?.push(preMetaDataAspect);
    } else {
      let postMetaDataAspect = network.aspects?.find(
        (aspect) => aspect.name === metadata.name
      );
      if (postMetaDataAspect !== undefined) {
        postMetaDataAspect.aspectPostMetaData = metadata;
      } else {
        postMetaDataAspect = new Aspect(metadata.name);
        network.aspects?.push(postMetaDataAspect);
      }
    }
  }
}
