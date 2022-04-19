import {ServerUrl} from './const.js';

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

export {getAds, sendData};
