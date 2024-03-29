import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AppStateStore from '../../store/state';
import {BACKEND_API_URL} from '../../vars';

export default function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('customer@gmail.com');
  const [password, setPassword] = React.useState('12345678');

  const signIn = AppStateStore.useStoreActions((actions) => actions.signIn);
  const setUserContext = AppStateStore.useStoreActions(
    (actions) => actions.setUserContext,
  );

  function handleLogin() {
    fetch(BACKEND_API_URL + '/scem-user/app-auth/loginJSON', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        console.log(res)
        if (res.status !== 201) {
          
          return Promise.reject('Sai email hoặc mật khẩu');
        }
        return res.json();
      })
      .then((json) => {
        signIn(json);
        setUserContext(json.front_end_context);
      })
      .catch((error) => {
        Alert.alert(JSON.stringify(error));
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login!</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholderTextColor="#003f5c"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  warning: {
    fontWeight: 'bold',
    fontSize: 11,
    color: '#fb5b5a',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
