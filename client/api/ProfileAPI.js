import { BASE_URL } from "../utils/utils";
import axios from "axios";

export const uploadHead = async (usrId, formData) => {
  try {
    const res = await axios.post(
      `http://${BASE_URL}:8080/user/uploadProfile?usrId=${usrId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log("while uploadHead request -> \n" + err);
  }
};

export const uploadBackground = async (usrId, formData) => {
  try {
    const res = await axios.post(
      `http://${BASE_URL}:8080/user/uploadBgImg?usrId=${usrId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log("while uploadBackground request -> \n" + err);
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

export const logoutAction = async (usrId) => {
  try {
    const response = await axios.post(
      "http://" + BASE_URL + ":8080/login/logout",
      {},
      {
        params: { usrId },
      }
    );
    const res = response.data;
    console.log(res);
    return res.success;
  } catch (error) {
    console.log("Logout error with " + error);
  }
};

export const getAllPostsPerUser = async (userId) => {
  try {
    const response = await axios.get(
      `http://${BASE_URL}:8080/post/getAllPostsPerUser`,
      {
        params: {
          userId: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts per user", error);
    return { success: false, data: [] };
  }
};
