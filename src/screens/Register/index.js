import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const navigation = useNavigation();

  const signUp = () => {

  }
  const toSignIn = () => {
    navigation.navigate('Login');
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
      <TextInput
        value={rePassword}
        onChangeText={setRePassword}
        placeholder="确认密码"
        style={styles.input}
        secureTextEntry // 密码安全输入
      />
      <Pressable style={styles.button} onPress={signUp}>
        <Text style={{fontSize: 18,}}>注册</Text>
      </Pressable>
      {/* <Pressable style={{alignItems: 'center'}} onPress={toSignIn}>
        <Text style={{color: 'blue'}}>去登录</Text>
      </Pressable> */}
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

export default Register;
