export const isValidEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

<<<<<<< HEAD
export const BASE_URL = "192.168.1.111";
=======
export const BASE_URL = "192.168.1.106";
>>>>>>> 5890fb3c5260bd0d234d3cd67f43e8b7dcceda23
