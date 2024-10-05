import axios from "axios";
import { baseUrl, createHeader } from "./Constant";
export const fetchBestSellingProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/product/bestSelling`);
    const { data } = response.data;
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};
export const fetchSearchResult = async (searchQuery, page) => {
  try {
    const response = await axios.get(
      `${baseUrl}/product/search?key=${searchQuery}&page=${page}`
    );
    const { data, totalPages, currentPage } = response.data;
    return { success: true, data: data, totalPages, currentPage };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const userSignIn = async (userInformation) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/signIn`,
      userInformation
    );
    const { data } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const userSignUp = async (userInformation) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/signUp`,
      userInformation
    );
    const { data } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const fetchProductFromCart = async (token) => {
  try {
    const headers = createHeader(token);
    const response = await axios.get(`${baseUrl}/cart/fetchCart`, { headers });
    const { data } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const deleteCartItem = async (token, cartItemId) => {
  const headers = createHeader(token);
  try {
    await axios.patch(
      `${baseUrl}/cart/removeItem`,
      { cartItemId },
      { headers }
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const updateCartProduct = async (token, cartCustomizationDetails) => {
  try {
    const headers = createHeader(token);
    await axios.patch(
      `${baseUrl}/cart/updateCartProduct`,
      cartCustomizationDetails,
      { headers }
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const fetchFavouritesProduct = async (token, favourites) => {
  try {
    const headers = createHeader(token);
    const response = await axios.get(`${baseUrl}/cart/fetchFavourites`, {
      params: {
        favourites,
      },
      headers,
    });
    const { data } = response.data;
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};
