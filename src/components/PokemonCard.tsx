import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, Platform, StyleSheet } from 'react-native';
import ImageColors from 'react-native-image-colors';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import { FadeInImage } from './FadeInImage';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { RootStackParams } from '../navigator/Navigator';
import { capitalizeFirstLetter } from '../helpers/capitalize';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParams, 'HomeScreen'>

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState<string>('grey');
  const isMounted = useRef<boolean>(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const asyncColor = async () => {
    const colors: any = await ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
    });

    if (isMounted.current) {
      if (colors.platform === 'android' || colors.platform === 'web') {
        setBgColor(colors.dominant);
      } else {
        setBgColor(colors.background);
      }
    }
  };

  useEffect(() => {
    asyncColor();
    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.touchableContainer}
      onPress={() => navigation.navigate('PokemonScreen', {simplePokemon: pokemon, color: bgColor})}
    >
      <View
        style={{
          ...styles.cardContainer,
          backgroundColor: bgColor
        }}
      >
        <View>
          <Text style={styles.name}>
            {`${capitalizeFirstLetter(pokemon.name)}\n#${pokemon.id}`}
          </Text>
        </View>
        <View style={styles.pokeballContainer}>
          <Image source={require('../assets/pokeball-white.png')} style={styles.pokeball} />
        </View>
        <FadeInImage
          uri={pokemon.picture}
          style={styles.pokemonImage}
        />
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  touchableContainer: {},
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: (Platform.OS === 'web') ? 200 : windowWidth * 0.4,
    marginBottom: 25,
    borderRadius: 10,
    
    // Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5
  },
});
