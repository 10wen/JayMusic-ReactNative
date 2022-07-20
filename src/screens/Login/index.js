// import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import userList from '../../../assets/data/User.json';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 生成导航对象
  const navigation = useNavigation();

  const signIn = async () => {
    if(userList[0].username === username && userList[0].password === password){
      redirectHome();
    } else {
      Alert.alert('Error', '用户不存在')
    }
  };
  const toSignUp = () => {
    navigation.navigate('Register');
  };

  const redirectHome = () => {
    navigation.navigate('Home');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
        }
      ]
    });
  }

  return (
    <View style={styles.page}>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="用户名"
        style={styles.input}
        autoCapitalize="none" // 取消首字母大写
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="密码"
        style={styles.input}
        secureTextEntry // 密码安全输入
      />
      <Pressable style={styles.button} onPress={signIn}>
        <Text>登录</Text>
      </Pressable>
      <Pressable style={{alignItems: 'center'}} onPress={toSignUp}>
        <Text style={{color: 'blue'}}>去注册</Text>
        
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'dodgerblue',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Login;
