export interface BasicProfile {
  id: string;
  picture: string;
  name: string;
  family_name: string;
  given_name: string;
  link: string;
  locale: string;
}

export interface EmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}
