import axios from "axios";

export const verifyEmail = async (code, email, password, username) => {
  try {
    const response = await axios.post("http://localhost:8080/verify/signup", {
      code: code,
      email: email,
      password: password,
      username: username,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const sendVerifyRequest = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/verify/sendMail",
      {},
      {
        params: {
          email: email,
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
