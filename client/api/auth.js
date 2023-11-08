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
    return false;
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
    return false;
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
    return false;
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

export const getAllPosts = async (postType) => {
  try {
    const response = await axios.get(
      `http://${BASE_URL}:8080/post/getAllPosts`,
      {
        params: { postType }
      }
    );
    return response.data;
  } catch (error) {
    console.error("在getAllPosts请求时出错", error);
    return false;
  }
};


export const getAllPostsPerUser = async (userId) => {
  try {
    const response = await axios.get(`http://${BASE_URL}:8080/post/getAllPostsPerUser`, {
      params: {
        userId: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching posts per user", error);
    return { success: false, data: [] };
  }
};

export const queryUserInfo = async (userId) => {
  try {
    const response = await axios.get(`http://${BASE_URL}:8080/user/queryUserInfo`, {
      params: {
        userId: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info", error);
    return { success: false, data: {} };
  }
};

export const getCommentList = async (postId) => {
  try {
    const response = await axios.get(
      `http://${BASE_URL}:8080/comment/GetCommentList`, 
      {
        params: {
          postId: postId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("获取评论列表时出错", error);
    return { success: false, data: [] };
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await axios.post(
      `http://${BASE_URL}:8080/comment/AddComment`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("添加评论时出错", error);
    return { success: false, message: error.message };
  }
};