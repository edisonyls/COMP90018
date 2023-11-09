import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View, TextInput, Button } from 'react-native';
import { useUserContext } from "../context/userContext";
import axios from 'axios';

const MessageScreen = ({ route, natigation }) => {
  const [messages, setMessages] = useState([]);
  const [contactName, setContactName] = useState('Contact Name');
  const [inputText, setInputText] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);

  const { messageInfoData } = route.params

  console.log(messageInfoData);


   const contactId = '2311080WS9DACK8H';
   const userId = '231106BK61PX28ZC';

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
  const userIdParam = '231106BK61PX28ZC';
  const userName = 'a';

  const handleScroll = (event) => { 
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // 20是一个阈值，可以根据需要调整
    setIsAtBottom(isCloseToBottom);
  };

  const sendMessage = async () => {
    try {
        const response = await axios.post('http://192.168.1.111:8080/message/sendMessage', messageData);
        if (response.data.success) {
            setInputText('');
        } else {
            console.error('Failed to send message: ', response.data.msg);
        }
    } catch (error) {
        console.error('Error sending message: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://192.168.1.111:8080/message/listChat', contactData);
        if (response.data.success) {
          const name = response.data.data.find(item => item.senderNickname !== userName)?.senderNickname;
          console.log(name);
          setContactName(name);
          const messageData = response.data.data.map(item => {
            
            return {
                senderName: item.senderNickname,
                message: item.content.Detail,
                isCurrentUser: item.senderId === userIdParam
            }
          });

          setMessages(messageData);
        } else {
          console.error('Failed to fetch messages: ', response.data.msg);
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
      <Text style={styles.headerText}>{ contactName }</Text>
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
            {/* <Text style={styles.sender}>{message.senderName || 'Unknown'}</Text> */}
            <Text style={styles.message}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        onChangeText={setInputText}
        value={inputText}
        placeholder="Type a message..."
      />
      <Button
        title="Send"
        onPress={sendMessage}
      />
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
    headerContainer: {
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
    },
    
    sendButton: {
      padding: 10, // 适当的按钮填充
      margin: 10, // 与其他元素的间隔
      backgroundColor: '#9E9E9E', // 按钮使用中性色
      borderRadius: 20, // 圆角边框
    },
    sendButtonText: {
      color: '#FFFFFF', // 文字使用亮色以便于阅读
    }, 
    input: {
        marginHorizontal: 20, // 水平边距
        marginTop: 10, // 上边距
        marginBottom: 20, // 下边距
        paddingHorizontal: 15, // 左右内边距
        paddingVertical: 10, // 上下内边距
        height: 50, // 高度
        fontSize: 18, // 字体大小
        borderColor: 'gray', // 边框颜色
        borderWidth: 1, // 边框宽度
        borderRadius: 10, // 边框圆角
        backgroundColor: 'white', // 背景颜色
      },
  });
  

export default MessageScreen;