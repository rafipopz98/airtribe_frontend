export const DEFAULT_TOKEN = "token";
export const USER_DATA = "userData";

export const getUserData = (userData = USER_DATA) => {
  const localData =
    typeof window != "undefined" ? window.localStorage.getItem(userData) : "";
  let res = {};
  try {
    res = JSON.parse(localData);
  } catch (err) {
    res = localData;
  }
  return res ?? {};
};

export const storeLocal = (data = "", tokenName = DEFAULT_TOKEN) => {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  window.localStorage.setItem(tokenName, data);
};

export const getAuthHeader = () => {
  return {
    Authorization: getLocal(),
    "Content-Type": "application/json",
  };
};

export const getLocal = (tokenName = DEFAULT_TOKEN) => {
  const localData =
    typeof window != "undefined" ? window.localStorage.getItem(tokenName) : "";
  let res;
  try {
    res = JSON.parse(localData);
  } catch (err) {
    res = localData;
  }
  return res;
};

export const sessionDestroy = () => {
  try {
    removeLocal();
    removeLocal(USER_DATA);
    window.location.href = "/login";
  } catch (e) {
    console.log(e);
  }
};
