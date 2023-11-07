import axios from "axios";


export const BASE_URL = "192.168.1.106";

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





// export const uploadBackground = async (usrId, file) => {
//   try {
//     const res = await axios.post(
//       "http://" + BASE_URL + ":8080/user/uploadBgImg",
//       {},
//       {
//         params: {
//           usrId: usrId,
//           file: file,
//         },
//       }
//     );
//     return res.data;
//   } catch (err) {
//     console.log("while uploadBackground request -> \n" + err);
//   }
// };

// export const uploadHead = async (usrId, file) => {
//   try {
//     const res = await axios.post(
//       "http://" + BASE_URL + ":8080/user/uploadProfile",
//       {},
//       {
//         params: {
//           usrId: usrId,
//           file: file,
//         },
//       }
//     );
//     return res.data;
//   } catch (err) {
//     console.log("while uploadBackground request -> \n" + err);
//   }
// };
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
