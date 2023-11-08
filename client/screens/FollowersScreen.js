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
  ImageBackground,
} from 'react-native';
import MenuContainer from "../components/MenuContainer"; 
import { useUserContext } from "../context/userContext";
import axios from 'axios';

const ListItem = ({ name, imageProfile, isClicked, onPress, nickname }) => {
    
    const textColor = isClicked ? 'black' : '#9747FF';
  
    return (
      <TouchableOpacity onPress={() => onPress(nickname)} style={styles.listItem}>
        <Image source={{ uri: imageProfile }} style={styles.profilePic} />
        <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            {/* <Text style={[styles.action, { color: textColor }]}>{action}</Text> */}
        </View>
      </TouchableOpacity>
    );
};

const FollowersScreen = ({ navigation }) => {

  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [activities, setActivities] = useState([]);

  const [activeTab, setActiveTab] = useState('follower');
  const [clickedItems, setClickedItems] = useState({});

  const handleItemClick = (index) => {
    console.log(nickname);
    setClickedItems(prevState => ({
      ...prevState,
      [index]: true
    }));
  };

  console.log('ActiveTab:', activeTab); 


  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const userId = user.id;
      const response = await axios.get('http://192.168.1.111:8080/post/listFollower', {
        params: { userId },
      });
  
      console.log(response.data);
      const messages = response.data.data;
  
      if (messages) {
        const transformedData = messages.map((item, index) => ({
          name: item.nickname,
          imageProfile: item.profile,
        }));
  
        setActivities(transformedData);
      } else {
        console.log('No data found.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
      

  useEffect(() => {
    fetchActivities();

    const interval = setInterval(() => {
      fetchActivities();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab.toLowerCase() === 'following') {
      navigation.navigate('Followings');
    } else if (activeTab.toLowerCase() === 'activities') {
        navigation.navigate('Activities');
    }
  }, [activeTab, navigation]);


  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
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

          <ScrollView 
            horizontal={true} 
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}>
            <View className="flex-row item-center justify-center px-8 mt-4">
            <MenuContainer
                    title="Activities"
                    type={activeTab.toLowerCase()}
                    setType={setActiveTab}
                    setSelectedMenu={setActiveTab}    
                />
                <MenuContainer
                    title="Follower"
                    type={activeTab.toLowerCase()}
                    setType={setActiveTab}
                    setSelectedMenu={setActiveTab}
                />
                <MenuContainer
                    title="Following"
                    type={activeTab.toLowerCase()}
                    setType={setActiveTab}
                    setSelectedMenu={setActiveTab}
                />
            </View>
          </ScrollView>

          <ScrollView style={styles.scrollView}>
    
            {activeTab === 'follower' && activities.map((activity, index) => (
            <ListItem 
                key={index} 
                name={activity.name} 
                //action={activity.action} 
                imageProfile={activity.imageProfile}  
                isClicked={clickedItems[index]}
                onPress={(nickname) => handleItemClick(index, nickname)}
                nickname={activity.name}
            />
            ))}
          </ScrollView> 
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  tabWrapper: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#9747FF',
  },
  tabText: {
    color: '#333',
    fontWeight: '600',
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  listItem: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    marginRight: 20,
    textAlign: 'right',
  },
});

export default FollowersScreen;
