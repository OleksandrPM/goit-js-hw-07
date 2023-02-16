import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

galleryEl.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  console.log(event.target.dataset.source);

  basicLightbox
    .create(
      `
		<img width="1400" height="900" src="${event.target.dataset.source}">
	`
    )
    .show();
}

function createGalleryMarkup(gallery) {
  return gallery.map(item => createItemMarkup(item)).join('');
}

function createItemMarkup({ preview, original, description }) {
  return `<div class="gallery__item">
      <a class="gallery__link" href="${original}" rel="noreferrer, noopener">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
}
