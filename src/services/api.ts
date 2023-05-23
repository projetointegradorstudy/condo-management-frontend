import axios from 'axios';

export const api = axios.create({ baseURL: `${process.env.REACT_APP_BASE_URL}` });

export interface authProps {
  username: string;
  password: string;
}

export async function auth(authprops: authProps) {
  return api.post('/auth', authprops);
}
