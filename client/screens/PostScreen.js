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
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { queryUserInfo , getCommentList, addComment} from '../api/auth';
const screenWidth = Dimensions.get("window").width;
const API_KEY = 'AIzaSyCLOAAZfuZhFLjzSZcqDdpSIgaKxZ6nyng';
import axios from 'axios';
import { useUserContext } from "../context/userContext";

const PostScreen = ({ route, navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { post } = route.params; // 从路由参数中获取post对象
  const [address, setAddress] = useState('');
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');

  const { user } = useUserContext();

  const fetchComments = async () => {
    try {
      const commentListData = await getCommentList(post.id);
      if (commentListData && commentListData.success) {
        // 直接设置评论数据
        setComments(commentListData.data || []);
      } else {
        console.error('获取评论失败:', commentListData.msg);
      }
    } catch (error) {
      console.error('获取评论和用户信息失败:', error);
    }
  };
  
  const handleSendComment = async () => {
    // 构造评论数据
    const commentData = {
      commentUserId: user.id,
      content: commentContent,
      //createTime: new Date().toISOString(), // 使用当前时间作为评论时间
      postId: post.id,
      posterId: post.posterId,
      
      // replies:[
      //   {
      //     "commentUserId": "",
      //     "content": "",
      //     "createTime": "",
      //     "fatherCommentId": "",
      //     "id": "",
      //     "likeCounts": 0,
      //     "postId": "",
      //     "posterId": "",
      //     "replies": []
      //   }
      // ] 
    };

    // 调用接口函数发送评论
    const response = await addComment(commentData);
    if (response.success) {
      // 评论成功后的操作，比如清空输入框，重新获取评论列表等
      setCommentContent('');
      fetchComments();
    } else {
      // 处理错误情况
      console.error('评论失败:', response.message);
    }
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
    const apiKey = API_KEY; // Ensure this is kept secret and not exposed
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.results && response.data.results.length > 0) {
        // Typically, the formatted address you want is in the first result
        const address = response.data.results[0].formatted_address;
        setAddress(address);
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      console.error('Error fetching the address:', error);
      setAddress('Unable to get address');
    }
};
  useEffect(() => {
    // 当PostScreen加载时调用queryUserInfo来获取用户信息
    const fetchUserInfo = async () => {
      try {
        const userInfoData = await queryUserInfo(post.posterId);
        if (userInfoData && userInfoData.success) {
          setUserInfo(userInfoData.data);
        } else {
          console.error('Failed to fetch user info:', userInfoData.msg);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [post.posterId]);

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"} 
    style={{flex: 1}}
  >
    <SafeAreaView className="flex-1 bg-white">
      
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
                // 确保有用户信息可供传递
                if (userInfo) {
                  navigation.navigate('Others', { otherUser: userInfo });
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
                {/* <Text style={styles.infoLabel}>Title:</Text> */}
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
                    <MaterialIcons name="location-pin" size={24} color="black" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                <Text style={styles.commentUserName}>{comment.userName} : </Text>
              </>
            
            <Text style={styles.commentText}>{comment.content}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.commentText}>Ohh! No comment</Text>
      )}
    </View>
      </View>
      </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Write comment..."
            value={commentContent}
            onChangeText={setCommentContent}
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    //backgroundColor: '#A5A6F6',
    borderRadius: 10,
    padding: 5,
    fontSize: 15,
  },
  infoValue: {
    // backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'grey',
    // borderRadius: 10,
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
    //  backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'grey',
    // borderRadius: 10,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    alignSelf: 'center', // 这会确保Text组件自身在其父组件中居中
  },
  detailsContainer: {
    padding: 10,
    // borderTopRightRadius: 25,
    borderRadius: 25,
    backgroundColor: '#EDE7F6',
    marginTop: -10,
    marginRight:7,
    marginLeft:7,
  },
  commentsLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },

  commentUserName: {
    fontWeight: 'bold', // 字体加粗
    color: '#333', // 深色字体
    fontSize: 14, // 字体大小
    marginBottom: 2, // 与下方内容的间隔
  },
  commentText: {
    color: '#666', // 中等深色字体
    fontSize: 15, // 字体大小稍小
    lineHeight: 18, // 行高，增加可读性
    marginTop: 2, // 与上方用户名的间隔
    marginBottom: 2, // 与下方内容的间隔
    backgroundColor: '#eee', // 背景色
    borderRadius: 5, // 圆角效果
    padding: 8, // 内边距
  },
  commentContainer: {
    backgroundColor: '#fff', // 评论部分的白色背景
    padding: 10, // 评论容器内部的填充
    marginVertical: 5, // 垂直方向的外边距
    borderBottomWidth: 1, // 底部边框宽度，用于分隔评论
    borderBottomColor: '#e1e1e1', // 底部边框颜色，浅灰色
    flexDirection: 'row', // 水平排列用户头像和评论内容
    alignItems: 'center', // 在交叉轴上居中对齐子元素
  },
  commentUserImage: {
    width: 30, // 评论用户头像的宽度
    height: 30, // 评论用户头像的高度
    borderRadius: 15, // 头像的圆角半径
    marginRight: 10, // 头像右边的外边距
  },
  locationText: {
    color: '#333', // 位置文本的颜色
    fontSize: 14, // 位置文本的字体大小
    marginLeft: 8, // 位置文本左边的外边距
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#9747FF',
    borderRadius: 20,
    justifyContent: 'center', // 按钮内部的文本垂直居中
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PostScreen;
