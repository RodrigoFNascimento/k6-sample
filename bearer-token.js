import { post } from "axios";

let bearerToken;

async function authenticate() {
  try {
    const res = await post(getBaseUrl() + "/authenticate", {
      username: "test",
      password: "test"
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