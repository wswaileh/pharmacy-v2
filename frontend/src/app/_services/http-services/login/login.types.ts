export interface LoginResponse {
  token: string;
  type: string;
  id: string;
  name: string;
  username: string;
  role: string;
  expires: number;
}
