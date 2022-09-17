import {AppRegistry} from 'react-native';

import App from './src/App';
// import name from './app.json';

if (module.hot) {
    module.hot.accept();
}
AppRegistry.registerComponent('React Native Web', () => App);

AppRegistry.runApplication('React Native Web', {
    initialProps: {},
    rootTag: document.getElementById('app-root'),
});
