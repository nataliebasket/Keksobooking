/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./js/util.js
// Склонение существительных после числительного
const getWordEnd = (n, form1, form2, form3) => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) {
    return form3;
  }
  if (n1 > 1 && n1 < 5) {
    return form2;
  }
  if (n1 === 1) {
    return form1;
  }
  return form3;
};

const getIsEscape = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = '300px';
  alertContainer.style.right = '50%';
  alertContainer.style.transform = 'translateX(50%)';
  alertContainer.style.top = '55px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '12px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ffaa99';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 2000);
};

// Функция debounce - устранения дребезга
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(undefined, rest), timeoutDelay);
  };
};



;// CONCATENATED MODULE: ./js/const.js
const ServerUrl = {
  GET_URL: './data/data.json',
  POST_URL: 'https://25.javascript.pages.academy/keksobooking',
};

const Messages = {
  GET_NO_ADS: 'Не удалось получить данные с сервера :(',
  FIND_NO_ADS: 'Не удалось найти подходящие объявления',
};

const DEFAULT_VALUE = 'any';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const COUNT_OF_ADS = 10;
const MAP_ZOOM = 13;
const RERENDER_DELAY = 500;
const NUMBER_AFTER_POINT = 5;
const MAX_PRICE_FOR_NIGHT = 100000;
const PRICE_STEP = 100;

const AdsTypes = {
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
  HOTEL: 'hotel',
  ANY: 'any',
};

const adTypesToReadable = {
  [AdsTypes.PALACE]: 'Дворец',
  [AdsTypes.FLAT]: 'Квартира',
  [AdsTypes.HOUSE]: 'Дом',
  [AdsTypes.BUNGALOW]: 'Бунгало',
  [AdsTypes.HOTEL]: 'Отель',
};

const adTypesToPrice = {
  [AdsTypes.PALACE]: 10000,
  [AdsTypes.FLAT]: 1000,
  [AdsTypes.HOUSE]: 5000,
  [AdsTypes.BUNGALOW]: 0,
  [AdsTypes.HOTEL]: 3000,
};

const MAIN_LOCATION = {
  lat: 35.675178,
  lng: 139.748876,
};

const PriceRanges = {
  ANY: {
    minprice : 0,
    maxprice : 100000,
  },
  MIDDLE: {
    minprice : 10001,
    maxprice : 50000,
  },
  LOW: {
    minprice : 0,
    maxprice : 10000,
  },
  HIGH: {
    minprice : 50001,
    maxprice : 100000,
  },
};


const ROOMS_GUESTS_OPTIONS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};



;// CONCATENATED MODULE: ./js/popup.js



const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPhotoElements = (photoArray, parentElement) => {
  photoArray.forEach((photo) => {
    const photoTemplate = parentElement.children[0].cloneNode(true);
    photoTemplate.src = photo;
    parentElement.append(photoTemplate);
  });
  parentElement.children[0].remove();
};

const createFeatureElements = (list, featuresArray) => {
  list.forEach((listItem) => {
    const isExists = featuresArray.some((userFeature) =>
      listItem.classList.contains(`popup__feature--${userFeature}`),
    );
    if (!isExists) {listItem.remove();}
  });
};

const checkAvailableData = (key, element) => {
  if (!key) {
    element.remove();
  }
};

const createPopup = ({offer, author}) => {
  const adElement = similarAdTemplate.cloneNode(true);

  const adTitle = adElement.querySelector('.popup__title');
  const adAddress = adElement.querySelector('.popup__text--address');
  const adPrice = adElement.querySelector('.popup__text--price');
  const adType = adElement.querySelector('.popup__type');
  const adCapacity = adElement.querySelector('.popup__text--capacity');
  const adTime = adElement.querySelector('.popup__text--time');
  const adDescription = adElement.querySelector('.popup__description');
  const adAvatar = adElement.querySelector('.popup__avatar');
  const adFeatures = adElement.querySelector('.popup__features');
  const featuresList = adElement.querySelectorAll('.popup__feature');
  const adPhotos = adElement.querySelector('.popup__photos');

  adTitle.textContent = offer.title;
  adAddress.textContent = offer.address;
  adPrice.textContent = `${offer.price} ₽/ночь`;
  adType.textContent = adTypesToReadable[offer.type];
  adCapacity.textContent = `${offer.rooms} ${getWordEnd(offer.rooms, 'комната', 'комнаты', 'комнат')} для ${offer.guests} ${getWordEnd(offer.guests, 'гостя', 'гостей', 'гостей')}`;
  adTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  adDescription.textContent = offer.description;
  adAvatar.src = author.avatar;

  checkAvailableData(offer.title, adTitle);
  checkAvailableData(offer.address, adAddress);
  checkAvailableData(offer.price, adPrice);
  checkAvailableData(offer.type, adType);
  checkAvailableData(offer.rooms, adCapacity);
  checkAvailableData(offer.checkin, adTime);
  checkAvailableData(offer.description, adDescription);
  checkAvailableData(author.avatar, adAvatar);


  if (offer.features) {
    createFeatureElements(featuresList, offer.features);
  } else {
    adFeatures.remove();
  }

  if (offer.photos) {
    createPhotoElements(offer.photos, adPhotos);
  } else {
    adPhotos.remove();
  }

  return adElement;
};




;// CONCATENATED MODULE: ./js/api.js


const getAds = async (onError) => {
  let response;
  try {
    response = await fetch(
      ServerUrl.GET_URL,
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    );
  }
  catch (err) {
    onError();
    return [];
  }

  const allAds = await response.json();
  return allAds;
};

const sendData = (body, reset, onSuccess, onError) => {
  fetch(
    ServerUrl.POST_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        reset();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};



;// CONCATENATED MODULE: ./js/form-switcher.js
const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFilterFieldsets = mapFilter.querySelectorAll('fieldset');
const mapFilterSelects = mapFilter.querySelectorAll('select');

const disableForm= (isDisabled) => {
  adForm.classList.toggle('ad-form--disabled', isDisabled);
  adFormFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });
};

const disableMapFilters= (isDisabled) => {
  mapFilter.classList.toggle('map__filters--disabled', isDisabled);
  mapFilterSelects.forEach((item) => {
    item.disabled = isDisabled;
  });
  mapFilterFieldsets.forEach((item) => {
    item.disabled = isDisabled;
  });
};



;// CONCATENATED MODULE: ./js/filter.js


const typeSelector = document.querySelector('#housing-type');
const priceSelector = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');

// const getSelectCheckboxes = () => Array.from(document.querySelectorAll('input[name="features"]:checked')).map((cb) => cb.value);
const getSelectCheckboxes = () => Array.from(document.querySelectorAll('input[name="features"]:checked'), (cb) => cb.value);

const checkType = (obj, value) => value === AdsTypes.ANY || value === obj.offer.type;
const checkPrice = (obj, price) => obj.offer.price <= PriceRanges[price.toUpperCase()].maxprice && obj.offer.price >= PriceRanges[price.toUpperCase()].minprice;
const checkRooms = (obj, value) => value === DEFAULT_VALUE || value === String(obj.offer.rooms);
const checkGuests = (obj, value) => value === DEFAULT_VALUE || value === String(obj.offer.guests);

const checkFeatures = (obj) => {
  const adFeatures = obj.offer.features;
  const selectFeatures = getSelectCheckboxes();
  if (selectFeatures.length === 0) {
    return true;
  }
  if (adFeatures){
    return selectFeatures.every((feature) => adFeatures.includes(feature));
  }
  return false;
};

const checkAllFilters = (object) => {
  const type = typeSelector.value;
  const price = priceSelector.value;
  const rooms = roomsFilter.value;
  const guests = guestsFilter.value;

  return checkType(object, type) && checkPrice(object, price) && checkRooms(object, rooms) && checkGuests(object, guests) && checkFeatures(object);
};




;// CONCATENATED MODULE: ./js/map.js
// import L from '../leaflet/leaflet.js';







const allAds = [];

const mainPinLocation = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const similarPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],

});

const getLocationToString = (obj, number) => {
  let {lat, lng} = obj;
  lat = Number(lat.toFixed(number));
  lng = Number(lng.toFixed(number));
  return `${lat}, ${lng}`;
};


const map = L.map('map-canvas')
  .on('load', () => {
    disableForm(false);
  })
  .setView(MAIN_LOCATION, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Добавление главной метки на карту
const mainPinMarker = L.marker(
  MAIN_LOCATION,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);
mainPinLocation.value = getLocationToString(mainPinMarker.getLatLng(), NUMBER_AFTER_POINT);

mainPinMarker.on('moveend', (evt) => {
  mainPinLocation.value = getLocationToString(evt.target.getLatLng(), NUMBER_AFTER_POINT);
});


const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const marker = L.marker(
    {
      lat: ad.location.lat,
      lng: ad.location.lng,
    },
    {
      icon: similarPinIcon,
    }
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createPopup(ad));
};

const resetMainPin = () => {
  mainPinMarker.setLatLng(MAIN_LOCATION);
  map.setView(MAIN_LOCATION, MAP_ZOOM);
  map.closePopup();
};


(async () => {
  const fetchedAds = await getAds(() => showAlert(`${Messages.GET_NO_ADS}`));
  allAds.push(...fetchedAds);
  allAds.slice(0, COUNT_OF_ADS).forEach((ad) => {
    createMarker(ad);
    disableMapFilters(false);
  });
})();


const filterAd = () => {
  markerGroup.clearLayers();
  const filteredAds = allAds.filter((ad) => checkAllFilters(ad));
  filteredAds.slice(0, COUNT_OF_ADS).forEach((ad) => {
    createMarker(ad);
  });

  if (filteredAds.length <= 0) {
    showAlert(`${Messages.FIND_NO_ADS}`);
  }
};

filterForm.addEventListener('change', debounce(filterAd, RERENDER_DELAY));



;// CONCATENATED MODULE: ./js/form-validator.js


const form_validator_form = document.querySelector('.ad-form');
const adPrice = document.querySelector('#price');
const adType = document.querySelector('#type');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const adTimeInOut = document.querySelector('.ad-form__element--time');


const pristine = window.Pristine(form_validator_form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__item--invalid',
  successClass: 'ad-form__item--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});


// Валидация цены и типа жилья
const validateAdPrice = (value) => value >= adTypesToPrice[adType.value] && value <= MAX_PRICE_FOR_NIGHT;
const getAdTypeErrorMessage = () => `Минимальная цена за ночь: ${adTypesToPrice[adType.value]}`;

pristine.addValidator(
  adPrice,
  validateAdPrice,
  getAdTypeErrorMessage
);

const onAdTypeChange = () => {
  adPrice.min = adTypesToPrice[adType.value];
  adPrice.placeholder =  adTypesToPrice[adType.value];
  if (adPrice.value) {
    pristine.validate(adPrice);
  }
};

adType.addEventListener('change', onAdTypeChange);

// Валидация количества комнат и гостей
const validateDelivery = () => ROOMS_GUESTS_OPTIONS[roomNumber.value].includes(capacity.value);
const getDeliveryErrorMessage = () => 'Выберите другое кол-во гостей :)';

pristine.addValidator(
  capacity,
  validateDelivery,
  getDeliveryErrorMessage
);

roomNumber.addEventListener('change', () => {
  pristine.validate(capacity);
});

// Валидация времени заезда и выезда
const onTimeInOutChange = (evt) => {
  timeIn.value = timeOut.value = evt.target.value;
};

adTimeInOut.addEventListener('change', onTimeInOutChange);



;// CONCATENATED MODULE: ./js/slider.js
// import noUiSlider from '../nouislider/nouislider.js';




const sliderPrice = document.querySelector('.ad-form__slider');
const slider_adType = document.querySelector('#type');

noUiSlider.create(sliderPrice, {
  range: {
    min: adTypesToPrice[slider_adType.value],
    max: MAX_PRICE_FOR_NIGHT,
  },
  start: adPrice.placeholder,
  step: PRICE_STEP,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const resetSlider = () => {
  sliderPrice.noUiSlider.reset();
};

sliderPrice.noUiSlider.on('slide', () => {
  adPrice.value = sliderPrice.noUiSlider.get();
  pristine.validate(adPrice);
});

slider_adType.addEventListener('change', () => {
  sliderPrice.noUiSlider.updateOptions({
    range: {
      min: adTypesToPrice[slider_adType.value],
      max: MAX_PRICE_FOR_NIGHT,
    },
    start: adTypesToPrice[slider_adType.value],
  });
});



;// CONCATENATED MODULE: ./js/errors.js


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



;// CONCATENATED MODULE: ./js/form.js









const form_adForm = document.querySelector('.ad-form');
const form_mainPinLocation = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');
const form_filterForm = document.querySelector('.map__filters');

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
  form_adForm.reset();
  form_filterForm.reset();
  filterAd();
  resetAllPhoto();
  form_mainPinLocation.value = getLocationToString(MAIN_LOCATION, NUMBER_AFTER_POINT);
  resetMainPin();
  resetSlider();
};

const onClickResetButton = (evt) => {
  resetForm(evt);
};

resetButton.addEventListener('click', onClickResetButton);

form_adForm.addEventListener('submit', (evt) => {
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

;// CONCATENATED MODULE: ./js/main.js









/******/ })()
;