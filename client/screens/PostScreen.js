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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { queryUserInfo } from '../api/auth';
const screenWidth = Dimensions.get("window").width;
const API_KEY = 'AIzaSyCLOAAZfuZhFLjzSZcqDdpSIgaKxZ6nyng';
import axios from 'axios';

const PostScreen = ({ route, navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const { post } = route.params; // 从路由参数中获取post对象
  const [address, setAddress] = useState('');
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
          </View>
          {/* <TouchableOpacity className="p-2 bg-[#007bff] rounded-lg">
            <Text className="text-white">Follow</Text>
          </TouchableOpacity> */}
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
      
            {post.latitude && post.longitude && (
                <View style={styles.infoRow}>
                    <MaterialIcons name="location-pin" size={24} color="black" />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text style={styles.locationText}>{address}</Text>
                    </ScrollView>
                </View>
            )}
    
            {post.title && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Title:</Text>
                <Text style={styles.infoValue}>{post.title}</Text>
            </View>
            )}
    
            {post.petCategory && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Pet's Category:</Text>
                <Text style={styles.infoValue}>{post.petCategory}</Text>
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
    
            {post.contactNum && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Contact Number:</Text>
                <Text style={styles.infoValue}>{post.contactNum}</Text>
            </View>
            )}
    
            {post.rewards && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rewards:</Text>
                <Text style={styles.infoValue}>{post.rewards}</Text>
            </View>
            )}
    
            {post.description && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Description:</Text>
                <Text style={styles.infoValue}>{post.description}</Text>
            </View>
            )}
    
            {post.content && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Content:</Text>
                <Text style={styles.infoValue}>{post.content}</Text>
            </View>
            )}
    
            {post.tag && (
            <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tag:</Text>
                <Text style={styles.infoValue}>{post.tag}</Text>
            </View>
            )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoLabel: {
    backgroundColor: '#A5A6F6',
    borderRadius: 10,
    padding: 5,
  },
  infoValue: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 5,
    marginLeft: 5,
  },
});

export default PostScreen;
