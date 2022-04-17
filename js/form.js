import {pristine} from'./form-validator.js';
import './slider.js';
import {resetSlider} from './slider.js';
import {getLocationToString, resetMainPin, filterAd} from './map.js';
import {sendData} from './api.js';
import {openMessage} from './errors.js';
import {FILE_TYPES, NUMBER_AFTER_POINT, MAIN_LOCATION} from './const.js';


const adForm = document.querySelector('.ad-form');
const mainPinLocation = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');
const filterForm = document.querySelector('.map__filters');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');

const resetAllPhoto = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
};

const resetForm = (evt) => {
  evt.preventDefault();
  pristine.reset();
  adForm.reset();
  filterForm.reset();
  filterAd();
  resetAllPhoto();
  mainPinLocation.value = getLocationToString(MAIN_LOCATION, NUMBER_AFTER_POINT);
  resetMainPin();
  resetSlider();
};

const onClickResetButton = (evt) => {
  resetForm(evt);
};

resetButton.addEventListener('click', onClickResetButton);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    sendData(new FormData(evt.target),
      () => resetForm(evt),
      () => openMessage(successTemplate, false),
      () => openMessage(errorTemplate, true),
    );
    submitButton.disabled = true;
  }
});


avatarChooser.addEventListener('change', () => {
  const [avatar] = avatarChooser.files;
  const fileName = avatar.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(avatar);
  }
});

photoChooser.addEventListener('change', () => {
  const [photo] = photoChooser.files;
  const photoName = photo.name.toLowerCase();

  const matchTypes = FILE_TYPES.some((it) => photoName.endsWith(it));

  if (matchTypes) {
    photoPreview.innerHTML = `<img src="${URL.createObjectURL(photo)}" width="70" height="70">`;
  }

});
