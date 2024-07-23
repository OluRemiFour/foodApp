import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Categories from "../component/Categories";
import Recepies from "../component/Recepies";

export default Home = () => {
  const [activeCategory, setActiveCategories] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [filteredItem, setFilteredItem] = useState();

  useEffect(() => {
    getCategories();
    getRecipe();
  }, []);
  const getCategories = async () => {
    try {
      const response =
        await axios.get(`https://themealdb.com/api/json/v1/1/categories.php
  `);
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  // const getRecipe = async (category = "Beef") => {
  // const getRecipe = async (category = "Seafood") => {
  //   try {
  //     const response =
  //       await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}

  // `);
  //     if (response && response.data) {
  //       setMeals(response.data.meals);
  //       // console.log(response);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const getRecipe = async (category = "Beef") => {
    try {
      const cacheKey = `meals-${category}`;
      const cachedMeals = await AsyncStorage.getItem(cacheKey);

      if (cachedMeals) {
        setMeals(JSON.parse(cachedMeals));
        return;
      }

      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
        await AsyncStorage.setItem(
          cacheKey,
          JSON.stringify(response.data.meals)
        );
      }
    } catch (err) {
      if (err.response && err.response.status === 429) {
        console.log("Too many requests. Please try again later.");
        Alert.alert("Error", "Too many requests. Please try again later.");
      } else {
        console.log(err.message);
        Alert.alert(
          "Error",
          "Failed to fetch recipes. Please try again later."
        );
      }
    }
  };

  // function handleInput(e) {
  //   const value = e.target.value;
  //   setInputValue(value);

  //   const searchItems = meals?.filter(
  //     (item) => item.strMeal?.toLowerCase()?.includes(value?.toLowerCase())
  //   );
  //   setFilteredItem(searchItems);
  //   console.log(filteredItem);
  // }
  function handleInput(value) {
    setInputValue(value);
    const searchItems = meals?.filter((item) =>
      item.strMeal?.toLowerCase().includes(value?.toLowerCase())
    );
    setFilteredItem(searchItems);
  }

  const handleChangeCategory = (category) => {
    getRecipe(category);
    setActiveCategories(category);
    setMeals([]);
  };
  return (
    <View
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
      style={{
        flex: 1,
        paddingTop: "10%",
        paddingLeft: "3%",
        paddingRight: "3%",
      }}
    >
      <StatusBar style="dark" />
      <View style={styles.avatar}>
        <Image
          source={require("../assets/avatar.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text>
          <Entypo name="bell" size={30} color="gray" />{" "}
        </Text>
      </View>

      <View style={{ marginVertical: 5, padding: 5 }}>
        <Text style={{ color: "gray" }}>Hello, I'm Jonas</Text>
        <Text style={{ fontSize: 35, paddingTop: 15, fontWeight: "bold" }}>
          Make your own Food,
        </Text>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>
          stay at <Text style={{ color: "orange" }}> Home </Text>
        </Text>
      </View>

      <View
        style={{
          margin: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 200,
          padding: 5,
          backgroundColor: "#cecece",
        }}
      >
        <TextInput
          placeholder="search any recipe"
          style={{
            padding: 5,
            letterSpacing: 1,
            fontSize: 15,
            width: "80%",
            borderRadius: 10,
          }}
          onChangeText={handleInput}
          value={inputValue}
        />
        <View>
          <Entypo
            name="magnifying-glass"
            size={24}
            color="black"
            style={{ backgroundColor: "white", borderRadius: 200, padding: 6 }}
          />
        </View>
      </View>

      <View>
        {categories?.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        )}
      </View>

      {/* Recepies */}
      <View>
        <Recepies
          filteredItem={filteredItem}
          meals={meals}
          categories={categories}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    margin: 10,
  },

  avatar: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
