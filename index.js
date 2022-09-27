import { AppRegistry } from 'react-native';

import App from './src/App';
import app from './app.json';

// if (module.hot) {
//     module.hot.accept();
// }

AppRegistry.registerComponent(app.name, () => App);

// AppRegistry.runApplication(app.name, {
//     // initialProps: {},
//     rootTag: document.getElementById("root")
// });
