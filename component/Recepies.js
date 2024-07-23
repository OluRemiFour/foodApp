// import MasonryList from "@react-native-seoul/masonry-list";
// import { Image, Pressable, ScrollView, Text, View } from "react-native";

// export default function Recepies({ categories, meals }) {
//   return (
//     <ScrollView style={{ margin: 15 }}>
//       <Text
//         style={{
//           fontSize: 30,
//           fontWeight: "bold",
//           color: "gray",
//           marginVertical: 5,
//         }}
//       >
//         Recepies
//       </Text>

//       <ScrollView>
//         {/* {categories.length === 0 || meals.length === 0 ? null : ( */}
//         <View>
//           <MasonryList
//             data={meals}
//             keyExtractor={(item) => item.idMeal}
//             numColumns={2}
//             showsVerticalScrollIndicator={false}
//             renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
//             //   refreshing={isLoadingNext}
//             //   onRefresh={() => refetch({ first: ITEM_CNT })}
//             onEndReachedThreshold={0.1}
//             //   onEndReached={() => loadNext(ITEM_CNT)}
//             style={{ marginVertical: 10 }}
//           />
//           {/* )} */}
//         </View>
//       </ScrollView>
//     </ScrollView>
//   );
// }

// const RecipeCard = ({ item, index }) => {
//   let isEven = index % 2 == 0;
//   return (
//     <View>
//       <Pressable
//         style={{
//           width: "100%",
//           justifyContent: "center",
//           display: "flex",
//           //   flexWrap: "wrap",
//           marginBottom: 2,
//           paddingLeft: isEven ? 0 : 8,
//           paddingRight: isEven ? 8 : 0,
//         }}
//       >
//         <View>
//           <Image
//             source={{ uri: item.strMealThumb }}
//             style={{
//               width: "100%",
//               height: "80%",
//               // height: index % 3 == 0 ? "70%" : "60%",
//               borderRadius: 35,
//             }}
//           />
//         </View>
//         <Text style={{ fontWeight: "semibold", marginLeft: 2, color: "gray" }}>
//           {item.strMeal?.length > 20
//             ? item.strMeal.slice(0, 20) + "..."
//             : item.strMeal}
//         </Text>
//       </Pressable>
//     </View>
//   );
// };

import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Loading from "./Loading";

const RecipeList = ({
  categories,
  meals,
  isLoadingNext,
  refetch,
  loadNext,
  filteredItem,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recipes</Text>

      {/* {categories.length === 0 || meals.length === 0 ? (
        <Loading fontSize={40} />
      ) : ( filteredItem ? (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecipeCard item={item} index={index} navigation={navigation} />
          )}
          refreshing={isLoadingNext}
          onEndReachedThreshold={0.1}
          contentContainerStyle={styles.listContainer}
        />
      )} )  */}

      {categories.length === 0 || meals.length === 0 ? (
        <Loading fontSize={40} />
      ) : filteredItem ? (
        <FlatList
          data={filteredItem}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecipeCard item={item} index={index} navigation={navigation} />
          )}
          refreshing={isLoadingNext}
          onEndReachedThreshold={0.1}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecipeCard item={item} index={index} navigation={navigation} />
          )}
          refreshing={isLoadingNext}
          onEndReachedThreshold={0.1}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const RecipeCard = ({ item, index, navigation }) => {
  let isEven = index % 2 == 0;
  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={[
          styles.pressable,
          { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
        ]}
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        <View>
          <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        </View>
        <Text style={styles.recipeTitle}>
          {item.strMeal?.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "gray",
    marginVertical: 5,
  },
  listContainer: {
    marginVertical: 10,
  },
  cardContainer: {
    flex: 1,
    marginBottom: 2,
  },
  pressable: {
    width: "100%",
    justifyContent: "center",
    display: "flex",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 35,
  },
  recipeTitle: {
    fontWeight: "600",
    marginLeft: 2,
    color: "gray",
  },
});

export default RecipeList;
