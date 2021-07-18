import getRefs from './getRefs';
import imagesCardTpl from '../templates/images_card.hbs';
import API from './apiService';

const refs = getRefs();

function scrollToTheFirstPicture() {
  const images = refs.cardContainer.querySelectorAll('.gallery-item');
  const imageCount = images.length;
  const firstPictureIndex = imageCount - 11;
  const firstPicture = images[firstPictureIndex - 1];

  firstPicture.scrollIntoView({ inline: 'nearest', behavior: 'smooth' });
}

let searchQuery;
const onSearch = async e => {
  e.preventDefault();
  //сообщает User agent, что если событие не обрабатывается явно,
  //его действие по умолчанию не должно выполняться так, как обычно
  const isForm = e.target.id === 'search-form';
  if (isForm) {
    const form = e.currentTarget;
    //Определяет элемент, в котором в данный момент обрабатывается событие
    searchQuery = form.elements.query.value;
  }

  try {
    const response = await API.fetchImage(searchQuery);
    renderImageCard(response, isForm);
    renderLoadMoreBtn(response);
    scrollToTheFirstPicture();
  } catch (error) {
    console.log(error);
  }
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onSearch);

function renderImageCard(response, isForm) {
  //   console.log(response.total);
  const markup = imagesCardTpl(response);
  const shouldExtend = !isForm;
  if (shouldExtend) {
    refs.cardContainer.innerHTML += markup;
  } else {
    refs.cardContainer.innerHTML = markup;
  }
}

function renderLoadMoreBtn(response) {
  const imageCount = refs.cardContainer.querySelectorAll('.gallery-item').length;
  const shouldDisplayLoadMoreBtn = imageCount < response.total;
  if (shouldDisplayLoadMoreBtn) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}

// refs.loadMoreBtn.addEventListener('click', scrollToTheFirstPicture);

//imageCount - 11;
