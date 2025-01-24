import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../api/candidate.model';
import { ApiResponse } from '../api/apiResponse';

@Injectable({
    providedIn: 'root'
})
export class VoteService {

    private API_VOTES_URL = environment.baseApiUrl+'/votes';

    constructor(private http: HttpClient) {}

    getMostVotesCandidates(): Observable<ApiResponse<Candidate[]>> {
      const httpHeaders = new HttpHeaders();
      return this.http.get<ApiResponse<Candidate[]>>(`${this.API_VOTES_URL}/most-voted`, { headers: httpHeaders });
    }
}
