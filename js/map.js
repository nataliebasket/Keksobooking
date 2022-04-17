import {createPopup} from './popup.js';
import {getAds} from './api.js';
import {disableForm, disableMapFilters} from './form-switcher.js';
import {debounce, showAlert} from './util.js';
import {checkAllFilters} from './filter.js';
import {COUNT_OF_ADS, MAP_ZOOM, RERENDER_DELAY, MAIN_LOCATION, NUMBER_AFTER_POINT, Messages} from './const.js';

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

export {resetMainPin, getLocationToString, mainPinLocation, filterAd};
