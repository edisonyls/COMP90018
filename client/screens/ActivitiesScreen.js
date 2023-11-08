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

const ListItem = ({ name, action, imageProfile, isClicked, onPress }) => {
    
    const textColor = isClicked ? 'black' : '#9747FF';
  
    return (
      <TouchableOpacity onPress={onPress} style={styles.listItem}>
        <Image source={{ uri: imageProfile }} style={styles.profilePic} />
        <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={[styles.action, { color: textColor }]}>{action}</Text>
        </View>
      </TouchableOpacity>
    );
};

const ActivitiesScreen = ({ navigation }) => {

  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const [activities, setActivities] = useState([]);

  const [activeTab, setActiveTab] = useState('activities');
  const [clickedItems, setClickedItems] = useState({});

  const handleItemClick = (index) => {
    setClickedItems(prevState => ({
      ...prevState,
      [index]: true
    }));
  };

  console.log('ActiveTab:', activeTab); 


  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const userIdParam = new URLSearchParams();
      userIdParam.append('userId', user.id);
  
      const response = await axios({
        method: 'post',
        url: 'http://192.168.1.111:8080/message/listNotifications',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: userIdParam.toString(),
      });
  
      console.log(response.data);
      const messages = response.data.data;
  
      if (messages) {
        const transformedData = messages.map((item, index) => ({
          name: item.senderNickname,
          action: item.content.behavior,
          imageProfile: item.senderProfile,
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
    if (activeTab.toLowerCase() === 'follower') {
      navigation.navigate('Followers');
    } else if (activeTab.toLowerCase() === 'following') {
      navigation.navigate('Followings');
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
    
            {activeTab === 'activities' && activities.map((activity, index) => (
            <ListItem 
                key={index} 
                name={activity.name} 
                action={activity.action} 
                imageProfile={activity.imageProfile}  
                isClicked={clickedItems[index]}
                onPress={() => handleItemClick(index)}
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
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
    marginLeft: 60,
  },
  action: {
    color: '#A0C4C7',
    marginLeft: 60,
    fontSize: 16,
  },
});

export default ActivitiesScreen;