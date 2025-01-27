export class Voter {
    id : number;
    document : number;
    name: string;
    lastName: string;
    dob : Date;
    is_candidate : boolean;
  
    constructor(id : number, name: string, lastName: string, document : number, dob : Date, is_candidate : boolean) {
      this.name = name;
      this.lastName = lastName;
      this.id = id;
      this.document = document;
      this.dob = dob;
      this.is_candidate = is_candidate;
    }
}