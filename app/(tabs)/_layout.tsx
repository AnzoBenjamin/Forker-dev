import { View, Text } from "react-native";
import React from "react";
import { Tabs, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: Colors.light.primary, tabBarLabelStyle: {fontFamily: "poppins-sb"}}}>
      <Tabs.Screen name="index" options={{
        tabBarLabel: "Home",
        tabBarIcon: ({color, size})=> <MaterialCommunityIcons name="home" color={color} size={size}/>
      }}/>
      <Tabs.Screen name="prepared" options={{
        tabBarLabel: "Prepared",
        tabBarIcon: ({color, size})=> <MaterialCommunityIcons name="cookie" color={color} size={size}/>
      }}/>
       <Tabs.Screen name="saved" options={{
        tabBarLabel: "Saved",
        tabBarIcon: ({color, size})=> <MaterialIcons name="bookmarks" color={color} size={size}/>
      }}/>
       <Tabs.Screen name="settings" options={{
        tabBarLabel: "Settings",
        tabBarIcon: ({color, size})=> <MaterialIcons name="settings" color={color} size={size}/>
      }}/>
    </Tabs>
  );
};

export default _layout;
