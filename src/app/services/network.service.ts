import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Network } from '../models/network';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  networks: Network[] = [];
  searchedNetworks: any[] = [];
  searchString = 'ndexbutler';

  selectedNetwork$ = new BehaviorSubject(undefined);
  netowrkInDashboard$ = new BehaviorSubject(undefined);

  /**
   * NDEx's public API endpoint
   * @private
   */
  private readonly ndexPublicApiHost = 'https://public.ndexbio.org/v2';

  /**
   * Options required for HTTP requests to public NDEx API
   *
   * @private
   */
  private readonly options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getNetworkSummary(networkUUID: string) {
    return this.http.get(
      `${this.ndexPublicApiHost}/network/${networkUUID}/summary`,
      this.options
    );
  }

  getNetworkInCxFormat(networkUUID: string) {
    return this.http.get(this.ndexPublicApiHost + '/network/' + networkUUID, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    });
  }

  getNetworkInCxFormatWithReportProgress(networkUUID: string) {
    return this.http.get(`${this.ndexPublicApiHost}/network/${networkUUID}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  searchForNetwork() {
    return this.http.post(
      `${this.ndexPublicApiHost}/search/network`,
      {
        searchString: this.searchString,
        includeGroups: true,
      },
      this.options
    );
  }

  addNetwork(network: Network) {
    this.networks.push(network);
    const searchedNetworkInstance = this.searchedNetworks.find(
      (item) =>
        item.externalId === network?.networkInformation?.uuid ||
        item.name === network?.networkInformation?.name
    );
    if (searchedNetworkInstance !== undefined) {
      this.updateNetworkProgressBarValues(searchedNetworkInstance);
    }
  }

  getNetworkByName(networkName: string) {
    return this.networks.find(
      (network) => network.networkInformation?.name === networkName
    );
  }

  getNetworkByUUID(networkUUID: string) {
    return this.networks.find(
      (network) => network.networkInformation?.uuid === networkUUID
    );
  }

  setSelectedNetwork$(selectedNetwork: any) {
    this.selectedNetwork$.next(selectedNetwork);
  }

  setNetowrkInDashboard$(selectedNetwork: any) {
    this.netowrkInDashboard$.next(selectedNetwork);
  }

  setSearchedNetworks(networks: any[]) {
    this.searchedNetworks = networks;
    this.showProgressBarIfNetworkAlreadyExist();
  }

  showProgressBarIfNetworkAlreadyExist() {
    this.searchedNetworks.map((item) => {
      if (
        this.getNetworkByName(item.name) ||
        this.getNetworkByUUID(item.externalId)
      ) {
        this.updateNetworkProgressBarValues(item);
      }
    });
  }

  updateNetworkProgressBarValues(item: any) {
    item.done = true;
    item.percentage = 100;
    item.progressbarType = 'success';
  }
}
