export const GetAccessToken = () => {
  const authKey = localStorage.getItem("authKey");
  const parseAuthKey = JSON.parse(authKey);
  return parseAuthKey.credentials.access_token;
};
