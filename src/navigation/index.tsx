import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProductsScreen from "../screens/ProductsScreen";
import CartScreen from "../screens/CartScreen";
import UsersScreen from "../screens/UsersScreen";
import UserDetailsScreen from "../screens/UsersDetailsScreen";
import TokenScreen from "../screens/TokenScreen";
import DeviceInfoScreen from "../screens/DeviceInfoScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Token" component={TokenScreen} />
      <Tab.Screen name="DeviceInfo" component={DeviceInfoScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{ title: "User Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
