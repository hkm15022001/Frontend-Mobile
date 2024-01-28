// Source code: https://stackoverflow.com/a/44192714

let BACKEND_API_URL, PUBLIC_KEY, BACKEND_API_ORDER_IMAGE_URL,BACKEND_API_USER_IMAGE_URL,BACKEND_API_SHIP_IMAGE_URL;
if (__DEV__ === true) {
  BACKEND_API_URL = 'https://api.innoway.vn/app';
  BACKEND_API_ORDER_IMAGE_URL='https://api.innoway.vn/app/scem-user/api/images/'
  BACKEND_API_USER_IMAGE_URL='https://api.innoway.vn/app/scem-order/api/images/'
  BACKEND_API_SHIP_IMAGE_URL='https://api.innoway.vn/app/scem-ship/api/images/'
  PUBLIC_KEY = '';
} else {
  BACKEND_API_URL = 'https://api.innoway.vn/app';
  BACKEND_API_ORDER_IMAGE_URL='https://api.innoway.vn/app/scem-user/api/images/'
  BACKEND_API_USER_IMAGE_URL='https://api.innoway.vn/app/scem-order/api/images/'
  PUBLIC_KEY = '';
}

export {BACKEND_API_URL, PUBLIC_KEY, BACKEND_API_ORDER_IMAGE_URL,BACKEND_API_USER_IMAGE_URL,BACKEND_API_SHIP_IMAGE_URL};
