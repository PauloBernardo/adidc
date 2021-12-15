import Axios from 'axios';
import { Auth } from 'aws-amplify';

export const apiGET = async (route, data, token) => {
  try {
    const response = await Axios.get(route, {
      headers: {
        'x-access-token': token,
      },
      params: {
        ...data,
      },
    });
    console.log('GET -', route, '-', response.status);
    return {
      has_error: response.status !== 200,
      ...response,
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
    // const session = await Auth.currentSession();
    const response = await Axios.post(route, data, {
      // headers: {
      //   Authorization: session.getIdToken().getJwtToken(),
      // },
    });

    console.log('POST -', route, '-', response.status, response);
    return {
      has_error: response.status !== 200,
      ...response,
    };
  } catch (error) {
    console.log('POST -', route, '-', error);
    return {
      has_error: true,
      error,
    };
  }
};

export const apiDELETE = async (route, data) => {
  try {
    const session = await Auth.currentSession();
    const response = await Axios.delete(route, {
      headers: {
        AccessToken: session.getAccessToken().getJwtToken(),
        Authorization: session.getIdToken().getJwtToken(),
      },
      params: { ...data },
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
      route,
      { ...data },
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
      route,
      { ...data },
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
