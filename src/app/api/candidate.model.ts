export class Candidate {
    candidateId: number;
    name: string;
    lastName: string;
    totalVotes: number;
  
    constructor(
      candidateId: number,
      name: string,
      lastName: string,
      totalVotes: number
    ) {
      this.candidateId = candidateId;
      this.name = name;
      this.lastName = lastName;
      this.totalVotes = totalVotes;
    }
  }
  