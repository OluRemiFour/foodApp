// import React, { useEffect, useState } from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { Entypo } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import Loading from "../component/Loading";

// export default function RecipeDetailsScreen(props) {
//   const item = props.route.params;
//   const navigation = useNavigation();
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getMealData(item.idMeal);
//   });

//   const getMealData = async (id) => {
//     try {
//       const cacheKey = `meals-${category}`;
//       const cachedMeals = await AsyncStorage.getItem(cacheKey);

//       if (cachedMeals) {
//         setMeals(JSON.parse(cachedMeals));
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(
//         `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
//       );
//       if (response && response.data) {
//         setMeals(response.data.meals);
//         await AsyncStorage.setItem(
//           cacheKey,
//           JSON.stringify(response.data.meals)
//         );
//       }
//     } catch (err) {
//       if (err.response && err.response.status === 429) {
//         console.log("Too many requests. Please try again later.");
//         Alert.alert("Error", "Too many requests. Please try again later.");
//       } else {
//         console.log(err.message);
//       }
//     }
//   };
//   return (
//     <ScrollView
//       style={{ flex: 1 }}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ paddingBottom: 30 }}
//     >
//       <View style={{ flexDirection: "row", justifyContent: "center" }}>
//         <Image
//           source={{ uri: item.strMealThumb }}
//           style={{
//             width: "100%",
//             height: 80,
//             borderRadius: 53,
//             borderBottomRightRadius: 40,
//             borderBottomLeftRadius: 40,
//             marginTop: 4,
//           }}
//         />
//       </View>
//       <View
//         style={{
//           width: "full",
//           position: "absolute",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingTop: 14,
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             padding: 2,
//             borderRadius: 200,
//             marginLeft: 5,
//             backgroundColor: "white",
//           }}
//           onPress={() => navigation.goBack()}
//         >
//           <View>
//             {" "}
//             <Entypo name="chevron-left" size={24} color="black" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{
//             padding: 2,
//             borderRadius: 200,
//             marginRight: 5,
//             backgroundColor: "gray",
//           }}
//         >
//           <View>
//             {" "}
//             <Feather name="heart" size={24} color="black" />{" "}
//           </View>
//         </TouchableOpacity>
//       </View>

//       {/* Render if loading */}
//       <View>
//         {loading ? (
//           <View>
//             <Loading />
//           </View>
//         ) : (
//           <View style={{ padding: 6, justifyContent: "space-between" }}>
//             <View style={{ paddingVertical: 4 }}>
//             </View>
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loading from "../component/Loading";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
// import YoutubeIframe from "react-native-youtube-iframe";

export default function RecipeDetailsScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleActive, setToggleActive] = useState(false);

  useEffect(() => {
    getMealData(item.idMeal);
    // IngredientsIndexes();
  }, [item.idMeal]);

  const getMealData = async (id) => {
    try {
      const cacheKey = `meals-${id}`;
      const cachedMeals = await AsyncStorage.getItem(cacheKey);

      if (cachedMeals) {
        setMeals(JSON.parse(cachedMeals));
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
        await AsyncStorage.setItem(
          cacheKey,
          JSON.stringify(response.data.meals)
        );
        setLoading(false);
      }
    } catch (err) {
      if (err.response && err.response.status === 429) {
        console.log("Too many requests. Please try again later.");
        Alert.alert("Error", "Too many requests. Please try again later.");
      } else {
        console.log(err.message);
      }
      setLoading(false);
    }
  };

  const IngredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 10; i++) {
      if (meal["strIngredient" + 1]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  return (
    <>
      <StatusBar barStyle={"light"} />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={{ uri: item.strMealThumb }}
            style={{
              width: "100%",
              height: 400,
              borderRadius: 3,
              borderBottomRightRadius: 40,
              borderBottomLeftRadius: 40,
              marginLeft: 4,
              marginRight: 4,
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            position: "absolute",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 14,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 12,
              borderRadius: 200,
              marginLeft: 8,
              backgroundColor: "white",
              marginTop: 20,
              marginRight: 20,
            }}
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-left" size={24} color="#ff8c00" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 200,
              marginTop: 20,
              marginRight: 20,
              backgroundColor: "gray",
            }}
          >
            <Feather
              name="heart"
              size={24}
              color="black"
              style={[toggleActive ? styles.active : styles.notActive]}
              onPress={() => setToggleActive((active) => !active)}
            />
          </TouchableOpacity>
        </View>

        {/* Render if loading */}
        <View>
          {loading ? (
            <Loading style={{ marginTop: 44 }} size={55} />
          ) : (
            <View
              style={{ padding: 6, margin: 6, justifyContent: "space-between" }}
            >
              {meals.map((meal, index) => (
                <View key={index} style={{ paddingVertical: 4 }}>
                  <Text style={{ fontSize: 35, fontWeight: "bold", flex: 1 }}>
                    {meal.strMeal}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "gray",
                      fontWeight: "semibold",
                    }}
                  >
                    {meal.strArea}
                  </Text>
                  {/* </View>
            ))} */}

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 25,
                      justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 200,
                        backgroundColor: "#ff8c00",
                        padding: 10,
                      }}
                    >
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 200,
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "white",
                        }}
                      >
                        <FontAwesome6 name="clock" size={24} color="black" />
                      </View>
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 30,
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          35
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          Mins
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderRadius: 200,
                        backgroundColor: "#ff8c00",
                        padding: 10,
                      }}
                    >
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 200,
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "white",
                        }}
                      >
                        <AntDesign
                          name="addusergroup"
                          size={24}
                          color="black"
                        />
                      </View>
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 30,
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          03
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          Servings
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        borderRadius: 200,
                        backgroundColor: "#ff8c00",
                        padding: 10,
                      }}
                    >
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 200,
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "white",
                        }}
                      >
                        <FontAwesome6 name="gripfire" size={24} color="black" />
                      </View>

                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 23,
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          103
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          Calc
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderRadius: 200,
                        backgroundColor: "#ff8c00",
                        padding: 10,
                      }}
                    >
                      <View
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 200,
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "white",
                        }}
                      >
                        <Octicons name="stack" size={24} color="black" />
                      </View>

                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 23,
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        ></Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: "gray",
                            fontWeight: "bold",
                          }}
                        >
                          Easy
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* Ingredients */}
                  <View>
                    <Text
                      style={{
                        padding: 4,
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "gray",
                        flex: 1,
                        marginTop: 8,
                      }}
                    >
                      Ingredients
                    </Text>
                    <View style={{ padding: 4, marginLeft: 4 }}>
                      {IngredientsIndexes(meal).map((i) => {
                        return (
                          <View
                            key={i}
                            style={{
                              flexDirection: "row",
                              paddingHorizontal: 4,
                              margin: 5,
                            }}
                          >
                            <View
                              style={{
                                height: 20,
                                width: 20,
                                backgroundColor: "#ff8c00",
                                borderRadius: 200,
                                padding: 2,
                                marginRight: 3,
                              }}
                            />
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                paddingHorizontal: 4,
                              }}
                            >
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  paddingRight: 2,
                                  fontSize: 15,
                                }}
                              >
                                {meal["strMeasure" + i]}
                              </Text>
                              <Text
                                style={{
                                  paddingRight: 2,
                                  fontSize: 15,
                                }}
                              >
                                {meal["strIngredient" + i]}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </View>

                  {/* Instructions */}
                  <View>
                    <Text
                      style={{
                        padding: 4,
                        fontSize: 25,
                        fontWeight: "bold",
                        color: "gray",
                        flex: 1,
                        marginTop: 8,
                      }}
                    >
                      Instructions
                    </Text>

                    <Text style={{ fontSize: 15, color: "gray" }}>
                      {meal?.strInstructions}
                    </Text>
                  </View>

                  {/* Youtube video */}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: "red",
    color: "white",
    padding: 12,
    borderRadius: 200,
  },

  notActive: {
    backgroundColor: "gray",
    color: "black",
    padding: 12,
    borderRadius: 200,
  },
});
