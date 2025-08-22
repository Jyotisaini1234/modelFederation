import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackPkg, { Configuration } from 'webpack';  // Default import
const { container } = webpackPkg;                     // Destructure CommonJS module
const { ModuleFederationPlugin } = container;

const config: Configuration = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    static: path.join(process.cwd(), 'dist'),
    port: 3002,
  },
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { presets: ['@babel/preset-react'] },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/App.tsx' },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
}as any

export default config;
