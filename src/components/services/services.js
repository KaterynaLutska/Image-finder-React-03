import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
let key = '20640167-ac9474fef7102afb7f97f325e';

const fetchImages = ({ searchQuery = '', currentPage = 1 }) => {
  return axios.get(
    `/?q=${searchQuery}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=12&key=${key}`,
  );
};

export default { fetchImages };
