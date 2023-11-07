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

const ListItem = ({ name, action, imagePost, imageProfile, isClicked, onPress }) => {
    
    const textColor = isClicked ? 'black' : '#9747FF';
  
    return (
      <TouchableOpacity onPress={onPress} style={styles.listItem}>
        <Image source={{ uri: imageProfile }} style={styles.profilePic} />
        <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={[styles.action, { color: textColor }]}>{action}</Text>
        </View>
        <Image source={{ uri: imagePost }} style={styles.postPic} />
      </TouchableOpacity>
    );
};

const ActivitiesScreen = () => {

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
      const response = await fetch(`http://192.168.1.101:8080//message/listMessages?userId=${encodeURIComponent(userId)}`);
      const data = await response.json();
      setActivities(data);
      
    } catch (error) {
      console.error('Failed to fetch activities', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=> {
    fetchActivities();
  },[]);

  // const activities = [
  //   { name: 'Momon', action: 'Liked your Post', imageProfile: 'https://www.w3schools.com/images/w3schools_green.jpg',
  //     imagePost: 'https://www.w3schools.com/images/w3schools_green.jpg' },
  //   { name: 'Momon', action: 'Commented your Post', imageProfile: 'https://www.w3schools.com/images/w3schools_green.jpg',
  //     imagePost: 'https://www.w3schools.com/images/w3schools_green.jpg' },
  // ];


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

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row item-center justify-center px-8 mt-4">
            <MenuContainer
                    title="Activities"
                    type={activeTab.toLowerCase()}
                    setType={setActiveTab}
                    setSelectedMenu={setActiveTab} 
                />
                <MenuContainer
                    title="Chat"
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
                imagePost={activity.imagePost}
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
  postPic: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginLeft: 'auto',
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  action: {
    color: '#A0C4C7',
  },
});

export default ActivitiesScreen;
