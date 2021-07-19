import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Network } from '../models/network';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  networks: Network[] = [];
  selectedNetwork$ = new Subject();

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
      this.ndexPublicApiHost + '/network/' + networkUUID + '/summary',
      this.options
    );
  }

  getNetworkInCxFormat(networkUUID: string) {
    return this.http.get(
      this.ndexPublicApiHost + '/network/' + networkUUID,
      this.options
    );
  }

  addNetwork(network: Network) {
    this.networks.push(network);
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

  setSelectedNetwork(network: any) {
    this.selectedNetwork$.next(network);
  }
}
