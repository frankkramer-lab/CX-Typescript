import { Component, OnInit } from '@angular/core';
import { Network } from 'src/app/models/network';
import { NetworkService } from 'src/app/services/network.service';
import { ParseService } from 'src/app/services/parse.service';

@Component({
  selector: 'app-side-bar-manage',
  templateUrl: './side-bar-manage.component.html',
  styleUrls: ['./side-bar-manage.component.scss'],
})
export class SideBarManageComponent implements OnInit {
  ndexNetworkUUID = '';
  httpErrorMessage = '';
  invalidExtension = '';
  networkAlreadyExist = '';

  loadingHttp = false;
  loadingFile = false;

  elementLimit = 30000;
  sizeLimit = 100; // MB
  currentFileSize!: number;

  nodeCount!: number;
  edgeCount!: number;

  showFileElementCountTooBig = false;
  showFileSizeTooLargeAlert = false;
  showFileNotValidAlert = false;
  showFileSizeOkAlert = false;
  showHttpErrorAlert = false;
  showNetworkAlreadyExistAlert = false;

  private readonly megaFactor = 1000 * 1000; // MB
  private readonly duration = 8 * 1000; // seconds

  fileToUpload: File | undefined;
  fileExtention = 'cx';

  constructor(
    private networkService: NetworkService,
    private parseService: ParseService
  ) {}

  ngOnInit() {}

  importFromNdex() {
    this.showFileElementCountTooBig = false;
    this.showFileSizeTooLargeAlert = false;
    this.showFileNotValidAlert = false;
    this.showFileSizeOkAlert = false;
    this.showHttpErrorAlert = false;
    this.showNetworkAlreadyExistAlert = false;

    if (!this.ndexNetworkUUID) {
      this.loadingHttp = false;
      return;
    }
    this.loadingHttp = true;
    let networkAlreadyExist = this.networkService.getNetworkByUUID(
      this.ndexNetworkUUID
    );
    if (networkAlreadyExist !== undefined) {
      this.showNetworkAlreadyExistError(
        `Network with name ${networkAlreadyExist.networkInformation?.name} and UUID ${this.ndexNetworkUUID} already exist in the available networks`
      );
      this.loadingHttp = false;
      return;
    }

    this.networkService.getNetworkSummary(this.ndexNetworkUUID).subscribe(
      (networkSummary: any) => {
        if (this.checkNodesAndEdgesSize(networkSummary)) {
          this.showInvalidNodesAndEdgesSizeError(networkSummary);
          this.loadingHttp = false;
          return;
        }

        this.networkService
          .getNetworkInCxFormat(this.ndexNetworkUUID)
          .subscribe(
            (network: any) => {
              const dataSize = new TextEncoder().encode(
                JSON.parse(network)
              ).length;
              this.currentFileSize = Number(
                (dataSize / this.megaFactor).toFixed(2)
              );
              if (this.currentFileSize > this.sizeLimit) {
                this.showFileSizeIsToBigError();
                return;
              }
              this.showFileSizeIsOk();
              let parsedNetwork = this.parseService.parseCXToObjects(JSON.parse(network));
              parsedNetwork.networkInformation!.uuid = this.ndexNetworkUUID;
              parsedNetwork.editorOption!.networkTxt = network;
              this.networkService.addNetwork(parsedNetwork);
            },
            (error) => {
              this.showHttpErrorMessage(error.error.message);
            }
          );
      },
      (error) => {
        this.showFileElementCountTooBig = false;
        this.showHttpErrorMessage(error.error.message);
        this.loadingHttp = false;
      }
    );
  }

  importLocalFile(): void {
    if (this.fileToUpload === undefined) {
      this.loadingFile = false;
      return;
    }
    this.loadingFile = true;

    this.fileToUpload
      .text()
      .then((network) => {
        let parsedNetwork = this.parseService.parseCXToObjects(
          JSON.parse(network)
        );

        if (parsedNetwork.networkInformation?.name !== undefined) {
          let networkAlreadyExist = this.networkService.getNetworkByName(
            parsedNetwork.networkInformation.name
          );
          if (networkAlreadyExist !== undefined) {
            this.showNetworkAlreadyExistError(
              `Network with name ${networkAlreadyExist.networkInformation?.name} already exist in the available networks`
            );
            return;
          } else {
            parsedNetwork.networkInformation!.uuid = undefined;
            parsedNetwork.editorOption!.networkTxt = network;
            this.networkService.addNetwork(parsedNetwork);
            this.fileToUpload = undefined;
          }
        }
      })
      .finally(() => (this.loadingFile = false))
      .catch((error) => console.error(error));
  }

  setAndValidateFile(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.showFileElementCountTooBig = false;
    this.showFileSizeTooLargeAlert = false;
    this.showFileNotValidAlert = false;
    this.showFileSizeOkAlert = false;
    this.showHttpErrorAlert = false;
    this.showNetworkAlreadyExistAlert = false;

    if (target.files && target.files.length > 0) {
      this.fileToUpload = target.files[0];
    } else {
      this.fileToUpload = undefined;
      return;
    }
    const pointSplit = this.fileToUpload.name.split('.');
    const fileExtension = pointSplit[pointSplit.length - 1];
    this.currentFileSize = Number(
      (this.fileToUpload.size / this.megaFactor).toFixed(2)
    );

    if (this.fileToUpload.size > this.sizeLimit * this.megaFactor) {
      this.showFileSizeIsToBigError();
      this.fileToUpload = undefined;
    } else if (this.fileExtention !== fileExtension) {
      this.showInvalidFileExtentionError(fileExtension);
      this.fileToUpload = undefined;
    } else {
      this.showFileSizeIsOk();
    }
  }

  private showInvalidFileExtentionError(fileExtension: string) {
    this.invalidExtension = fileExtension;
    this.showFileNotValidAlert = true;
    setTimeout(() => {
      this.showFileNotValidAlert = false;
    }, this.duration);
  }

  private showFileSizeIsOk() {
    this.showFileSizeOkAlert = true;
    this.loadingHttp = false;

    setTimeout(() => {
      this.showFileSizeOkAlert = false;
    }, this.duration);
  }

  private showFileSizeIsToBigError() {
    this.showFileSizeTooLargeAlert = true;
    this.loadingHttp = false;

    setTimeout(() => {
      this.showFileSizeTooLargeAlert = false;
    }, this.duration);
  }

  private showHttpErrorMessage(errorMessage: string) {
    this.showHttpErrorAlert = true;
    this.httpErrorMessage = errorMessage;
    setTimeout(() => {
      this.showHttpErrorAlert = false;
    }, this.duration);
  }

  private showInvalidNodesAndEdgesSizeError(networkSummary: any) {
    this.nodeCount = networkSummary.nodeCount;
    this.edgeCount = networkSummary.edgeCount;
    this.showFileElementCountTooBig = true;

    setTimeout(() => {
      this.showFileElementCountTooBig = false;
    }, this.duration);
  }

  private showNetworkAlreadyExistError(errorMessage: string) {
    this.showNetworkAlreadyExistAlert = true;
    this.networkAlreadyExist = errorMessage;
    setTimeout(() => {
      this.showNetworkAlreadyExistAlert = false;
    }, this.duration);
  }

  private checkNodesAndEdgesSize(networkSummary: any) {
    return (
      (networkSummary.nodeCount &&
        networkSummary.nodeCount > this.elementLimit) ||
      (networkSummary.edgeCount && networkSummary.edgeCount > this.elementLimit)
    );
  }

  get networks() {
    return this.networkService.networks;
  }
}
