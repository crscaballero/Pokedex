import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { FadeInImage } from './FadeInImage';
import { PokemonFull } from '../interfaces/PokemonInterfaces';
import { capitalizeFirstLetter } from '../helpers/capitalize';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      ...StyleSheet.absoluteFillObject,
    }}
  >
    <View
      style={{
        ...styles.container,
        marginTop: 370,
      }}
    >
      <Text style={styles.title}>Types</Text>
      <View style={styles.listContainer}>
        {pokemon.types.map(({type}) => (
          <Text
            key={type.name}
            style={{
              ...styles.regularText,
              marginRight: 10
            }}
          >
            {capitalizeFirstLetter(type.name)}
          </Text>
        ))}
      </View>
      <Text style={styles.title}>Weight</Text>
      <Text style={styles.regularText}>{pokemon.weight / 10}kg</Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Sprites</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
      <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
      <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
      <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
    </ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Abilities</Text>
      <View style={styles.listContainer}>
        {pokemon.abilities.map(({ability}) => (
          <Text
            key={ability.name}
            style={{
              ...styles.regularText,
              marginRight: 10
            }}
          >
            {capitalizeFirstLetter(ability.name)}
          </Text>
        ))}
      </View>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Moves</Text>
      <View style={{...styles.listContainer, ...styles.wrapContainer}}>
        {pokemon.moves.map(({move}) => (
          <Text
            key={move.name}
            style={{
              ...styles.regularText,
              marginRight: 10
            }}
          >
            {capitalizeFirstLetter(move.name)}
          </Text>
        ))}
      </View>
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <View>
        {pokemon.stats.map((stat, index) => (
          <View key={`${index}-${stat.stat.name}`} style={styles.listContainer}>
            <Text
              key={stat.stat.name}
              style={{
                ...styles.regularText,
                marginRight: 10,
                width: 150,
              }}
            >
              {capitalizeFirstLetter(stat.stat.name)}
            </Text>
            <Text
              key={stat.base_stat}
              style={{
                ...styles.regularText,
                fontWeight: 'bold',
              }}
            >
              {stat.base_stat}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.lastImageContainer}>
        <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  listContainer: {
    flexDirection: 'row'
  },
  wrapContainer: {
    flexWrap: 'wrap'
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    color: 'black',
    fontSize: 17,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  lastImageContainer: {
    marginBottom: 60,
    alignItems: 'center'
  }
});
