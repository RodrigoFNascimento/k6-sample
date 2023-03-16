import { check } from 'k6';
import http from 'k6/http';
import { BASE_URL, USERNAME, PASSWORD } from "/config.js";

export function authenticate() {
  const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
    username: USERNAME,
    password: PASSWORD,
  });

  const authToken = loginRes.json('access');
  check(authToken, { 'logged in successfully': () => authToken !== '' });

  return authToken;
}