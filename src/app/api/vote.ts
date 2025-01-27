import { Candidate } from "./candidate.model";
import { Voter } from "./voter";

export class Vote {
    voteId: number;
    voteDate: string; 
    candidate: Candidate;  
    voter: Voter;      
  
    constructor(
      voteId: number,
      voteDate: string,
      candidate: Candidate,
      voter: Voter
    ) {
      this.voteId = voteId;
      this.voteDate = voteDate;
      this.candidate = candidate;
      this.voter = voter;
    }
  }