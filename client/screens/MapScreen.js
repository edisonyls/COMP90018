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
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MenuContainer from "../components/MenuContainer";
import ItemCardContainer from "../components/ItemCardContainer";


  
  const MapScreen = () => {
    const [type, setType] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState(["hi"]);
  
    const navigation = useNavigation();
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    });
  
    return (
      <SafeAreaView className="flex-1 bg-white relative">
        {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
        ) : (
            <ScrollView>
                <View className="flex-row items-between justify-between px-8">
                    <View>
                        <Text className="text-[40px] text-[#0B646B] font-bold">
                            {"Map"}
                        </Text>
                        <Text className="text-[20px] text-[#527283]">userName</Text>
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
                    key={"all"}
                    title="All"
                    imageSrc={require("../assets/dog.png")}
                    type={type}
                    setType={setType}
                    />
                    <MenuContainer
                    key={"missing"}
                    title="Missing"
                    imageSrc={require("../assets/dog.png")}
                    type={type}
                    setType={setType}
                    />
                    <MenuContainer
                    key={"found"}
                    title="Found"
                    imageSrc={require("../assets/dog.png")}
                    type={type}
                    setType={setType}
                    />
                </View>
                
           </ScrollView>
        )}
      </SafeAreaView>
    );
};

  
export default MapScreen;
