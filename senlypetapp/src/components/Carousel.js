import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

const {width} = Dimensions.get('window');
const height = width * 0.6;
const images = [
  'http://cdn.tgdd.vn/Files/2021/04/19/1344707/top-dia-chi-shop-ban-quan-ao-cho-cho-meo-dep-de-thuong-nhat-202104191853258895.jpg',
  'https://bizweb.dktcdn.net/100/364/584/articles/grooming-banner.png?v=1575627683147',
  'https://khamphadalat.vn/wp-content/uploads/2020/07/nha-boss-cofee-dalat-4-scaled.jpg',
];

const Carousel = ({navigation}) => {
  const [inActive, setinActive] = useState(0);
  const onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== inActive) {
        setinActive(slide);
      }
    }
  };
  return (
    <View style={styles.carousel}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={({nativeEvent}) => onchange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollcarousel}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{
              uri: image,
            }}
            style={styles.imagecarousel}
          />
        ))}
      </ScrollView>
      <View style={styles.paginationcrs}>
        {images.map((e, index) => (
          <Text
            key={e}
            style={
              inActive === index ? styles.dotActivecarousel : styles.dotcarousel
            }>
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carousel: {
    marginTop: 0,
    width,
    height,
  },
  scrollcarousel: {width, height},
  imagecarousel: {width, height, resizeMode: 'cover'},
  paginationcrs: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  dotcarousel: {fontSize: width / 30, color: '#888', margin: 3},
  dotActivecarousel: {fontSize: width / 30, color: '#fff', margin: 3},
});
