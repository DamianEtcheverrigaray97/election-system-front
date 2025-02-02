import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../api/candidate.model';
import { ApiResponse } from '../api/apiResponse';
import { VoteDetails } from '../api/voteDetail';
import { Vote } from '../api/vote';
export interface VoterResponse {
  voterId: number;
  message: string;
}

export interface NewVote {
  document: number | null;
  candidateId: string | null;
}
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

    getVotes(): Observable<ApiResponse<Vote[]>> {
      const httpHeaders = new HttpHeaders();
      return this.http.get<ApiResponse<Vote[]>>(`${this.API_VOTES_URL}`, { headers: httpHeaders });
    }

    getVoteById(voteId: number): Observable<ApiResponse<VoteDetails>> {
      const httpHeaders = new HttpHeaders();
      return this.http.get<ApiResponse<VoteDetails>>(`${this.API_VOTES_URL}/vote/${voteId}`, { headers: httpHeaders });
    }

    getAllVotableCandidates(): Observable<ApiResponse<Candidate[]>> {
      const httpHeaders = new HttpHeaders();
      return this.http.get<ApiResponse<Candidate[]>>(`${this.API_VOTES_URL}/get-all-candidates`, { headers: httpHeaders });
    }

    vote(newVote : NewVote): Observable<ApiResponse<VoterResponse>> {
      const httpHeaders = new HttpHeaders();
      return this.http.post<ApiResponse<VoterResponse>>(`${this.API_VOTES_URL}/vote`, newVote, { headers: httpHeaders });
    }
}
