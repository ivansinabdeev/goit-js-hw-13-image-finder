export default function getRefs() {
  return {
    cardContainer: document.querySelector('.gallery'),
    searchForm: document.querySelector('.search-form'),

    hiddenElement: document.querySelector('.box'),
    loadMoreBtn: document.querySelector('.gallary-load-more'),
  };
}
