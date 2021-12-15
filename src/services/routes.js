const BASE_URL = 'http://localhost:5000';

const GET_CAMERAS = `${BASE_URL}/cameras`;
const GET_ALERTS = `${BASE_URL}/alerts`;
const GET_USER = `${BASE_URL}/user`;
const POST_USER = `${BASE_URL}/user`;
const PUT_USER = `${BASE_URL}/user/{id}`;
const POST_LOGIN = `${BASE_URL}/login`;

export { BASE_URL, GET_USER, GET_CAMERAS, GET_ALERTS, PUT_USER, POST_LOGIN, POST_USER };
