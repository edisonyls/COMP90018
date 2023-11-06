import axios from "axios";

const BASE_URL = "192.168.1.107";

export const verifyEmail = async (code, email, password, username) => {
  try {
    const response = await axios.post(
      "http://" + BASE_URL + ":8080/login/register",
      {
        code: code,
        email: email,
        password: password,
        username: username,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendVerifyRequest = async (email) => {
  try {
    const response = await axios.post(
      "http://" + BASE_URL + ":8080/login/sendMail",
      {},
      {
        params: {
          email: email,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginRequest = async (email, password) => {
  try {
    const res = await axios.post(
      "http://" + BASE_URL + ":8080/login/login",
      {},
      {
        params: {
          email: email,
          password: password,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log("while sending login request -> \n" + err);
  }
};


export const uploadBackground = async (usrId, formData) => {
  try {
    const res = await axios.post(
      `http://${BASE_URL}:8080/user/uploadBgImg?usrId=${usrId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return res.data;
  } catch (err) {
    console.log("while uploadBackground request -> \n" + err);
  }
};

export const uploadHead = async (usrId, formData) => {
  try {
    const res = await axios.post(
      `http://${BASE_URL}:8080/user/uploadProfile?usrId=${usrId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return res.data;
  } catch (err) {
    console.log("while uploadHead request -> \n" + err);
  }
};

export const changeUserInfo = async (userInfo) => {
  try {
    const response = await axios.post(
      "http://" + BASE_URL + ":8080/user/changeUserInfo",
      userInfo
    );
    return response.data;
  } catch (error) {
    console.error("在changeUserInfo请求时出错", error);
  }
};
