// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from "react-native";
// import React from "react";
// import Animated, { FadeInDown } from "react-native-reanimated";

// export default function Categories({
//   categories,
//   activeCategory,
//   setActiveCategory,
// }) {
//   return (
//     <Animated.View entering={FadeInDown.duration(500).springify()}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={{ paddingHorizontal: 3 }}
//         contentContainerStyle={{ paddingHorizontal: 5 }}
//       >
//         {categories.map((cat, index) => {
//           let isActive = cat.strCategory === activeCategory;
//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() => setActiveCategory(cat.strCategory)}
//               style={{ alignItems: "center", display: "flex", padding: 1 }}
//             >
//               <View
//                 style={[
//                   styles.view,
//                   isActive ? styles.active : styles.notActive,
//                 ]}
//               >
//                 <Image
//                   source={{ uri: cat.strCategoryThumb }}
//                   style={{
//                     width: 100,
//                     height: 100,
//                     borderRadius: 200,
//                     // marginTop: 5,
//                     paddingHorizontal: 5,
//                   }}
//                 />
//               </View>
//               <Text style={{ color: "gray" }}>{cat.strCategory}</Text>
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   view: {
//     borderRadius: 200,
//     padding: 1,
//     marginVertical: 8,
//   },
//   active: {
//     backgroundColor: "#ff8c00",
//   },

//   notActive: {
//     // backgroundColor: "gray",
//   },
// });

import React, { useState, useEffect } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  // Animated,
} from "react-native";
import axios from "axios";

const App = ({ handleChangeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        if (response && response.data) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    getCategories();
  }, []);

  return (
    // <SafeAreaView style={styles.container}>
    <Animated.View entering={FadeInDown.delay(200).duration(1000)}>
      <ScrollView horizontal>
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={{ alignItems: "center", display: "flex", padding: 1 }}
            >
              <View
                style={[
                  styles.view,
                  // styles.active,
                  isActive ? styles.active : styles.notActive,
                ]}
              >
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 200,
                    // marginTop: 5,
                    margin: 2,
                  }}
                />
              </View>
              <Text style={{ color: "gray" }}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view: {
    borderRadius: 200,
    padding: 1,
    marginVertical: 8,
  },
  active: {
    backgroundColor: "#ff8c00",
  },
  notActive: {
    backgroundColor: "gray",
  },
});

export default App;
