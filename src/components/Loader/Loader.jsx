import Loader from 'react-loader-spinner';
import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class LoaderApp extends Component {
  render() {
    return (
      <Loader
        className="Loader"
        type="ThreeDots"
        color="#00BFFF"
        height={80}
        width={80}
      />
    );
  }
}

export default LoaderApp;
