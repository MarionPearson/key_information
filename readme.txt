----- Starting a new React Project -----

Components: NodeJS, ReactJS, WebPack, Babel, npm

Description of components:
1. NodeJS -- backend
2. ReactJS -- front end
3. WebPack -- App Bundler
4. Babel -- enables ES6 and compiles
5. npm -- module / package manager

Creating the directory:
1. Open Terminal
2. Navigate to project directory
3. npm -y init (starts new project, creates package.json)
4. create index.html, index.js

Boilerplate installs:
1. Babel: npm install babel-loader babel-core babel-preset-env babel-preset-react --save-dev
2. Webpack: npm install webpack --save-dev
            npm install webpack-cli --save-dev
3. ReactJS: npm install --save react react-dom
            npm install --save react

Minimal React Component (index.js):
    ReactDOM.render(
    <div>{title}</div>,
    document.getElementById('app')
    );

Webpack script in HTML (index.html):
  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>

Webpack and Babel in package.json:
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack-dev-server --config ./webpack.config.js --mode production"
    },
    "babel": {
        "presets": [
        "env",
        "react"
        ]
    },

Set up Webpack for babel-loader in webpack.config.js
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']

File Overview:
index.html : needs no explanation
index.js : entry point for the application as defined in package.json
package.json : json file created by node, configures app
webpack.config.js : Created by webpack, used to configure the bundle
bundle.js : bundle created by webpack

Webpack Commands :
found in package.json.scripts
npm run build --creates bundle.js
npm run develop --creates bundle.js 

Useful Links:
https://www.sitepoint.com/beginners-guide-webpack-module-bundling/
https://www.valentinog.com/blog/react-webpack-babel/
https://babeljs.io/docs/setup/#installation
https://www.robinwieruch.de/minimal-react-webpack-babel-setup/