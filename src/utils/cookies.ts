const setCookies = (name: string, value: string) => {
  document.cookie = name + "=" + value;
};
const removeCookies = (name: string) => {
  document.cookie = name + "=" + "";
};
const getCookie = (name: string) => {
  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (cookieValue) {
    return cookieValue.split("=")[1];
  }
  return null;
};

export { setCookies, removeCookies, getCookie };
