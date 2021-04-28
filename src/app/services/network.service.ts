import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '../models/network';
import { ParseService } from './parse.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  network: Network | undefined;

  /**
   * NetworkService constructor
   * @param http
   * @param parseService
   */
  constructor(private http: HttpClient, private parseService: ParseService) {}

  /**
   * This method is used to read a network file (CX file)
   * Using the parse service the data will be converted into typed classes for further analysis
   *
   * @returns Observable<Network>
   */
  public getNetwork(): Observable<Network> {
    return this.http
      .get<any>('../../assets/data/Cell cycle_ G1_S phase transition.cx')
      .pipe(
        map((response: any) => {
          const network = this.parseService.parseCXToObjects(response);
          return network;
        })
      );
  }
}
