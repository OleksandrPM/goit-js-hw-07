import { galleryItems } from './gallery-items.js';
// Change code below this line

const closeModalKey = 'Escape';

const galleryEl = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

galleryEl.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  const isImage = event.target.classList.contains('gallery__image');

  if (!isImage) {
    return;
  }

  const bigImageURL = event.target.dataset.source;

  const instance = createLightboxInstance(bigImageURL);

  instance.show();

  closeInstanceByKey(instance, closeModalKey);
}

function closeInstanceByKey(instance, keyName) {
  if (instance.visible()) {
    document.addEventListener('keydown', event => {
      const pressedKey = event.key;

      if (pressedKey === keyName) {
        instance.close();
        document.removeEventListener('keydown', event);
      }
    });
  }
}

function createLightboxInstance(URL) {
  return basicLightbox.create(
    `
		<img width="1400" height="900" src="${URL}">
	`
  );
}

function createGalleryMarkup(gallery) {
  return gallery.map(item => createItemMarkup(item)).join('');
}

function createItemMarkup({ preview, original, description }) {
  return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
}
