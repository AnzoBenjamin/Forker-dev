import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import { supabase } from "@/libs/supabase";
import { Session } from "@supabase/supabase-js";

const Page = () => {
  const router = useRouter()
  const myStyles = defaultStyles();
  const { signOut, isSignedIn } = useAuth();
  const [sess, setSess] = useState<Session | null>(null);
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    setSess(null)
    router.push("/(modals)/login")
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSess(session);
    });
  }, []);
  return (
    <View>
      {sess && (
        <TouchableOpacity style={myStyles.btn} onPress={logout}>
          <Text style={myStyles.btnText}>Log out</Text>
        </TouchableOpacity>
      )}
      {!sess && (
        <TouchableOpacity style={myStyles.btn}>
          <Text style={myStyles.btnText}>Log in</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Page;