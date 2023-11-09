import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View, TextInput, Button, TouchableOpacity, Image} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from '../utils/utils';
import { queryUserInfo } from '../api/auth';
import axios from 'axios';

const MessageScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const [contactName, setContactName] = useState('Contact Name');
  const [inputText, setInputText] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);

  const { currentUser, otherUser } = route.params;


   const contactId = otherUser.id;
   const userId = currentUser.id;
   const contactUserName = otherUser.nickname;
   const currentUserName = currentUser.nickname;
   const contactProfile = otherUser.profile;

   const contactData = {
            contactId: contactId,
            userId: userId,
        };

    const messageData = {
        senderId: userId,
        receiverId: contactId,
        content: inputText,
    };

  //const { user } = useUserContext();
  //const userIdParam = user.id;
  const userIdParam = userId;
  const userName = currentUserName;


  const handleScroll = (event) => { 
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // 20是一个阈值，可以根据需要调整
    setIsAtBottom(isCloseToBottom);
  };

  const sendMessage = async () => {
    try {
        const response = await axios.post(`http://${BASE_URL}:8080/message/sendMessage`, messageData);
        // const response = await axios.post('http://192.168.1.111:8080/message/sendMessage', messageData);
        if (response.data.success) {
            setInputText('');
        } else {
            console.error('Failed to send message: ', response.data.msg);
        }
    } catch (error) {
        console.error('Error sending message: ', error);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://${BASE_URL}:8080/message/listChat`, contactData);
        // const response = await axios.post('http://192.168.1.111:8080/message/listChat', contactData);
        if (response.data.success) {
          if (response.data !== null) {
          
            setContactName(contactUserName);
            const messageData = response.data.data.map(item => {
              
              return {
                  senderName: item.senderNickname,
                  message: item.content.Detail,
                  isCurrentUser: item.senderId === userIdParam,
                  senderProfile: item.profile
              }
            });
            setMessages(messageData);
        } else {
          setMessages([]);
        }} else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Error fetching messages: ', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);
  
    const scrollViewRef = useRef();
    
    useEffect(() => {
        if (isAtBottom) {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages, isAtBottom]);



  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
      <TouchableOpacity
              onPress={() => navigation.goBack()}
              
              className="mr-4"
              style={{ marginLeft: 20, marginBottom:20, marginTop:30 }}
            >
              <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToUserInfo(contactId)}>
        <Image
          source={{ uri: contactProfile }}
          style={styles.contactProfileImage}
        />
      </TouchableOpacity>

      <Text style={styles.headerText}>{ contactUserName }</Text>
      </View>
      <ScrollView 
        onScroll={handleScroll}
        scrollEventThrottle={400}
        style={styles.scrollView}
        ref={scrollViewRef}>
        {messages.map((message, index) => (
          <View key={index} style={[
            styles.messageBox,
            message.isCurrentUser ? styles.rightAlign : styles.leftAlign
          ]}>
            <Text style={styles.message}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    scrollView: {
      margin: 0,
    },
    messageBox: {
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      backgroundColor: '#FFFFFF',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
    message: {
      color: '#333333',
      fontSize: 16,
    },
    leftAlign: {
      alignSelf: 'flex-start',
      marginRight: '25%',
    },
    rightAlign: {
      alignSelf: 'flex-end',
      marginLeft: '25%',
      backgroundColor: '#CCB2fd',
    },
    contactProfileImage: {
      width: 50,
      height: 50, 
      borderRadius: 30,
      marginRight: 15,
      marginTop: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      alignItems: 'flex-start',
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#333333',
      marginTop: 25,
    },
    backButton: {
      
    },
    sendButton: {
      padding: 10, // 适当的按钮填充
      margin: 10, // 与其他元素的间隔
      backgroundColor: '#CCB2fd', // 按钮使用中性色
      borderRadius: 20, // 圆角边框
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonText: {
      color: '#FFFFFF', // 文字使用亮色以便于阅读
    }, 
    profileImage: {
      width: 40, // Set the width of the image
      height: 40, // Set the height of the image
      borderRadius: 20, // Make it round
      marginRight: 10, // Add a right margin
    },
    input: {
      flex: 1,
      marginRight: 10, // Corrected typo here from 'merginRight' to 'marginRight'
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 20,
      paddingHorizontal: 15,
      paddingVertical: 10,
      height: 50,
      fontSize: 18,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: 'white',
    },    
    footerContainer: {
      flexDirection: 'row', // Align children in a row
      paddingHorizontal: 10, // Horizontal padding
      paddingVertical: 5, // Vertical padding
      alignItems: 'center', // Align items in the center verticallys
      backgroundColor: 'white',
    },
  });
  

export default MessageScreen;