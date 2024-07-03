import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, AsyncStorage } from 'react-native';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        let storedItems = await AsyncStorage.getItem('cart');
        storedItems = storedItems ? JSON.parse(storedItems) : [];
        setCartItems(storedItems);
      } catch (error) {
        console.error('Error fetching cart items: ', error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (id) => {
    try {
      let storedItems = await AsyncStorage.getItem('cart');
      storedItems = storedItems ? JSON.parse(storedItems) : [];

      // Remove item from cart
      const updatedItems = storedItems.filter(item => item.id !== id);

      // Update AsyncStorage with updated cart items
      await AsyncStorage.setItem('cart', JSON.stringify(updatedItems));

      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error removing from cart: ', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <Text>{item.name} - ${item.price}</Text>
      <Button title="Remove from Cart" onPress={() => removeFromCart(item.id)} />
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{ width: '100%' }}
        />
      ) : (
        <Text style={{fontWeight: 'bold'}}>There are no items in your cart.</Text>
      )}
    </View>
  );
};

export default Checkout;
