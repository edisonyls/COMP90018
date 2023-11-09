import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MenuContainer from "../components/MenuContainer";
import { useUserContext } from "../context/userContext";
import { queryUserInfo } from '../api/auth';
import axios from 'axios';

const ListItem = ({ name, imageProfile, onPress, senderId, behavior, type }) => {
  return (
    <TouchableOpacity onPress={() => onPress(senderId)} style={styles.listItem}>
      <Image source={{ uri: imageProfile }} style={styles.profilePic} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        {type === 'activities' && behavior ? (
          <Text style={styles.behaviorText}>{behavior}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const FollowersScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [type, setType] = useState("activities");
  const [selectedMenu, setSelectedMenu] = useState("activities");
  // const navigateToActivities = () => setActiveTab('activities');
  // const navigateToFollowers = () => setActiveTab('follower');
  // const navigateToFollowings = () => setActiveTab('following');

  const fetchContent = async () => {
    setIsLoading(true);
    const endpoints = {
      activities: 'http://192.168.1.111:8080/message/listNotifications',
      follower: 'http://192.168.1.111:8080/post/listFollower',
      following: 'http://192.168.1.111:8080/post/listFollowing',
    };

    const currentEndpoint = endpoints[type];

    if (!currentEndpoint) {
      console.error(`Invalid active tab: ${type}`);
      setIsLoading(false);
      return;
    }
  
    try {
      let response;

      // Check if the active tab is 'activities', if so, make a POST request
      if (type === 'activities') {
        const postData = new URLSearchParams();
        postData.append('userId', user.id);
      
        response = await axios.post(currentEndpoint, postData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      } else {
        // For 'follower' and 'following', make a GET request
        const queryParams = new URLSearchParams({ userId: user.id }).toString();
        response = await axios.get(`${currentEndpoint}?${queryParams}`);
      }

      if (response.data.success) {
        let data;
        if (type === 'activities') {
          // Special handling for 'activities' data
          data = response.data.data.map(item => ({
            id: item.id,
            name: item.senderNickname,
            imageProfile: item.senderProfile,
            senderId: item.senderId,
            behavior: item.content.behavior,
          }));
        } else {
          data = response.data.data.map(item => ({
            name: item.nickname,
            imageProfile: item.profile,
            senderId: item.id,
          }));
        }
        setFollowers(data);
      } else {
        console.log(`No data found for ${type}.`);
      }
    } catch (error) {
      console.error(`Error fetching data for ${type}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [type, user.id]);


  const navigateToUserInfo = async (senderId) => {
    try {
      const userInfoData = await queryUserInfo(senderId);
      if (userInfoData.success) {
        navigation.navigate('Others', { otherUser: userInfoData.data });
      } else {
        console.error('Failed to fetch user info:', userInfoData.msg);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0B646B" />
      </View>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View className="flex-row items-between justify-between px-8">
              <View>
              <Text className="text-[40px] text-[#0B646B] font-bold">
                  {"Notification"}
              </Text>
              <Text className="text-[20px] text-[#527283]">
                  {user.nickname}
              </Text>
              </View>
              <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
              <Image
                  className="w-full h-full rounded-md object-cover"
                  source={require("./../assets/logo.jpg")}
              />
              </View>
          </View>

          <View className="flex-row item-center justify-center px-8 mt-4">
            <MenuContainer
              title="Activities"
              //onPress={navigateToActivities}
              isActive={type === 'activities'}
              type={type}
              setType={setType}
              setSelectedMenu={setSelectedMenu}
            />
            <MenuContainer
              title="Follower"
              isActive={type === 'follower'}
              type={type}
              setType={setType}
              setSelectedMenu={setSelectedMenu}
            />
            <MenuContainer
              title="Following"
              isActive={type === 'following'}
              type={type}
              setType={setType}
              setSelectedMenu={setSelectedMenu}
            />
          </View>
          {followers.map((item, index) => (
            <ListItem
              key={index}
              name={item.name}
              imageProfile={item.imageProfile}
              onPress={navigateToUserInfo}
              senderId={item.senderId}
              behavior={item.behavior} // Add this line
              type={type} // And this line
            />
          ))}

        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingBottom: 60,
  },
  behaviorText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4, // Adjust as needed
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 20,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FollowersScreen;
