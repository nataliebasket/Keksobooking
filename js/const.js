const ServerUrl = {
  GET_URL: 'https://25.javascript.pages.academy/keksobooking/data',
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

export {
  ServerUrl,
  Messages,
  AdsTypes,
  adTypesToReadable,
  adTypesToPrice,
  PriceRanges,
  FILE_TYPES,
  COUNT_OF_ADS,
  MAP_ZOOM,
  RERENDER_DELAY,
  MAIN_LOCATION,
  NUMBER_AFTER_POINT,
  MAX_PRICE_FOR_NIGHT,
  PRICE_STEP,
  DEFAULT_VALUE,
  ROOMS_GUESTS_OPTIONS
};
