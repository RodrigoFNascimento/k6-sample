import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from "../config.js";

export const options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default () => {
    const res = http.get(`${BASE_URL}/weather/`, {
      headers: {
          "Content-Type": "application/json"
      }
    });
  
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
};