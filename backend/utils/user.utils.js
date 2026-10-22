import axios from "axios";

export const handleError = (error, customErrorMsg) => {
  console.log("error", error.response);
  const errorResponse = error.response?.data;
  const errorStatusCode =
    errorResponse.statusCode || error.response.status || 500;
  const errorMsg = errorResponse.message || customErrorMsg;
  return { status: errorStatusCode, message: errorMsg };
};

export async function billings(
  appId,
  accountId,
  tenantId,
  email,
  password,
  ipaasBaseUrl,
  accountName,
) {
  try {
    const url = "https://monday-billing.konnectifyapp.co/tenant/mapping";
    const body = {
      appId,
      accountId,
      tenantId,
      email,
      password,
      ipaasBaseUrl,
      accountName,
    };
    const billingResponse = await axios.post(url, body);
    console.log("billing responsee", billingResponse);
  } catch (error) {
    console.log("Error in setting billing", error);
    throw error;
  }
}
