import {AdsTypes, PriceRanges, DEFAULT_VALUE} from './const.js';

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


export {checkAllFilters};
