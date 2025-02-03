import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../api/candidate.model';
import { ApiResponse } from '../api/apiResponse';
import { VoteDetails } from '../api/voteDetail';
import { Vote } from '../api/vote';
import { APIEndpoints } from '../config/api-endpoints';
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

  private API_VOTES_URL = environment.baseApiUrl + APIEndpoints.VOTES;

  constructor(private http: HttpClient) {}

  getMostVotesCandidates(): Observable<ApiResponse<Candidate[]>> {
    const httpHeaders = new HttpHeaders();
    return this.http.get<ApiResponse<Candidate[]>>(`${this.API_VOTES_URL}${APIEndpoints.MOST_VOTED}`, { headers: httpHeaders });
  }

  getVotes(): Observable<ApiResponse<Vote[]>> {
    const httpHeaders = new HttpHeaders();
    return this.http.get<ApiResponse<Vote[]>>(`${this.API_VOTES_URL}`, { headers: httpHeaders });
  }

  getVoteById(voteId: number): Observable<ApiResponse<VoteDetails>> {
    const httpHeaders = new HttpHeaders();
    return this.http.get<ApiResponse<VoteDetails>>(`${this.API_VOTES_URL}${APIEndpoints.VOTE}/${voteId}`, { headers: httpHeaders });
  }

  vote(newVote: NewVote): Observable<ApiResponse<VoterResponse>> {
    const httpHeaders = new HttpHeaders();
    return this.http.post<ApiResponse<VoterResponse>>(`${this.API_VOTES_URL}${APIEndpoints.VOTE}`, newVote, { headers: httpHeaders });
  }

  getAllVotableCandidates(): Observable<ApiResponse<Candidate[]>> {
    const httpHeaders = new HttpHeaders();
    return this.http.get<ApiResponse<Candidate[]>>(`${this.API_VOTES_URL}${APIEndpoints.GET_ALL_CANDIDATES}`, { headers: httpHeaders });
  }

}
