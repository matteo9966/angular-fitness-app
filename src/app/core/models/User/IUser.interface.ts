export interface IUser {
    name:string;
    birthdate:string;
    gender:'M'|'F';
    height:number; //stored in cm and converted accordingly
    profileImg: string;
    id:string;
    email:string;
    bio:string;
    status:string;
}