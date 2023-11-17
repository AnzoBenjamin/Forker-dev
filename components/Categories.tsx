import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import axios from "axios";
import Animated, { FadeInDown } from "react-native-reanimated";
import MasonryList from "@react-native-seoul/masonry-list";
import { useNavigation } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "./Loading";

interface Props {
  onCategoryChanged: (category: string) => void;
  categories: any[];
}

const Categories = ({ categories, onCategoryChanged }: Props) => {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeItem, setActiveItem] = useState<number>(0);
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)

  const styles = StyleSheet.create({
    categoryContainer: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingVertical: 2,
      borderBottomWidth: 1,
      borderBottomColor: colors.tint,
      backgroundColor: colors.background,
      marginTop: -10,
    },
    categoryItem: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    categoryIcon: {
      height: 40,
      width: 40,
    },
    categoryName: {
      fontFamily: "poppins",
      color: colors.tint,
      marginTop: 8,
    },
    categoryNameActive: {
      color: colors.primary,
      marginTop: 8,
      fontFamily: "poppins",
      paddingBottom: 2,
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
    },
    categoryIconActive: {
      height: 40,
      width: 40,
    },
    recipeText: {
      fontSize: hp(1.5),
      marginLeft: 2,
      color: colors.text,
    },
  });

  const RecipeCard = ({
    item,
    index,
    navigation,
  }: {
    item: any;
    index: number;
    navigation: any;
  }) => {
    let isEven = index % 2 == 0;
    return (
      <Animated.View
        entering={FadeInDown.delay(index * 100)
          .duration(600)
          .springify()
          .damping(12)}
      >
        <Pressable
          style={{
            width: "100%",
            paddingLeft: isEven ? 0 : 8,
            paddingRight: isEven ? 8 : 0,
            display: "flex",
            justifyContent: "center",
            marginBottom: 4,
          }}
          onPress={() => navigation.navigate("RecipeDetail", { ...item })}
        >
          {/* <Image 
                  source={{uri: item.strMealThumb}}
                  style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
                  className="bg-black/5"
              /> */}
          <Image
            source={{ uri: item.strMealThumb }}
            style={{
              width: "100%",
              height: index % 3 == 0 ? hp(25) : hp(35),
              borderRadius: 35,
              backgroundColor: colors.tint
            }}
          />

          <Text
            style={styles.recipeText}
          >
            {item.strMeal.length > 20
              ? item.strMeal.slice(0, 20) + "..."
              : item.strMeal}
          </Text>
        </Pressable>
      </Animated.View>
    );
  };

  const selectCategory = (index: number) => {
    setActiveItem(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  const getRecipeByCategory = async () => {
    setLoading(true)
    const { strCategory } = categories[activeItem];
    try {
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`
      );
      setRecipes(data.meals);
      setLoading(false)
    } catch (err) {}
  };

  useEffect(() => {
    getRecipeByCategory();
  }, [activeItem]);

  

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.categoryContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryItem}
              ref={(el) => (itemsRef.current[index] = el)}
              onPress={() => selectCategory(index)}
            >
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={
                  activeItem === index
                    ? styles.categoryIconActive
                    : styles.categoryIcon
                }
              />
              <Text
                style={
                  activeItem === index
                    ? styles.categoryNameActive
                    : styles.categoryName
                }
              >
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 1, paddingHorizontal:10 }}>
        {recipes.length == 0 || recipes.length==0 || loading ? (<Loading/>) : (
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            renderItem={({ item, i }) => (
              <RecipeCard item={item} index={i} navigation={navigation} />
            )}
            // Other props...
          />
        )}

        {/*recipes.map((recipe, index) => (
          <RecipeCard index={index} item={recipe} navigation={navigation} />
        ))*/}
      </View>
    </View>
  );
};

export default Categories;
