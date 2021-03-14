import './App.css';
import { Component } from 'react';

import Container from './components/Container';
import services from './components/services';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import LoaderApp from './components/Loader';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    error: null,
    isLoading: false,
    isLastPage: false,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    if (this.state.images.length > 12) {
      window.scrollBy({
        top: window.innerHeight - 180,
        behavior: 'smooth',
      });
    }
  }

  onChangeQuery = data => {
    this.setState({
      searchQuery: data,
      currentPage: 1,
      images: [],
      error: null,
      totalImage: 0,
    });
  };
  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;
    const options = {
      searchQuery,
      currentPage,
    };
    this.setState({ isLoading: true });
    services
      .fetchImages(options)
      .then(response => {
        this.setState({ totalImage: response.data.total });
        this.lastPage();
        return response.data.hits;
      })
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState({
          isLoading: false,
        }),
      );
  };

  lastPage = () => {
    const { totalImage, currentPage } = this.state;

    if (currentPage === Math.ceil(totalImage / 12)) {
      this.setState({
        isLastPage: true,
      });
    } else {
      this.setState({
        // isLoading: false,
        isLastPage: false,
      });
    }
  };

  render() {
    const { isLastPage, isLoading, error, images } = this.state;

    return (
      <div className="App">
        <Container>
          <Searchbar onSubmit={this.onChangeQuery}></Searchbar>
          {error && <h1>Error</h1>}
          <ImageGallery image={this.state.images}></ImageGallery>
          {isLoading && <LoaderApp />}
          {!isLastPage && images.length > 0 && (
            <Button onClick={this.fetchImages} />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
