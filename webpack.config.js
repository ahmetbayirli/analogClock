const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "src", "clockDemo.tsx"),
  output: {
    path:path.resolve(__dirname, "demo"),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
},
  module: {
    rules: [
      {
        test: /\.?tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ['@babel/env','@babel/preset-react', "@babel/preset-typescript"] },
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "output.html"),
    }),
  ],
}