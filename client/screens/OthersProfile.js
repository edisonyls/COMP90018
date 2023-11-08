 // Import necessary components and hooks from React Native and other libraries
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useUserContext } from "../context/userContext";
import { getAllPostsPerUser } from '../api/auth';
import ItemCardContainer from "../components/ItemCardContainer";
import { AntDesign } from "@expo/vector-icons";


const OthersProfile = ({ route, navigation}) => {

    const [isLoading, setIsLoading] = useState(false);


    const { otherUser } = route.params

   
    const [mainData, setMainData] = useState([]);
    
  
    const { user } = useUserContext();

    const [isFollowing, setIsFollowing] = useState(false); // State to manage follow button
    
    const postTypeToBadge = {
      0: "Missing",
      1: "Found",
      2: "General",
    };

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    },[navigation]);

    useEffect(() => {

        const fetchData = async () => {
          setIsLoading(true);
          try {
            const data = await getAllPostsPerUser(otherUser.id);
            if (data.success) {
              setMainData(data.data);
            } else {
              console.error('Failed to fetch posts: ', data.msg);
            }
          } catch (error) {
            console.error('Error fetching posts: ', error);
          } finally {
            setIsLoading(false);
          }
        };
      
        fetchData();
      }, [otherUser.id]);

    // Function to handle follow button press
    const handleFollowPress = () => {
      setIsFollowing(!isFollowing);
      // Add functionality to follow the user
    };

    // Function to handle message button press
    const handleMessagePress = () => {
      // Add functionality to send a message to the user
    };


    
    
      
    
    return (
      <SafeAreaView className="flex-1 bg-white relative">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              
              className="mr-4"
              style={{ marginLeft: 20, marginBottom:20, marginTop:20 }}
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
          <View style={styles.imageContainer}>

       
          

            <Image
              // key={backgroundUri} 
              style={styles.backgroundImage}
              source={{ uri: otherUser.bgImg}}
            />
          
                
               
                <View style={styles.profileContainer}>
                    
                    <Image
                        // key={headUri}
                        style={styles.headImage}
                        source={{ uri: otherUser.profile }}
                        
                    />
                    <Text style={styles.profileName}>{otherUser.nickname}</Text> 
                </View>

            </View>

            {/* Follow and Message buttons */}
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center' }}>
                <TouchableOpacity
                  style={buttonStyle(isFollowing)}
                  onPress={handleFollowPress}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: isFollowing ? 'white' : 'black' }}>
                    {isFollowing ? "Following" : "Follow"}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={buttonStyle(false)}
                  onPress={handleMessagePress}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: 'black' }}>Message</Text>
                </TouchableOpacity>
            </View>


            {/*Display all the post cards if available*/}
            <View className="px-4 mt-4 flex-row items-center justify-evenly flex-wrap">
                {mainData?.length > 0 ? (
                   mainData.map((post) => (
                    <ItemCardContainer
                      key={post.id}
                      imageSrc={{ uri: post.picture }} // 使用网络图片地址
                      badge={postTypeToBadge[post.postType] || "Unknown"} // 使用对象映射来确定badge文本
                      petName={post.petName}
                      petKind={post.petCategory}
                      location={post.location}
                      title={post.title}
                    />
                  ))
                  ) : (
                    <>
                      <View className="w-full h-[400px] items-center space-y-8 justify-center">
                        <Image
                          source={require("../assets/logo.jpg")}
                          className="w-32 h-32 object-cover"
                        />
                        <Text className="text-2xl text-[#428288] font-semibold">
                          oops... No Data Found
                        </Text>
                      </View>
                    </>
                  )}
              </View>
        
          </ScrollView>
        )}
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    profileContainer: {
      position: 'relative', // 同上
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 10,
    },
    menuSection: {
      flexDirection: 'row', // 使 menuContainer 内的元素水平排列
      justifyContent: 'space-evenly', // 平均分配子元素之间的空间
      marginTop: 20, // 为顶部增加一些空间
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      
    },
    backgroundImage: {
      width: '100%', // 宽度为100%，以填满容器
      height: 198, // 这可以根据您的背景图像进行调整
    },
    headImage: {
      width: 83,
      height: 83,
      position: 'absolute', // 设置为绝对定位
      bottom: 40, // 这意味着图片的底部将位于容器边界以下的位置，实现重叠效果
      borderRadius: 83 / 2,
    },
    profileName: {
      fontSize: 20,
      fontWeight: '700',
      color: 'black',
      textAlign: 'center',
      //marginVertical: 10, // 增加垂直方向的空间
    },
    sectionContainer: {
      paddingHorizontal: 16,  // 左右边距
      paddingTop: 16,  // 顶部边距
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: 'black',
      marginTop:20,
      textAlign: 'left',  // 靠左对齐
      marginBottom: 10,  // 和图片之间的距离
      marginLeft:10,
    },
    sectionImage: {
      width: 350,  // 图片宽度为容器宽度
      height: 45,  // 高度根据宽度和比例自动调整
      
      marginBottom: 40,  // 图片之间的距离
      marginLeft:20,
      resizeMode: 'cover',  // 如果图片宽度和高度与容器不符，确保图片完整覆盖
    },
    editIcon: {
      position: 'absolute', // 使用绝对定位
      top: 10, // 距离容器顶部10单位
      right: 10, // 距离容器右侧10单位
    },

  });

  // Define styles for the buttons
  const buttonStyle = (isActive) => ({
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isActive ? "#9747FF" : "#DDD",
  });

  
  
 export default OthersProfile;