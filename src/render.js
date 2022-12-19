import { refs } from "./refs";

function createCardTemplate({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return `
    <a class='gallery-link' href='${largeImageURL}'>
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        
        <div class="info">
            <p class="info-item">
            <b>Likes: ${likes}</b>
            </p>
            <p class="info-item">
            <b>Views: ${views}</b>
            </p>
            <p class="info-item">
            <b>Comments: ${comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads: ${downloads}</b>
            </p>
        </div>              
    </a>`
};

export function renderCards(items) {
    const markup = items.map(createCardTemplate).join('');
    return refs.gallery.insertAdjacentHTML('beforeend', markup)
};