import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import ExploreHeader from "@/components/ExploreHeader";
import Categories from "@/components/Categories";
import axios from "axios";

const Page = () => {
  const [category, setCategory] = useState("Snack");
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [categories, setCategories] = useState<any[]>([]);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (data && data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      {/* Define pour custom header */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader />,
        }}
      />
      <Categories categories={categories} onCategoryChanged={onDataChanged} />
    </View>
  );
};

export default Page;
