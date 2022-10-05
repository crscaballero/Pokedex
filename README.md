# Pokedex

### Resources
- Built this project
    To build this project withouth expo *and* using react-native-web, is necessary create it using `npx react-native init Pokedex --template react-native-template-typescript@6.9.6`, this is because we want to use TypeScript and react<18v, because react-native-web is not compatible with versions 18 or above (yet) following by the steps on [this guide](https://javascript.plainenglish.io/how-to-integrate-react-native-web-existing-react-native-apps-8e4964ad2f0b), make sure to replace the `index.web.js` in the webpack config for `index.js`

Troubleshooting
- If you have troubles with the tabs, check this https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/

To build on Windows SO you are going to need to install `npm install -g win-node-env`
