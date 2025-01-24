import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../api/candidate.model';
import { ApiResponse } from '../api/apiResponse';
import { Voter } from '../api/voter';


export interface VoterResponse {
  voterId: number;
  message: string;
}

@Injectable({
    providedIn: 'root'
})
export class VoterService {

    private API_VOTER_URL = environment.baseApiUrl+'/voters';

    constructor(private http: HttpClient) {}

    addVoter(newVoter : Voter): Observable<ApiResponse<VoterResponse>> {
      const httpHeaders = new HttpHeaders();
      return this.http.post<ApiResponse<VoterResponse>>(`${this.API_VOTER_URL}/addVoter`, newVoter, { headers: httpHeaders });
    }

}
