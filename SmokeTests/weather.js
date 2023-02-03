import { check } from 'k6';
import http from "k6/http";
import bearerToken from "../bearer-token.js";

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',
  
    thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
  };

export default () => {
  const res = http.get(`${getBaseUrl()}/weather/`, {
    headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json"
    }
  });

  check(res, {
    'is status 200': (r) => r.status === 200,
  });
};