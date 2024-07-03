import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Office Wear', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress1.png') },
  { id: '2', name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress2.png') },
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress3.png') },
  { id: '4', name: 'Lamerei', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress4.png') },
  { id: '5', name: '21WN', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress5.png') },
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress6.png') },
  { id: '7', name: 'Iame', description: 'reversible angora cardigan', price: '$120', image: require('../assets/dress7.png') },
];

const Home = ({ navigation }) => {
  
  const addToCart = async (item) => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      cartItems.push(item);
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Image source={require('../assets/add_circle.png')} style={styles.addButtonIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/Menu.png')} style={styles.menuIcon} />
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerRightIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image source={require('../assets/Search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Image source={require('../assets/Filter.png')} style={styles.filterIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shoppingBag.png')} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.header}>Our Story</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  filterIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%',
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#ff69b4', // Pinkish color
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  addButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default Home;