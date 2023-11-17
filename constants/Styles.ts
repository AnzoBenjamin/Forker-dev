import { StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import Colors from "./Colors";

export const defaultStyles = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 26,
      color: colors.text,
      justifyContent: "center",
      alignItems: "center",
    },
    inputField: {
      height: 44,
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 8,
      padding: 10,
      backgroundColor: colors.background,
      color: colors.text,
    },
    btn: {
      backgroundColor: colors.primary,
      height: 50,
      borderRadius: 8,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    btnOutline: {
      borderWidth: 1,
      borderColor: colors.text,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      paddingHorizontal: 10,
      flexDirection: "row",
    },
    btnOutlineText: {
      color: colors.text,
      fontFamily: "poppins-sb",
      fontSize: 16,
    },
    btnText: {
      color: colors.text,
      fontSize: 16,
      fontFamily: "poppins-b",
    },
    btnLinkOutline: {
      marginTop: 10,
      borderColor: colors.primary,
      borderWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      fontSize: 12,
      fontFamily: "poppins",
      justifyContent: "center",
      alignItems: "center"
    },
    btnIcon: {
      position: "absolute",
      left: 16,
      color: colors.text,
      fontSize: 24,
    },
    footer: {
      position: "absolute",
      height: 100,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.background,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopColor: colors.tabIconDefault,
      borderTopWidth: StyleSheet.hairlineWidth,
    },
  });
};
