import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { useRouter, Link } from "expo-router";
import Colors from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";

const signup = () => {
  const colorScheme = useColorScheme();
  const myStyles = defaultStyles();
  const router = useRouter();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);


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

  const signUp = async () => {
      const{error, data:{session}} = await supabase.auth.signUp({email, password})
      if(error){
        if(!email) return Alert.alert("Please enter your email")
        if(!password) return Alert.alert("Please enter your passsword");
        if(password!==confirmPassword) return Alert.alert("Password do not match")
        else return Alert.alert(error.message);
      }
      setSession(session)
      router.push("/(modals)/login")
  };

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

      <TextInput
        autoCapitalize="none"
        placeholder="Confirm password"
        style={[myStyles.inputField, { marginBottom: 30 }]}
        placeholderTextColor={colors.text}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />

      <TouchableOpacity style={myStyles.btn} onPress={signUp}>
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
        <Link href={"/(modals)/login"} style={myStyles.btnLinkOutline}>
          <Text style={{ color: colors.primary }}>Sign in</Text>
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

export default signup;
