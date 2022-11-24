export const GetAccessToken = () => {
  const authKey = localStorage.getItem("authKey");
  const parseAuthKey = JSON.parse(authKey);
  return parseAuthKey.credentials.access_token;
};

export const authorizedHeaders = () => {
  const token = GetAccessToken();
  return {
    "Content-Type": "application/json",
    Accepts: "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const genericHeaders = {
  "Content-Type": "application/json",
  Accepts: "application/json",
}
