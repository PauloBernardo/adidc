const BASE_URL =
  'https://five1j3dne.execute-api.us-east-1.amazonaws.com/dev/agent/';

const ADD_COMPANY = `${BASE_URL}company`;
const LIST_COMPANY = `${BASE_URL}company`;
const STATUS_COMPANY = `${BASE_URL}company/{id}`;
const UPDATE_COMPANY = `${BASE_URL}company`;

const ADD_USER = `${BASE_URL}company/user`;
const GET_USER = `${BASE_URL}company/user`;
const UPDATE_USER = `${BASE_URL}company/user/{id}`;

const ADD_PRODUCT = `${BASE_URL}product`;
const UPDATE_PRODUCT = `${BASE_URL}product/{id}`;
const DELETE_PRODUCT = `${BASE_URL}product/{id}`;
const GET_PRODUCT = `${BASE_URL}product/{id}`;
const LIST_PRODUCT = `${BASE_URL}products`;
const LIST_SPECIFIC_PRODUCT = `${BASE_URL}products/requirement`;

const LIST_TIMELINE = `${BASE_URL}timelines`;
export const GET_TIMELINE = `${BASE_URL}timeline/{id}`;
export const ADD_TIMELINE = `${BASE_URL}timeline`;
export const ADD_TIMELINE_EVENT = `${BASE_URL}timeline/event`;
export const EDIT_TIMELINE = `${BASE_URL}timeline/{id}`;
export const LIST_TIMELINE_EVENTS = `${BASE_URL}timeline/events/{id}`;
export const DELETE_TIMELINE = `${BASE_URL}timeline/{id}`;
export const DELETE_TIMELINE_EVENT = `${BASE_URL}timeline/events/{id}`;

const ADD_ITEM = `${BASE_URL}item`;
const ADD_ITEM_BATCH = `${BASE_URL}item/batch`;
const CREATE_ITEM_EVENT = `${BASE_URL}item/event/{id}`;
const UPDATE_ITEM = `${BASE_URL}item/{id}`;
const DELETE_ITEM = `${BASE_URL}item/{id}`;
const GET_ITEM = `${BASE_URL}item/{id}`;
const GET_TRACK_ITEM = `${BASE_URL}item/track/{id}`;
const LIST_ITEM = `${BASE_URL}items/{id}`;
const LIST_SPECIFIC_ITEM = `${BASE_URL}items/requirement`;
const DEACTIVATE_ITEM = `${BASE_URL}item/deactivate/{id}`;
const CHECKOUT_ITEM = `${BASE_URL}item/checkout/{id}`;

const ADD_PACK = `${BASE_URL}pack`;
const CREATE_PACK_EVENT = `${BASE_URL}pack/event/{id}`;
const UPDATE_PACK = `${BASE_URL}pack/{id}`;
const DELETE_PACK = `${BASE_URL}pack/deactivate/{id}`;
const ADD_ITEM_PACK = `${BASE_URL}pack/{id}`;
const GET_PACK = `${BASE_URL}pack/{id}`;
const GET_TRACK_PACK = `${BASE_URL}pack/track/{id}`;
const LIST_PACK = `${BASE_URL}packs`;
const LIST_SPECIFIC_PACK = `${BASE_URL}packs/requirement`;
const DEACTIVATE_PACK = `${BASE_URL}pack/deactivate/{id}`;
const CHECKOUT_PACK = `${BASE_URL}pack/checkout/{id}`;

const ADD_PROMOTION = `${BASE_URL}promotion`;
const UPDATE_PROMOTION = `${BASE_URL}promotion`;
const ADD_ITEM_PROMOTION = `${BASE_URL}promotion/{id}`;
const DELETE_PROMOTION = `${BASE_URL}promotion/{id}`;
const GET_PROMOTION = `${BASE_URL}promotion/{id}`;
const LIST_PROMOTION = `${BASE_URL}promotions`;
const LIST_SPECIFIC_PROMOTION = `${BASE_URL}promotions/requirement`;

const READ_COMPANY_QRCODE = `${BASE_URL}qrcode/company/{id}`;
const READ_PRODUCT_QRCODE = `${BASE_URL}qrcode/product/{id}`;
const READ_ITEM_QRCODE = `${BASE_URL}qrcode/item/{id}`;
const READ_PACK_QRCODE = `${BASE_URL}qrcode/pack/{id}`;

export {
  BASE_URL,
  ADD_COMPANY,
  LIST_COMPANY,
  STATUS_COMPANY,
  UPDATE_COMPANY,
  ADD_USER,
  GET_USER,
  UPDATE_USER,
  ADD_ITEM,
  ADD_ITEM_PROMOTION,
  ADD_PACK,
  ADD_PRODUCT,
  ADD_PROMOTION,
  CHECKOUT_ITEM,
  CHECKOUT_PACK,
  CREATE_ITEM_EVENT,
  ADD_ITEM_PACK,
  CREATE_PACK_EVENT,
  DEACTIVATE_ITEM,
  DEACTIVATE_PACK,
  DELETE_ITEM,
  DELETE_PACK,
  DELETE_PRODUCT,
  DELETE_PROMOTION,
  GET_ITEM,
  GET_PACK,
  GET_PRODUCT,
  GET_PROMOTION,
  GET_TRACK_ITEM,
  GET_TRACK_PACK,
  LIST_ITEM,
  LIST_PACK,
  LIST_PRODUCT,
  LIST_PROMOTION,
  LIST_SPECIFIC_ITEM,
  LIST_SPECIFIC_PACK,
  LIST_SPECIFIC_PRODUCT,
  LIST_TIMELINE,
  LIST_SPECIFIC_PROMOTION,
  READ_COMPANY_QRCODE,
  READ_ITEM_QRCODE,
  READ_PACK_QRCODE,
  READ_PRODUCT_QRCODE,
  UPDATE_ITEM,
  UPDATE_PACK,
  UPDATE_PRODUCT,
  UPDATE_PROMOTION,
  ADD_ITEM_BATCH,
};
