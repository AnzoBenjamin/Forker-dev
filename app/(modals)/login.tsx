import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "@/libs/supabase";

WebBrowser.maybeCompleteAuthSession();

const login = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const myStyles = defaultStyles();
  const [session, setSession] = useState({});

  const signInWithEmail = async () => {
    setLoading(true);
    const {
      error,
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      if (!email) return Alert.alert("Please enter your email");
      if (!password) return Alert.alert("Please enter your passsword");
      else return Alert.alert(error.message);
    }
    setSession(session!);
    setLoading(false);
    router.push("/");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 26,
      color: colors.text,
    },
    separatorView: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      marginVertical: 30,
    },
    seperator: {
      fontFamily: "poppins-sb",
      color: colors.tint,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[myStyles.inputField, { marginBottom: 10 }]}
        placeholderTextColor={colors.text}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        autoCapitalize="none"
        placeholder="Password"
        style={[myStyles.inputField, { marginBottom: 30 }]}
        placeholderTextColor={colors.text}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={myStyles.btn} onPress={signInWithEmail}>
        <Text style={myStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Link href={"/(modals)/signup"} style={myStyles.btnLinkOutline}>
          <Text style={{ color: colors.primary }}>Forgot Password?</Text>
        </Link>
        <Link href={"/(modals)/signup"} style={myStyles.btnLinkOutline}>
          <Text style={{ color: colors.primary }}>Sign up</Text>
        </Link>
      </View>
      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: colors.text,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>Or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: colors.text,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <View style={{ gap: 20 }}>
        <TouchableOpacity style={myStyles.btnOutline}>
          <Ionicons name="md-logo-apple" style={myStyles.btnIcon} />
          <Text style={myStyles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={myStyles.btnOutline}>
          <Ionicons name="md-logo-google" style={myStyles.btnIcon} />
          <Text style={myStyles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={myStyles.btnOutline}>
          <Ionicons name="md-logo-facebook" style={myStyles.btnIcon} />
          <Text style={myStyles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default login;
