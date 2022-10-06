import React from 'react';
import { View, Image, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

import { globalStyles } from '../theme/appTheme';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokeball.png')}
        style={globalStyles.pokeballBG}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <View style={styles.flatListContainer}>
            <FlatList
              data={simplePokemonList}
              keyExtractor={(pokemon: SimplePokemon) => pokemon.id}
              showsVerticalScrollIndicator={false}
              numColumns={2}

              // Header
              ListHeaderComponent={(    
                <Text
                  style={{
                    ...globalStyles.title,
                    ...globalStyles.globalMargin,
                    ...styles.flatListHeader,
                    top: top + 20,
                    marginBottom: top + 20,
                  }}
                >
                  Pokedex
                </Text>
              )}

              renderItem={({item}: any) => <PokemonCard pokemon={item} />}
              
              // Infinite Scroll
              onEndReached={loadPokemons}
              onEndReachedThreshold={0.4}

              // Activity Indicator
              ListFooterComponent={(
                <ActivityIndicator
                  style={{height: 100}}
                  size={20}
                  color="grey"
                />
              )}
            />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    alignItems: 'center'
  },
  flatListHeader: {
    color: 'black',
    paddingBottom: 10,
  }
});
