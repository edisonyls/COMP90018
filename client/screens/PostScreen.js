import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { queryUserInfo, getCommentList, addComment } from "../api/auth";
const screenWidth = Dimensions.get("window").width;
const API_KEY = "AIzaSyCLOAAZfuZhFLjzSZcqDdpSIgaKxZ6nyng";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import { deletePost } from "../api/ProfileAPI";
import LoadingView from "../components/LoadingView";

const PostScreen = ({ route, navigation }) => {
  const [userInfo, setUserInfo] = useState(null);

  const [loading, setLoading] = useState(false);
  const { post, userId } = route.params; 
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const { user } = useUserContext();

  const fetchComments = async () => {
    try {
      const commentListData = await getCommentList(post.id);
      if (commentListData && commentListData.success) {
        setComments(commentListData.data || []);
      } else {
        console.error("fail:", commentListData.msg);
      }
    } catch (error) {
      console.error("fail:", error);
    }
  };

  const handleSendComment = async () => {
    const commentData = {
      commentUserId: user.id,
      content: commentContent,
      postId: post.id,
      posterId: post.posterId,
    };

   
    const response = await addComment(commentData);
    if (response.success) {

      
      setCommentContent("");
      fetchComments();
    } else {
      
      console.error("fail:", response.message);

    }
  };

  const handleDeletePost = async () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          setLoading(true);
          const res = await deletePost(post.id);
          setLoading(false);
          if (res.success) {
            navigation.goBack();
          } else {
            Alert.alert("Oops!", res.msg);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchComments();
  }, [post.id]);

  useEffect(() => {
    if (post.latitude && post.longitude) {
      getGeocode(post.latitude, post.longitude);
    }
  }, [post.latitude, post.longitude]);

  const getGeocode = async (latitude, longitude) => {
    const apiKey = API_KEY; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
       
        const address = response.data.results[0].formatted_address;
        setAddress(address);
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Error fetching the address:", error);
      setAddress("Unable to get address");
    }
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoData = await queryUserInfo(post.posterId);
        if (userInfoData && userInfoData.success) {
          setUserInfo(userInfoData.data);
        } else {
          console.error("Failed to fetch user info:", userInfoData.msg);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [post.posterId]);

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {loading ? (
        <LoadingView />
      ) : (
        <SafeAreaView className="flex-1 bg-white relative">
          <>
            <ScrollView>
              <View className="flex-1 bg-white">
                <View className="flex-row justify-between items-center p-2.5 mr-2">
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      className="mr-4"
                    >
                      <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        
                        if (userInfo) {
                          if (userInfo.id === user.id) {
                            
                            navigation.navigate("Profile");
                          } else {
                            
                            navigation.navigate("Others", {
                              otherUser: userInfo,
                            });
                          }
                        }
                      }}
                      className="flex-row items-center"
                    >
                      {userInfo && (
                        <>
                          <Image
                            source={{ uri: userInfo.profile }}
                            className="w-10 h-10 rounded-full mr-2 border"
                            style={{ borderColor: "#D3D3D3" }}
                          />
                          <Text className="font-bold">{userInfo.nickname}</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                  {userId && (
                    <TouchableOpacity
                      onPress={handleDeletePost}
                      style={{
                        position: "absolute",
                        right: 10,
                        zIndex: 1,
                      }}
                    >
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity>
                  <View className="mt-2 items-center">
                    <Image
                      source={{ uri: post.picture }} // Replace with your actual image source
                      style={{
                        width: screenWidth - 20,
                        height: screenWidth - 20,
                        resizeMode: "cover",
                      }}
                    />
                  </View>
                </TouchableOpacity>


                {post.title && (
                  <View>
                    
                    <Text style={styles.titleText}>{post.title}</Text>
                  </View>
                )}
                <View style={styles.detailsContainer}>
                  {post.petCategory && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Pet's Category:</Text>
                      <Text style={styles.infoValue}>{post.petCategory}</Text>
                    </View>
                  )}
                  {post.content && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Content:</Text>
                      <Text style={styles.infoValue}>{post.content}</Text>
                    </View>
                  )}
                  {post.description && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Description:</Text>
                      <Text style={styles.infoValue}>{post.description}</Text>
                    </View>
                  )}

                  {post.petBreed && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Pet's Breed:</Text>
                      <Text style={styles.infoValue}>{post.petBreed}</Text>
                    </View>
                  )}

                  {post.petName && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Pet's Name:</Text>
                      <Text style={styles.infoValue}>{post.petName}</Text>
                    </View>
                  )}

                  {post.rewards && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Rewards:</Text>
                      <Text style={styles.infoValue}>{post.rewards}</Text>
                    </View>
                  )}
                  {post.contactNum && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Contact Number:</Text>
                      <Text style={styles.infoValue}>{post.contactNum}</Text>
                    </View>
                  )}
                  {post.tag && (
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>Tag:</Text>
                      <Text style={styles.infoValue}>{post.tag}</Text>
                    </View>
                  )}
                </View>

                {post.latitude && post.longitude && (
                  <View style={styles.infoRow}>
                    <MaterialIcons
                      name="location-pin"
                      size={24}
                      color="black"
                    />
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <Text style={styles.locationText}>{address}</Text>
                    </ScrollView>
                  </View>
                )}

                <View style={{ marginTop: 10 }}>
                  <Text style={styles.infoLabel}>Comment:</Text>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <View key={comment.id} style={styles.commentContainer}>
                        <>
                          <Image
                            source={{ uri: comment.userProfile }}
                            style={styles.commentUserImage}
                          />
                          <Text style={styles.commentUserName}>
                            {comment.userName} :{" "}
                          </Text>
                        </>

                        <Text style={styles.commentText}>
                          {comment.content}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.commentText}>Ohh! No comment</Text>
                  )}
                </View>
              </View>
            </ScrollView>
          </>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Write comment..."
              value={commentContent}
              onChangeText={setCommentContent}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendComment}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoLabel: {
    fontWeight: "bold",
   
    borderRadius: 10,
    padding: 5,
    fontSize: 15,
  },
  infoValue: {
  
    flex: 1,
    padding: 5,
    marginLeft: 5,
    fontSize: 15,
  },
  postImage: {
    width: screenWidth - 20,
    height: screenWidth - 20,
    resizeMode: "cover",
    borderRadius: 15,
  },
  titleText: {
   
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  detailsContainer: {
    padding: 10,
 
    borderRadius: 25,
    backgroundColor: "#EDE7F6",
    marginTop: -10,
    marginRight: 7,
    marginLeft: 7,
  },
  commentsLabel: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },

  commentUserName: {
    fontWeight: "bold",
    color: "#333", 
    fontSize: 14, 
    marginBottom: 2, 
  },
  commentText: {
    color: "#666", 
    fontSize: 15, 
    lineHeight: 18,
    marginTop: 2, 
    marginBottom: 2, 
    backgroundColor: "#eee",
    borderRadius: 5, 
    padding: 8, 
  },
  commentContainer: {
    backgroundColor: "#fff", 
    padding: 10, 
    marginVertical: 5, 
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1", 
    flexDirection: "row", 
    alignItems: "center", 
  },
  commentUserImage: {
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    marginRight: 10, 
  },
  locationText: {
    color: "#333", 
    fontSize: 14, 
    marginLeft: 8, 
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "#9747FF",
    borderRadius: 20,
    justifyContent: "center", 
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PostScreen;
