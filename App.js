/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider, Layout, IconRegistry } from 'react-native-ui-kitten'

import { EvaIconsPack } from '@ui-kitten/eva-icons'

import { Provider } from 'react-redux'
import Store from './src/Redux/store'

import Navigator from './src/Navigator'

class App extends Component {

  render(){
    return(
      <>
        {/* <StatusBar barStyle="dark-content" /> */}
        <Provider store={Store}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <Navigator />
          </ApplicationProvider>
        </Provider>
      </>
    )
  }
}

export default App;
