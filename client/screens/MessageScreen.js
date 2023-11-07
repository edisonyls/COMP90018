/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
} from 'react-native';
 
 
function MessageList(props) {
    const items = props.items;
    const receiver = props.receiver;
    const listItems = items.map((item, index) => {
            return (
                <View key={index} style={[styles.chatMessage, receiver == item.name ? styles.chatReceiver : null]}>
                    <Text style={styles.chatNameReceiver}>{item.name}</Text>
                    <Text style={styles.messageText}>{item.message}</Text>
                </View>
            );
        },
    );
    return (
        <>{listItems}</>
    );
}
 
// const URL_SERVER = 'http://192.168.199.133:8080';
 
const NotificationScreen = () => {
    const [items, setItems] = useState([
        {name: 'boy', message: '今天晚上吃点啥？'},
        {name: 'girl', message: '我们去吃牛排吧！'},
        {name: 'boy', message: '好的，我去给小红打气。'},
        {name: 'boy', message: '你们在门口等我吧。'},
        {name: 'girl', message: '你人呢？我到门口啦'},
    ]);
    const [receiver, setReceiver] = useState('girl');
    const [value, onChangeText] = React.useState('');
 
    let timer;  //计时器
    useEffect(() => {
        //loadMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /**
     * 加载聊天信息
     */

    const defaultMessages = [
        {name: 'boy', message: '今天晚上吃点啥？'},
        {name: 'girl', message: '我们去吃牛排吧！'},
        {name: 'boy', message: '好的，我去给小红打气。'},
        {name: 'boy', message: '你们在门口等我吧。'},
        {name: 'girl', message: '你人呢？我到门口啦'},
    ];
    
    
    const loadMessage = () => {
        // timer = setInterval(function () {
        //     //执行代码
        //     console.log('-----------获取数据------------');
        //     fetch(URL_SERVER + '/list')
        //         .then(function (response) {
        //             return response.json();
        //         })
        //         .then(function (result) {
        //             if (result.code == 0) {
        //                 setItems(result.data);
        //             }
        //         });
        // }, 1000);
        setItems(defaultMessages);
    };
 
    const postMessage = () => {
        // fetch(URL_SERVER+'/send', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: 'roomId=1&message=' + value + '&name=' + receiver,
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response.text();
        //         }
        //         throw new Error('Network response was not ok.');
        //     })
        //     .then(responseText => {
        //         console.log(responseText);
        //     })
        //     .catch(e => {
        //         console.log(e.toString());
        //     });
    };
 
    //发送消息
    const sendMessage = (message) => {
        // let newItems = JSON.parse(JSON.stringify(items));
        // newItems.push({name: receiver, message: message});
        // setItems(newItems);
        let newItems = [...items, { name: receiver, message: message }];
        setItems(newItems);
    };
    const sendDo = () => {
        sendMessage(value);
        //postMessage();
        onChangeText('');
    };
 
    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView style={styles.mainContent}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={text => setReceiver(text)}
                    placeholder={'聊天人姓名'}
                    value={receiver}
                    onSubmitEditing={sendDo}
                />
                <ScrollView style={styles.chatBody}>
                    <View style={{height: 15}}></View>
                    <MessageList items={items} receiver={receiver}/>
                </ScrollView>
 
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={text => onChangeText(text)}
                    placeholder={'开始聊天吧'}
                    value={value}
                    onSubmitEditing={sendDo}
                />
                <Button
                    onPress={sendDo}
                    title="发送"
                    color="#841584"
                />
            </SafeAreaView>
        </>
    );
};
 
const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: '#ededed',
    },
    chatBody: {
        flex: 1,
        padding: 10,
    },
    chatMessage: {
        position: 'relative',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 25,
    },
    chatReceiver: {
        marginLeft: 'auto',
        backgroundColor: '#95ec69',
    },
    messageText: {
        fontSize: 16,
    },
    chatName: {
        fontSize: 12,
        position: 'absolute',
        top: -15,
        fontWeight: 'bold',
    },
    chatNameReceiver: {
        fontSize: 12,
        position: 'absolute',
        top: -18,
        fontWeight: 'bold',
        marginLeft: 'auto',
    },
    chatTimeStamp: {
        marginLeft: 10,
        fontSize: 12,
    },
});
 
export default NotificationScreen;