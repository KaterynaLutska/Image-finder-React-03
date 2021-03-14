import { Component } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';

class ImageGallery extends Component {
  state = {
    largeImageURL: '',
    showModal: false,
  };

  onClickModal = largeImageURL => {
    this.toggleModal();
    this.setState({ largeImageURL: largeImageURL });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { image } = this.props;
    const { largeImageURL } = this.state;

    return (
      <ul className="ImageGallery">
        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImageURL} alt="alt" />
          </Modal>
        )}
        {image.map(el => (
          <ImageGalleryItem
            key={el.id}
            id={el.id}
            tags={el.tags}
            onImgClick={this.onClickModal}
            webformatURL={el.webformatURL}
            largeImageURL={el.largeImageURL}
          ></ImageGalleryItem>
        ))}
      </ul>
    );
  }
}
export default ImageGallery;

ImageGallery.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string.isRequired,
    }),
  ),
  onClickModal: PropTypes.func,
};
