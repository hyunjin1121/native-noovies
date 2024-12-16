import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import SwiperFlatList from "react-native-swiper-flatlist";
import { useEffect, useState } from "react";
import { makeImgPath } from "./utils";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";

const API_KEY = '4122d35800580d04322168a32aa5a539';

const Movies = () => {
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const [nowPlayMovies, setNowPlayMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const goToDetail = (detailData) => {
    navigation.navigate("Stack", {screen: "Detail", params: {detailData}})
  }

  const getTrending = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
    ).json();
    setTrending(results);
    setLoading(false);
  };

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&languge=en-US&page=1`)
    ).json();
    setUpcoming(results);
    setLoading(false);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&languge=en-US&page=1`)
    ).json();
    setNowPlayMovies(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
    getTrending();
    getUpcoming();
  }, []);

  const loadMore = () => {
    alert("load more!");
  }

  return loading ? (
    <ActivityIndicator style={{ flex: 1, justifyContent: 'center' }} />
  ) : (
    <FlatList
      // onEndReached={loadMore}
      // onEndReachedThreshold={0.5}
      data={upcoming}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <SwiperFlatList
            autoplay
            autoplayDelay={4}
            autoplayLoop
            horizontal
            data={nowPlayMovies}
            renderItem={({ item }) => (
              <View style={{ ...styles.child, backgroundColor: 'red' }}>
                <Image source={{ uri: makeImgPath(item.backdrop_path) }} style={{ flex: 1 }} />
                <BlurView
                  style={styles.absolute}
                  blurType={isDark ? "dark" : "light"}
                  blurAmount={10}
                  reducedTransparencyFallbackColor="white"
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={{ uri: makeImgPath(item.poster_path) }} style={styles.poster} />
                    <View style={{ width: '40%', marginLeft: 20 }}>
                      <Text style={{ color: 'white', fontWeight: '600' }}>{item.original_title}</Text>
                      <Text style={{ color: 'white' }}>⭐️{item.vote_average.toFixed(1)}/10</Text>
                      <Text style={{ color: 'rgba(255,255,255, 0.6)', marginTop: 10 }}>
                        {item.overview.slice(0, 90)}...
                      </Text>
                    </View>
                  </View>
                </BlurView>
              </View>
            )}
          />

          <Text style={styles.sectionTitle}>Trending Movies</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 30 }}
            data={trending}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{goToDetail(item)}} style={{ alignItems: 'center', marginRight: 20 }}>
                <Image
                  source={{ uri: makeImgPath(item.poster_path) }}
                  style={{ width: 100, height: 160, borderRadius: 5 }}
                />
                <Text style={{ color: 'white', marginTop: 7, fontWeight: '600' }}>
                  {item.title.slice(0, 13)}
                  {item.title.length > 13 ? '...' : null}
                </Text>
                <Text style={{ color: 'white' }}>⭐️{item.vote_average.toFixed(1)}/10</Text>
              </TouchableOpacity>
            )}
          />
          <Text style={styles.sectionTitle}>Coming Soon</Text>
        </>
      }
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>{goToDetail(item)}} style={{ marginBottom: 20, marginRight: 20, flexDirection: 'row', paddingLeft: 30 }}>
          <Image
            source={{ uri: makeImgPath(item.poster_path) }}
            style={{ width: 100, height: 160, borderRadius: 5 }}
          />
          <View style={{ marginLeft: 10, width: '60%' }}>
            <Text style={{ color: 'white', marginTop: 7, fontWeight: '600' }}>
              {item.title.slice(0, 13)}
              {item.title.length > 13 ? '...' : null}
            </Text>
            <Text style={{ color: 'white' }}>⭐️{item.vote_average.toFixed(1)}/10</Text>
            <Text style={{ color: 'rgba(255,255,255, 0.6)', marginTop: 10 }}>
              {item.overview.slice(0, 160)}...
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  child: { width: windowWidth, justifyContent: 'center', height: windowHeight / 4 },
  text: { fontSize: windowWidth * 0.5, textAlign: 'center' },
  poster: { width: 100, height: 160, borderRadius: 5 },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  sectionTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 30,
    marginBottom: 20,
    marginTop: 30,
  },
});

export default Movies;
