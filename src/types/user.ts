export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
}

export interface CreateAccountDTO {
  username: string;
  bio?: string;
  path: string;
}

export interface UpdateAccountDTO {
  username: string;
  bio?: string;
  path: string;
}
