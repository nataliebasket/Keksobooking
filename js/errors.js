import {getIsEscape} from './util.js';

const mainDocument = document.querySelector('body');

const openMessage = (template, isCloseButton) => {
  const templateElement = template.cloneNode(true);
  const submitButton = document.querySelector('.ad-form__submit');
  mainDocument.appendChild(templateElement);
  const onKeyDown = (evt) => {
    if (getIsEscape(evt)) {
      evt.preventDefault();
      templateElement.remove();
      mainDocument.removeEventListener('keydown', onKeyDown);
      submitButton.disabled = false;
    }
  };

  mainDocument.addEventListener('keydown', onKeyDown);
  templateElement.tabIndex = 1;
  templateElement.focus();

  templateElement.addEventListener('click', () => {
    templateElement.remove();
    mainDocument.removeEventListener('keydown', onKeyDown);
    submitButton.disabled = false;
  });

  if (isCloseButton) {
    const closeButton = templateElement.querySelector('[type="button"]');
    closeButton.focus();
    closeButton.addEventListener('click', () => {
      templateElement.remove();
      mainDocument.removeEventListener('keydown', onKeyDown);
      submitButton.disabled = false;
    });
  }
};

export {openMessage};
