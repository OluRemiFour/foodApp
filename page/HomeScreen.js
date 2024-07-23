import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => navigation.navigate("Home"), 2000);
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Logo */}
      <View style={styles.firstView}>
        <Image
          source={require("../assets/good.png")}
          style={{ width: 300, height: 300 }}
        />
      </View>

      {/* title and punchline */}
      <View>
        <Text style={styles.textView}>Foody</Text>
      </View>

      <View>
        <Text style={styles.textSmall}>Food is always right</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ff8c00",
    alignItems: "center",
    padding: 5,
  },
  firstView: {
    borderRadius: 200,
    // backgroundColor: "",
  },

  textView: {
    color: "#ffff",
    fontSize: 60,
    fontWeight: "bold",
    alignItems: "center",
  },

  textSmall: {
    paddingVertical: 2,
    fontSize: 20,
    color: "#ffff",
    alignItems: "center",
  },
});
