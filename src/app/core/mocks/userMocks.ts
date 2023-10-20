import { IUser } from '../models/User/IUser.interface';

export const mockUser: IUser = {
  bio: 'lorem blablabal',
  birthdate: new Date().toISOString(),
  email: 'm@m.m',
  gender: 'F',
  id: 'userrandomid-1',
  name: 'username',
  profileImg: 'userprofilePic',
  status: 'this is a short status',
  backgroundImg: '',
  socials: [],
  bodyStats:{
    height:177,
    weight:177,
  }
};
