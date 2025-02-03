export interface User {
  id: string;
  birthDate: string;
  gender: string;
  os: string;
  browser: string;
  screenWidth: number;
  screenHeight: number;
}

export interface UserEmail {
  userId: string;
  email: string;
}
