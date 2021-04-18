/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  languages,
  spokenLanguages,
  fetchRepositories,
  fetchDevelopers,
} from '@huchenme/github-trending';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  LogBox,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import githubTrends from 'github-trends-api';
import TemplateItem from './src/Template';
import Loader from './src/Loader';
import Modal from 'react-native-modal';



const App = (props) => {
  LogBox.ignoreLogs(['Warning: ...', '']);
  const [trendingArray, setTrendingArray] = useState([]);
  const [Language, setLanguage] = useState('');
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(null);
  useEffect(() => {
    console.log(languages);
    getSearch();
  }, []);


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function getSearch(text) {
    console.log('text', text);
    setLoading(true);
    if (text) {
      const url =
        "https://api.github.com/search/repositories?q={" + text + "}{&page,per_page,sort,order}"
      console.log('url :', url);

      fetch(url, {
        method: 'GET',
      })
        .then((responseJson) => responseJson.json())
        .then((responseJson) => {
          console.log(responseJson);
          setTrendingArray(responseJson.items);
          setLoading(false);
        })
        .catch((error) => {
          console.error('error', error);
        });
    }
    else {

      githubTrends()
        .then(result => { console.log(result), setTrendingArray(result); setLoading(false) })
        .catch(error => { console.log(error) });

    }
  }


  const _renderModalLanguageContent = () => (
    <View style={styles.modalContent}>
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        data={languages}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        renderItem={({ item, index }) =>
          index === 0 ? (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setLanguage(''),
                  getSearch();
                setVisibleModal(null);
              }}>
              <View>
                <Text style={styles.item}>Unselect Language</Text>
              </View>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#CED0CE',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setLanguage(item.name);
                getLanguage();
                setVisibleModal(null);
              }}>
              <View>
                <Text style={styles.item}>{item.name}</Text>
              </View>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#CED0CE',
                }}
              />
            </TouchableOpacity>
          )
        }
        keyExtractor={(item, index) => index.toString()}
      //   ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
  const getLanguage = () => {
    setLoading(true);
    githubTrends({ language: Language })
      .then(result => { console.log("language result", result), setTrendingArray(result); setLoading(false) })
      .catch(error => { console.log("language error", error) });

  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.sectionInputText}
          placeholder="Search"
          placeholderTextColor="#000"
          underlineColorAndroid="transparent"
          onChangeText={(text) => {
            getSearch(text);
          }}
        // autoFocus={true}

        // value={this.state.value}
        />
        <View style={styles.sectionFilter} >
          <TouchableOpacity ><Text>Stars</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setVisibleModal(6)}><Text>Language {Language ? ' : ' + Language : " "}</Text></TouchableOpacity>
        </View>

        <Modal
          isVisible={visibleModal === 6}
          onBackdropPress={() => setVisibleModal(null)}
          style={{ backgroundColor: 'white' }}
          onBackButtonPress={() => setVisibleModal(null)}>
          {_renderModalLanguageContent()}
        </Modal>

        {
          loading ? <Loader /> :
            trendingArray.length > 0 ? 
            <View style={{ height: '85%' }}>
              <FlatList
                // keyboardShouldPersistTaps={'handled'}

                data={trendingArray}
                renderItem={({ item, index }) => <TemplateItem item={item} index={index} props={props} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ maxheight: '85%' }}
                showsVerticalScrollIndicator={false}

              />  
              </View> :
              <View style={{ height: '85%', justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center' }}>NoThing Found</Text> </View>
        }


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionInputText: {
    paddingVertical: 0,
    color: '#000',
    width: '90%',
    marginEnd: 10,
    marginStart: 10,
    textAlign: 'left',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  sectionFilter: {
    width: "100%", marginTop: 10,
    height: 30, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  item: {
    color: 'black',
    padding: 10,
    fontSize: 12,
    height: 44,
  },
});

export default App;
