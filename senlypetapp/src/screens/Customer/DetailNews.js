import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DetailNews = ({navigation, route}) => {
  const idNews = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <View style={{width: '100%', height: 200}}>
          <ImageBackground
            source={{uri: idNews.link}}
            resizeMode="cover"
            style={{
              flex: 1,
              backgroundColor: '#fff',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                opacity: 0.5,
                padding: 10,
                marginLeft: 15,
              }}
              onPress={() => navigation.goBack()}>
              <FontAwesome5
                name="arrow-left"
                style={{fontSize: 22, color: '#fff'}}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{
            display: 'flex',
          }}>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'justify',
                color: '#000',
              }}>
              {idNews.title}
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 16,
                textAlign: 'justify',
                color: '#000',
              }}>
              {idNews.content}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailNews;

const styles = StyleSheet.create({});
