import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

export default function Loading(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50",
      }}
    >
      <ActivityIndicator {...props} />
    </View>
  );
}
