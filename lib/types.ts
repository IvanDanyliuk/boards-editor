export enum Language {
  en = 'en',
  pl = 'pl',
  ua = 'ua'
};

export type Team = {
  id: string;
  name: string;
  teamLogo: string | null;
  teamColor: string;
  memberIds: any[];
  projectIds: string[];
  createdAt: Date;
};

export type User = {
  
}