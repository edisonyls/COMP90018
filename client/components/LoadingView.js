import { View, Text, ActivityIndicator, Modal } from "react-native";
import { Colors } from "./styles";

import React from "react";

const { brand } = Colors;

const LoadingView = ({ loading }) => {
  return (
    <>
      <Modal
        transparent={true}
        animationType="none"
        visible={loading}
        onRequestClose={() => {
          console.log("close modal");
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00000040",
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <ActivityIndicator size="large" color={brand} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LoadingView;
