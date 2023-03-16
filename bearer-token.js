import { post } from "axios";
import { BASE_URL, USERNAME, PASSWORD } from "config.js";

let bearerToken;

async function authenticate() {
  try {
    const res = await post(`${BASE_URL}/authenticate`, {
      username: USERNAME,
      password: PASSWORD
    });

    bearerToken = res.data.access_token;
    console.log("Authentication successful. Token:", bearerToken);
  } catch (error) {
    console.error("Error during authentication:", error);
  }
}

authenticate();

export default {
  bearerToken
};