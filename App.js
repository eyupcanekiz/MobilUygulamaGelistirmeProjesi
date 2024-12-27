import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import UserDashboard from "./screens/UserDashboard";
import AdminDashboard from "./screens/AdminDashboard";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: "Giriş Yap" }} />
        <Stack.Screen name="Register" component={Register} options={{ title: "Kayıt Ol" }} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} options={{ title: "Kullanıcı Paneli" }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: "Yönetici Paneli" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
