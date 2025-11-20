import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
  Method,
} from "axios";

// -----------------------------
// Types
// -----------------------------
export interface IRequestConfig {
  method: Method;
  url: string; // Full URL passed directly
  data?: any;
  headers?: Record<string, string>;
  responseType?: ResponseType;
}

// -----------------------------
// Prepare Headers
// -----------------------------
const prepareRequestHeaders = (headers?: Record<string, string>) => {
  return {
    "Content-Type": "application/json",
    ...(headers || {}),
  };
};

// -----------------------------
// Prepare Axios Config
// -----------------------------
export const prepareAxiosConfiguration = (
  request: IRequestConfig
): AxiosRequestConfig => {
  const { method, responseType = "json", data, headers, url } = request;

  const requestHeaders = prepareRequestHeaders(headers);

  let requestConfig: AxiosRequestConfig = {
    method,
    url,
    responseType,
    headers: requestHeaders,
  };

  if (method === "GET" && data && Object.keys(data).length > 0) {
    requestConfig = {
      ...requestConfig,
      params: data,
    };
  }

  if (
    method !== "GET" &&
    data &&
    (data instanceof FormData || Object.keys(data).length > 0)
  ) {
    requestConfig = {
      ...requestConfig,
      data,
    };
  }

  return requestConfig;
};

// -----------------------------
// Error Handler
// -----------------------------
const throwHttpError = (error: any) => {
  const message =
    error?.response?.data?.message || error?.message || "Something went wrong";

  throw new Error(message);
};

// -----------------------------
// Success Response
// -----------------------------
const successResponse = (response: AxiosResponse) => {
  return response.data;
};

// -----------------------------
// Axios Interceptors
// -----------------------------
axios.interceptors.request.use(
  async (config) => {
    // TODO: Add authorization token here (e.g., read from AsyncStorage)
    return config;
  },
  (error) => {
    // TODO: Handle request errors globally if needed
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO:
    // 1. Detect token expiry (error.response.status === 401)
    // 2. Refresh access token if available
    // 3. Logout user if refresh token fails
    return Promise.reject(error);
  }
);

// -----------------------------
// HTTP Request Wrapper
// -----------------------------
export const httpRequest = async (request: IRequestConfig) => {
  const axiosConfig = prepareAxiosConfiguration(request);

  return axios
    .request(axiosConfig)
    .then(successResponse)
    .catch((error) => {
      throwHttpError(error);
    });
};

export default httpRequest;
