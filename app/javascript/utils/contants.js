const baseUrl = "http://127.0.0.1:3000/";

export const loginURL = baseUrl + "login";

export const signupURL = baseUrl + "signup";

export const secretsURL = baseUrl + "secrets";

export const verifyAuthURL = baseUrl + "verify";

export const logoutURL = baseUrl + "logout";

export const warehouseURL = baseUrl + "api/warehouse";

export const shipperURL = baseUrl + "api/shipper";

export const productURL = baseUrl + "api/product";

export const warehouseFeeURL = baseUrl + "api/warehouse_fee";

export const navigatiionsURL = baseUrl + "api/client_page";

export const productDetailURL = (id) => baseUrl + `api/product_detail?id=${id}`;

export const saveStockInoutUrl = baseUrl + "api/stock_inout";

//unit_price urls

export const feeUrl = baseUrl + "api/warehouse_fee";
export const postReceivedPaymentUrl = baseUrl + "api/received_payment";

export const getReceivedPaymentUrl = baseUrl + "api/received_payment";
//unit_price urls

export const postReceivedPaymentURL = baseUrl + "api/received_payment";

export const getReceivedPaymentURL = baseUrl + "api/received_payment";
//unit_price urls

export const httpErrors = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  default: "Internal Server Error",
};
