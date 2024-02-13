const baseUrl = "http://127.0.0.1:3000/";

export const loginURL = baseUrl + "login";

export const signupURL = baseUrl + "signup";

export const secretsURL = baseUrl + "secrets";

export const verifyAuthURL = baseUrl + "verify";

export const logoutURL = baseUrl + "logout";

// export const receivedPaymentURL = baseURL + ;

//unit_price urls

export const shipperURL = baseUrl + "api/shipper";

export const httpErrors = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  default: "Internal Server Error",
};
