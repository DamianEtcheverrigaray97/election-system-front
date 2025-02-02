export class Voter {
    id : number;
    document : number;
    name: string;
    lastName: string;
    dob : Date;
    isCandidate : boolean;
  
    constructor(id : number, name: string, lastName: string, document : number, dob : Date, isCandidate : boolean) {
      this.name = name;
      this.lastName = lastName;
      this.id = id;
      this.document = document;
      this.dob = dob;
      this.isCandidate = isCandidate;
    }
}