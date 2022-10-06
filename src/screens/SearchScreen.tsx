import React, { useState, useEffect } from 'react';
import { Platform, Image, View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { DismissKeyboard } from '../components/DismissKeyboard';
import { ScrollView } from 'react-native-virtualized-view';

import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { globalStyles } from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width

export const SearchScreen = () => {
  const [term, setTerm] = useState<string>('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  
  useEffect(() => {
    if (term) {
      if (isNaN(Number(term))) { // Search by name
        const pokemonFilteredByName = simplePokemonList.filter(poke => poke.name.toLowerCase().includes(term.toLowerCase()));
        setPokemonFiltered(pokemonFilteredByName);
      } else { // Search by Id
        const pokemonFilteredByIf = simplePokemonList.find(poke => poke.id === term);
        setPokemonFiltered(pokemonFilteredByIf ? [pokemonFilteredByIf] : []);
      }
    } else {
      setPokemonFiltered([]);
    }
  }, [term])

  return isFetching
    ? (
      <Loading />
    )
    : (
      // <DismissKeyboard>
        <View
          style={{
            ...globalStyles.globalMargin,
            ...styles.searchContainer,
            // marginTop: Platform.OS === 'ios' ? top : top + 10,
            // top: Platform.OS === 'ios' ? top : top + 10
          }}
        >
          <Image
            source={require('../assets/pokeball.png')}
            style={globalStyles.pokeballBG}
          />
          <SearchInput
            onDebounce={(value: string) => setTerm(value)}
            style={{
              ...styles.searchInput,
              paddingTop: Platform.OS === 'ios' ? top : top + 20
            }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
          >
            <View style={styles.pokemonContainer}>
              {(term.length && !pokemonFiltered.length)
              ? (
                <View
                  style={{
                    ...globalStyles.globalMargin,
                    ...styles.noPokemonFound,
                    marginTop: top + 70
                  }}
                >
                  <Text style={{...globalStyles.blackNormalText, ...styles.noPokemonFoundText}}>
                    No Pokemon were found
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={pokemonFiltered}
                  keyExtractor={(pokemon: SimplePokemon) => pokemon.id}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}

                  // Header
                  ListHeaderComponent={(    
                    <Text
                      style={{
                        ...globalStyles.title,
                        ...globalStyles.globalMargin,
                        ...globalStyles.blackNormalText,
                        ...styles.flatListHeader,
                        marginTop: top + 70
                      }}
                    >
                      {term || ''}
                    </Text>
                  )}

                  renderItem={({item}: any) => <PokemonCard pokemon={item} />}
                />
              )}
            </View>
          </ScrollView>
        </View>
      // </DismissKeyboard>
    )
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    position: 'absolute',
    zIndex: 999,
    width: screenWidth - 40,
  },
  pokemonContainer: {
    alignItems: 'center'
  },
  flatListHeader: {
    paddingBottom: 10,
  },
  noPokemonFound: {
    position: 'absolute',
  },
  noPokemonFoundText: {
    fontSize: 20,
  }
});
