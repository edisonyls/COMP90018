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
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ContactUsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  return (
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
            <Text style={styles.headerTitle}>Contact Us</Text>
            <View />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.label}>Mobile</Text>
            <Text style={styles.infoText}>+61 xxxxxxxxxx</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.infoText}>our_mail@gmail.com</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              style={styles.contactImage}
              source={require("../assets/ContactUs.jpg")} // Replace with your image path
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
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  contactImage: {
    width: "100%", // Adjust as needed
    height: 200, // Adjust as needed
    resizeMode: "contain",
  },
});
export default ContactUsScreen;
