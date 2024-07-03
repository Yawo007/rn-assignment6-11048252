import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/home';
import Checkout from './pages/Checkout';                                                                                                                                                                                                                                                                                                                                                                                                                                                

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} options={{}}/>
        <Drawer.Screen name="Checkout" component={Checkout} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
