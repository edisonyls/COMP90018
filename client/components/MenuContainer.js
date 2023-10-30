import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType, setSelectedMenu }) => {
  const handlePress = () => {
    setType(title.toLowerCase());
    setSelectedMenu(title.toLowerCase());
  };

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 110, // 设置按钮的宽度
        paddingVertical: 10, // 通过增加垂直内边距来增加按钮的高度
        paddingVertical: 10, // 按钮的垂直内边距
        paddingHorizontal: 20, // 按钮的水平内边距
        borderRadius: 10, // 按钮的边框半径（圆角）
        backgroundColor: type === title.toLowerCase() ? '#9747FF' : '#FFFFFF', // 如果选中，则为淡紫色；否则为白色
        shadowColor: "#000", // 下面四行是用于阴影效果的
        marginRight:10,
        marginBottom:10,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Android 平台的阴影
      }}
      onPress={handlePress}     
      activeOpacity={0.7} // 按下按钮时的不透明度
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* <Image style={{ width: 80, height: 80, resizeMode: 'contain' }} source={imageSrc} /> */}
        <Text style={{ color: '#AFAFAF', fontSize: 16, fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>

    // <TouchableOpacity
    //   className="items-center justify-center space-y-2"
    //   onPress={handlePress}
    // >
    //   <View
    //     className={`w-20 h-20 p-2 shadow-sm rounded-full items-center justify-center m-1 ${
    //       type === title.toLowerCase() ? "bg-gray-300" : "bg-white"
    //     }`}
    //   >
    //     <Image className="w-full h-full object-contain" source={imageSrc} />
    //     <Text className="text-[#00BCC9] text-[16px] font-semibold">
    //       {title}
    //     </Text>
    //   </View>
    // </TouchableOpacity>
  );
};

export default MenuContainer;
