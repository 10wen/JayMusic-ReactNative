import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home/index';

const Navigation = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Login" component={Login} options={{ title: '登录'}}/>
        <Stack.Screen name="Register" component={Register} options={{ title: '注册'}}/>
        <Stack.Screen name="Home" component={Home} options={{ title: 'JayMusic'}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation;