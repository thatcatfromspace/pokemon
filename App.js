import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Image, View, StyleSheet, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const pokemonColors = {
  normal: { color: "#808080", textColor: "#000000" },
  fire: { color: "#FF0000", textColor: "#FFFFFF" },
  water: { color: "#0000FF", textColor: "#FFFFFF" },
  electric: { color: "#FFFF00", textColor: "#000000" },
  grass: { color: "#008000", textColor: "#FFFFFF" },
  ice: { color: "#ADD8E6", textColor: "#000000" },
  fighting: { color: "#A52A2A", textColor: "#FFFFFF" },
  poison: { color: "#800080", textColor: "#FFFFFF" },
  ground: { color: "#D2B48C", textColor: "#000000" },
  flying: { color: "#87CEEB", textColor: "#000000" },
  psychic: { color: "#FFC0CB", textColor: "#000000" },
  bug: { color: "#808000", textColor: "#FFFFFF" },
  rock: { color: "#B0AFAF", textColor: "#000000" },
  ghost: { color: "#E6E6FA", textColor: "#000000" },
  dragon: { color: "#4B0082", textColor: "#FFFFFF" },
  dark: { color: "#A9A9A9", textColor: "#000000" },
  steel: { color: "#C0C0C0", textColor: "#000000" },
  fairy: { color: "#FFB6C1", textColor: "#000000" },
};

export default function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [currentPokemon, changeCurrentPokemon] = useState(false);
  const [currentKeys, setCurrentKeys] = useState([
    "eui443i2-48392-ddxf",
    "i49930-58483-jdjmx",
  ]);

  useEffect(() => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 800)}/`
      )
      .then((res) => {
        setPokemonData(res.data);
      });
  }, [currentPokemon]);

  const [fontsLoaded] = useFonts({
    // custom fonts - refer https://docs.expo.dev/develop/user-interface/fonts/
    Inter: require("./assets/fonts/InterDisplay-Regular.otf"),
  });

  return (
    pokemonData && (
      <View className="flex-1 items-center justify-center py-10">
        <View className="flex">
          <Image
            source={{ uri: pokemonData.sprites.front_default }}
            style={{ width: 125, height: 125 }} // MUST specify dimensions - see https://reactnative.dev/docs/images#network-images
          ></Image>
        </View>
        <Text className="text-xl mb-2" style={{ fontFamily: "Inter" }}>
          {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
        </Text>
        <View style={{ flexDirection: "row" }}>
          {pokemonData.types.map((poketype, number) => (
            <View
              className="p-1 rounded-md m-1"
              style={{
                backgroundColor: pokemonColors[poketype.type.name].color,
              }}
              key={currentKeys[number]}
            >
              <Text
                className="font-sm"
                style={{
                  fontFamily: "Inter",
                  color: pokemonColors[poketype.type.name].textColor,
                }}
                key={`text_${currentKeys[number]}`}
              >
                {poketype.type.name.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
        <Pressable
          className="bg-purple-300 py-3 px-5 rounded-full mt-10"
          onPress={() => changeCurrentPokemon(!currentPokemon)}
        >
          <Text style={{ fontFamily: "Inter" }}>New Pokemon!</Text>
        </Pressable>
      </View>
    )
  );
}
