const BASE_URL = 'https://pixabay.com/api';
const KEY = '22385863-ab509129ff5717a9471438652';

let pageNumber = 0;
let lastSearchQuery;

function fetchImage(searchQuery) {
  if (lastSearchQuery !== searchQuery) {
    pageNumber = 1;
  } else {
    pageNumber += 1;
  }

  return fetch(
    `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${KEY}`,
  ).then(response => {
    lastSearchQuery = searchQuery;
    return response.json();
  });
}

export default {
  fetchImage,
};
