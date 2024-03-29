/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Title, Text, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserContext from '../../context/UserContext';
import AppStateStore from '../../store/state';
import {BACKEND_API_URL} from '../../vars';
import {CommonActions} from '@react-navigation/native';

const MainProfilesScreen = ({navigation}) => {
  const validateToken = AppStateStore.useStoreActions(
    (actions) => actions.validateToken,
  );

  const accessToken = AppStateStore.useStoreState((state) => state.accessToken);
  const signOut = AppStateStore.useStoreActions((actions) => actions.signOut);
  const [valueforContext] = useContext(UserContext);

  React.useEffect(() => {
    validateToken();
  }, [validateToken]);

  function handleLogout() {
    fetch(BACKEND_API_URL + '/scem-user/app-auth/logout', {
      headers: {
        Authorization: accessToken,
      },
      method: 'GET',
    })
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject('Bad request sent to server!');
        }
        return res.json();
      })
      .then((json) => {
        signOut();
      })
      .catch((error) => {
        signOut();
        Alert.alert(JSON.stringify(error));
      });

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SplashScreen'}],
      }),
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>Profile</Text>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.PeopleInfo}>
          <View style={styles.IconWrap}>
            <Icon name="account" size={40} color="#FFFFFF" />
          </View>
          <View style={styles.PeopleInfo__ContentWrap}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {valueforContext.name}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <FontAwesome name="id-card" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 10, marginRight: 10}}>
            ID: {valueforContext.customer_id || valueforContext.employee_id}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{color: '#777777', marginLeft: 10, marginRight: 10}}>
            Phone: {valueforContext.phone}
          </Text>
          <Icon
            name="lead-pencil"
            color="#FD8209"
            size={16}
            onPress={() => navigation.navigate('Edit Profile')}
          />
        </View>
        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={styles.row}>
            <FontAwesome name="sign-out" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 10, marginRight: 10}}>
              Sign out
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.menuWrapper}>
        <Text style={styles.AccountTitle}>Account setting</Text>

        <TouchableRipple
          style={styles.menuItemContainer}
          onPress={() => {
            navigation.navigate('Introduce');
          }}>
          <View style={[styles.menuItem, {}]}>
            <View
              style={[
                styles.IconWrapAccountContent,
                {
                  backgroundColor: '#F77829',
                },
              ]}>
              <IconFeather name="list" color="#FFFFFF" size={20} />
            </View>

            <View style={styles.ContentWrapAccountContent}>
              <Text style={styles.menuItemText}>Orders</Text>
              <IconFeather name="chevron-right" color="#777777" size={20} />
            </View>
          </View>
        </TouchableRipple>

        <TouchableRipple
          style={styles.menuItemContainer}
          onPress={() => {
            navigation.navigate('Introduce');
          }}>
          <View style={styles.menuItem}>
            <View
              style={[
                styles.IconWrapAccountContent,
                {
                  backgroundColor: '#208AA2',
                },
              ]}>
              <FontAwesome name="info" color="#FFFFFF" size={20} />
            </View>

            <View style={styles.ContentWrapAccountContent}>
              <Text style={styles.menuItemText}>Introduce</Text>
              <IconFeather name="chevron-right" color="#777777" size={20} />
            </View>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            navigation.navigate('How to use');
          }}>
          <View style={styles.menuItem}>
            <View
              style={[
                styles.IconWrapAccountContent,
                {
                  backgroundColor: '#1BA9FF',
                },
              ]}>
              <Icon name="book-open-page-variant" color="#FFFFFF" size={20} />
            </View>
            <View style={styles.ContentWrapAccountContent}>
              <Text style={styles.menuItemText}>How to use</Text>
              <IconFeather name="chevron-right" color="#777777" size={20} />
            </View>
          </View>
        </TouchableRipple>

        <TouchableRipple
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <View style={styles.menuItem}>
            <View
              style={[
                styles.IconWrapAccountContent,
                {
                  backgroundColor: '#6F82E8',
                },
              ]}>
              <Icon name="cog-outline" color="#FFFFFF" size={20} />
            </View>
            <View style={styles.ContentWrapAccountContent}>
              <Text style={styles.menuItemText}>Settings</Text>
              <IconFeather name="chevron-right" color="#777777" size={20} />
            </View>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  userInfoSection: {
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },

  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },

  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuWrapper: {
    paddingHorizontal: 20,
  },

  menuItemContainer: {
    marginTop: 0,
    marginBottom: 0,
  },

  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },

  PeopleInfo: {
    flexDirection: 'row',
    marginTop: 15,
  },

  IconWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1BA9FF',
    minWidth: 70,
    minHeight: 70,
    borderRadius: 60,
  },

  PeopleInfo__ContentWrap: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20,
    margin: 0,
    padding: 0,
  },

  AccountTitle: {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  IconWrapAccountContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    minWidth: 30,
    minHeight: 30,
    borderRadius: 60,
  },

  ContentWrapAccountContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: 10,
  },

  headerContainer: {
    height: 57,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    borderBottomWidth: 2,
    borderBottomColor: '#e3e3e3',
  },

  textHeader: {
    textAlign: 'center',
    margin: 'auto',
    fontSize: 25,
    fontWeight: '500',
    backgroundColor: '#fff',
  },
});

export default MainProfilesScreen;
