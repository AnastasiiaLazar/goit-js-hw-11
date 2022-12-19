import './css/styles.css';
import Notiflix from 'notiflix';
import { refs } from './refs';
import { fetchImages } from './getImages';
import { renderCards } from './render';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let query = '';
let pageEl = 1;
let per_pageEl = 40;
let totalItems = '';


refs.form.addEventListener('submit', onSearchBtnSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

fetchImages(query, pageEl, per_pageEl).then(data => { return data.hits });


async function onSearchBtnSubmit(e) {
    e.preventDefault();
    loadMoreBtnHide();
    const inputValue = e.target.elements.searchQuery.value.trim();

    if (inputValue === '') {
        clearRender();
        return
    };

    if (inputValue !== query) {
        clearRender();
        query = inputValue;
        pageEl = 1;
    };

    
    await fetchImages(query, pageEl, per_pageEl).then(data => {
        if (data.hits.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        } else {
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            renderCards(data.hits);
        };
        totalItems = data.totalHits;
        lightbox.refresh();
        if ((totalItems / per_pageEl) > pageEl) {
            loadMoreBtnShow();
        } else if (data.hits.length > 0){
            loadMoreBtnHide();
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
    });   
    console.log(pageEl)
};

async function onLoadMoreBtnClick() {
    pageEl += 1;
    if ((totalItems / per_pageEl) > pageEl ) {
            loadMoreBtnShow();
        } else {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtnHide();           
        }
    await fetchImages(query, pageEl, per_pageEl).then(data => {
        renderCards(data.hits);
        lightbox.refresh();
    });
    console.log(pageEl)
}


function loadMoreBtnHide() {
    refs.loadMoreBtn.classList.add('is-hidden');
}

function loadMoreBtnShow() {
    refs.loadMoreBtn.classList.remove('is-hidden');
}

function clearRender() {
    refs.gallery.innerHTML = '';
}