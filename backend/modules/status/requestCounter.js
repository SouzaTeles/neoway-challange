let requestCount = 0;

export const incrementRequestCount = () => {
  requestCount++;
  return requestCount;
};

export const getRequestCount = () => requestCount;
