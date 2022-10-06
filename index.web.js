import { AppRegistry } from 'react-native';

import App from './src/App';
import app from './app.json';

/********** Start react-native-vector-icons config **********/
import Ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';

const IoniconsStyles = `@font-face {
  src: url(${Ionicons});
  font-family: Ionicons;
}`;

const style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
  style.styleSheet.cssText = IoniconsStyles;
} else {
  style.appendChild(document.createTextNode(IoniconsStyles));
}

document.head.appendChild(style);
/********** End react-native-vector-icons config **********/

if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent(app.name, () => App);

AppRegistry.runApplication(app.name, {
  initialProps: {},
  rootTag: document.getElementById('root')
});
