import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./page/HomeScreen";
import About from "./page/About";
import Home from "./page/Home";
import RecipeDetailsScreen from "./page/RecipeDetailsScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Welcome Page" }}
        />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
