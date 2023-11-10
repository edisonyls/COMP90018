export const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  return password.length >= 6 && password.length <= 18;
};

export const API_KEY = "AIzaSyCLOAAZfuZhFLjzSZcqDdpSIgaKxZ6nyng";
export const BASE_URL = "10.12.235.34";