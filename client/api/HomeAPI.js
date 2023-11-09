import axios from "axios";
import { BASE_URL } from "../utils/utils";

export const fetchAllPosts = async () => {
  const postType = "All";
  try {
    const response = await axios.get(
      "http://" + BASE_URL + ":8080/post/getAllPosts",
      { params: { postType: postType } }
    );
    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching the posts", error);
  }
};
