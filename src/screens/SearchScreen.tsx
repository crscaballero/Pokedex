import React from 'react';
import { Platform, View, Text, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';
import { styles as globalStyles } from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();

  return isFetching
    ? (
      <Loading />
    )
    : (
      <View
        style={{
          flex: 1,
          // marginTop: Platform.OS === 'ios' ? top : top + 10,
          marginHorizontal: 20,
          // top: Platform.OS === 'ios' ? top : top + 10
        }}
      >
        <SearchInput
          style={{
            position: 'absolute',
            zIndex: 999,
            width: screenWidth - 40,
            paddingTop: Platform.OS === 'ios' ? top : top + 20
          }}
        />
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
                color: 'black',
                paddingBottom: 10,
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 60
              }}
            >
              Pokedex
            </Text>
          )}

          renderItem={({item}: any) => <PokemonCard pokemon={item} />}
        />
      </View>
    )
};
