import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context"; // Import from react-native-safe-area-context
import { Ionicons } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";

const ExploreHeader = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingVertical: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingBottom: 16,
      gap: 10,
    },
    filterBtn: {
      padding: 10,
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 24,
      height: 50,
      justifyContent: "center", // Center content vertically
      alignItems: "center", // Center content horizontally
    },
    searchBtn: {
      flexDirection: "row",
      height: 50,
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      borderRadius: 30,
      borderColor: colors.tint,
      borderWidth: StyleSheet.hairlineWidth,
      elevation: 2,
      shadowColor: colors.text,
      shadowOpacity: 0.12,

      flex: 1,
      shadowRadius: 8,
      shadowOffset: {
        width: 1,
        height: 1,
      },
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={24} color={colors.text} />
            <View>
              <TextInput
                style={{
                  fontFamily: "poppins-sb",
                  color: colors.text,
                  width: 100,
                }}
                placeholder="Take a bite"
                placeholderTextColor={colors.text}
              ></TextInput>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExploreHeader;
