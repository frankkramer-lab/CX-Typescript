import { Component, OnInit } from '@angular/core';
import { AspectCore } from 'cx-typescript';
import { EdgeAttributes } from 'src/app/models/edge-attributes';
import { Edges } from 'src/app/models/edges';
import { Network } from 'src/app/models/network';
import { NodeAttributes } from 'src/app/models/node-attributes';
import { Nodes } from 'src/app/models/nodes';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-network-statistics',
  templateUrl: './network-statistics.component.html',
  styleUrls: ['./network-statistics.component.scss'],
})
export class NetworkStatisticsComponent implements OnInit {
  nodes: Nodes[] = [];
  edges: Edges[] = [];

  nodeTitle = 'Node Attributes';
  edgeTitle = 'Edge Attributes';

  nodeAttributes: NodeAttributes[] = [];
  edgeAttributes: EdgeAttributes[] = [];

  selectedNodeAttributes: {
    aspectName: string;
    attributeName: string;
    attributeData: NodeAttributes[] | EdgeAttributes[];
  }[] = [];
  selectedEdgeAttributes: {
    aspectName: string;
    attributeName: string;
    attributeData: NodeAttributes[] | EdgeAttributes[];
  }[] = [];
  constructor(private networkService: NetworkService) {}

  ngOnInit() {
    this.subscribeToNetworkChange();
  }

  subscribeToNetworkChange() {
    this.networkService.selectedNetwork$.subscribe(
      (selectedNetwork: Network) => {
        if (!selectedNetwork) {
          return;
        }
        this.nodes = selectedNetwork.aspects.find(
          (item) => item.name === AspectCore.NODES
        ).aspectElements as Nodes[];

        this.edges = selectedNetwork.aspects.find(
          (item) => item.name === AspectCore.EDGES
        ).aspectElements as Edges[];

        this.nodeAttributes = selectedNetwork.aspects.find(
          (item) => item.name === AspectCore.NODE_ATTRIBUTES
        ).aspectElements as NodeAttributes[];

        this.edgeAttributes = selectedNetwork.aspects.find(
          (item) => item.name === AspectCore.EDGE_ATTRIBUTES
        ).aspectElements as EdgeAttributes[];
      }
    );
  }

  setSelectedAttributes(event: {
    aspectName: string;
    attributeName: string;
    attributeData: NodeAttributes[] | EdgeAttributes[];
  }) {
    if (event.aspectName === this.nodeTitle) {
      const attributeNameAlreadyExist = this.selectedNodeAttributes.find(
        (item) => item.attributeName === event.attributeName
      );
      console.log(event);
      console.log([...this.selectedNodeAttributes]);

      if (attributeNameAlreadyExist === undefined) {
        this.selectedNodeAttributes.push(event);
      }
    } else {
      const attributeNameAlreadyExist = this.selectedEdgeAttributes.find(
        (item) => item.attributeName === event.attributeName
      );
      if (attributeNameAlreadyExist === undefined) {
        this.selectedEdgeAttributes.push(event);
      }
    }
  }
}
