const path = require('path');

const srcPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'server/public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: './client',
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: publicPath,
    watchContentBase: true,
    watchOptions: {
      ignored: path.resolve(publicPath, 'images')
    },
    stats: 'minimal',
    proxy: {
      '/': {
        target: 'http://localhost:3001'
      }
    }
  }
};
