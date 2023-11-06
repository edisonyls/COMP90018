import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, {useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from '../navigators/ProfileContext';
import { Switch } from "react-native";

const NotificationScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLikePostEnabled, setIsLikePostEnabled] = useState(false);
    const [isNewMessageEnabled, setIsNewMessageEnabled] = useState(false);
    const navigation = useNavigation();

    const toggleLikePostSwitch = () => setIsLikePostEnabled(previousState => !previousState);
    const toggleNewMessageSwitch = () => setIsNewMessageEnabled(previousState => !previousState);

    return(
        <SafeAreaView className="flex-1 bg-white relative">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0B646B" />
          </View>
        ) : (   
            
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                 <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="leftcircleo" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notification</Text>
                    <View /> 
                </View>


                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Like Post</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isLikePostEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleLikePostSwitch}
                        value={isLikePostEnabled}
                    />
                </View>

                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>New Message</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isNewMessageEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleNewMessageSwitch}
                        value={isNewMessageEnabled}
                    />
                </View>
            </ScrollView>
        )}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop:30,
  },
  switchLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NotificationScreen;

