import Axios from 'axios';
import { Auth } from 'aws-amplify';

const BASE_ROUTE = 'http://192.168.40.179:5000/';

export const apiGET = async (route, data) => {
  try {
    const session = await Auth.currentSession();
    const response = await Axios.get(`${BASE_ROUTE}get`, {
      headers: {
        Authorization: session.getIdToken().getJwtToken(),
      },
      params: {
        route,
        ...data,
      },
    });
    console.log('GET -', route, '-', response.status);
    return {
      has_error: response?.data?.has_error || false,
      response,
    };
  } catch (error) {
    console.log('GET -', route, '-', error?.response?.status);
    return {
      has_error: true,
      error,
    };
  }
};

export const apiPOST = async (route, data) => {
  try {
    const session = await Auth.currentSession();
    const response = await Axios.post(
      `${BASE_ROUTE}post`,
      { ...data, route },
      {
        headers: {
          Authorization: session.getIdToken().getJwtToken(),
        },
      }
    );
    console.log('POST -', route, '-', response.status);
    return {
      has_error: response?.data?.has_error || false,
      response,
    };
  } catch (error) {
    console.log('POST -', route, '-', error?.response?.status);
    return {
      has_error: true,
      error,
    };
  }
};

export const apiDELETE = async (route, data) => {
  try {
    const session = await Auth.currentSession();
    const response = await Axios.delete(`${BASE_ROUTE}delete`, {
      headers: {
        AccessToken: session.getAccessToken().getJwtToken(),
        Authorization: session.getIdToken().getJwtToken(),
      },
      params: { ...data, route },
    });
    console.log('DELETE -', route, '-', response.status);
    return {
      has_error: response?.data?.has_error || false,
      response,
    };
  } catch (error) {
    console.log('DELETE -', route, '-', error?.response?.status);
    return {
      has_error: true,
      error,
    };
  }
};

export const apiPUT = async (route, data) => {
  try {
    const session = await Auth.currentSession();
    const response = await Axios.put(
      `${BASE_ROUTE}put`,
      { ...data, route },
      {
        headers: {
          Authorization: session.getIdToken().getJwtToken(),
        },
      }
    );
    console.log('PUT -', route, '-', response.status);
    return {
      has_error: response?.data?.has_error || false,
      response,
    };
  } catch (error) {
    console.log('PUT -', route, '-', error?.response?.status);
    return {
      has_error: true,
      error,
    };
  }
};

export const apiPATCH = async (route, data) => {
  try {
    const session = await Auth.currentSession();
    const response = await Axios.patch(
      `${BASE_ROUTE}patch`,
      { ...data, route },
      {
        headers: {
          Authorization: session.getIdToken().getJwtToken(),
        },
      }
    );
    console.log('PATCH -', route, '-', response.status);
    return {
      has_error: response?.data?.has_error || false,
      response,
    };
  } catch (error) {
    console.log('PATCH -', route, '-', error?.response?.status);
    return {
      has_error: true,
      error,
    };
  }
};
