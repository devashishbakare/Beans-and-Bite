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

export const razorpayCreateGiftRequest = async (token, amount) => {
  try {
    const headers = createHeader(token);
    const response = await axios.post(
      `${baseUrl}/payment/createGift`,
      { amount },
      { headers }
    );
    const { data } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const razorpayVarifyGiftOrder = async (giftOrderDetails) => {
  try {
    const response = await axios.post(
      `${baseUrl}/payment/verifyGift`,
      giftOrderDetails
    );
    const { message } = response.data;
    return { success: true, message };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const addToWallet = async (token, amount) => {
  try {
    const headers = createHeader(token);
    const response = await axios.post(
      `${baseUrl}/gift/addToWallet`,
      { amount },
      { headers }
    );
    const { message } = response.data;
    return { success: true, message };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const payViaWallet = async (token, giftCollectedInfo) => {
  try {
    const headers = createHeader(token);
    const response = await axios.post(
      `${baseUrl}/gift/payViaWallet`,
      giftCollectedInfo,
      { headers }
    );
    const { data, message } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const payViaPaymentGateway = async (token, giftCollectedInfo) => {
  try {
    const headers = createHeader(token);
    const response = await axios.post(
      `${baseUrl}/gift/payViaGateway`,
      giftCollectedInfo,
      { headers }
    );
    const { data } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const updateFavouriteOnLogout = async (token, favorites) => {
  try {
    const headers = createHeader(token);
    const response = await axios.put(
      `${baseUrl}/cart//updateFavorites`,
      { favorites },
      { headers }
    );
    const { message } = response.data;
    return { success: true, message };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const orderProducts = async (token, orderDetails) => {
  try {
    const headers = createHeader(token);
    const response = await axios.post(`${baseUrl}/order/create`, orderDetails, {
      headers,
    });
    const { message, data } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const razorpayCreateOrder = async (token, amount) => {
  try {
    const headers = createHeader(token);
    const response = await axios.post(
      `${baseUrl}/payment/createGift`,
      { amount },
      { headers }
    );
    const { data } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const razorpayVarifyOrder = async (orderDetails) => {
  try {
    const response = await axios.post(
      `${baseUrl}/payment/verifyGift`,
      orderDetails
    );
    const { message } = response.data;
    return { success: true, message };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const fetchUserDetails = async (token) => {
  try {
    const headers = createHeader(token);
    const response = await axios.get(`${baseUrl}/user/details`, { headers });
    const { data } = response.data;
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const fetchUserGiftHistory = async (token, page, limit) => {
  try {
    const headers = createHeader(token);
    const response = await axios.get(`${baseUrl}/user/giftHistory`, {
      headers,
      params: {
        page,
        limit,
      },
    });
    const { data } = response.data;
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const fetchUserOrderHistory = async (token, page, limit) => {
  try {
    const headers = createHeader(token);
    const response = await axios.get(`${baseUrl}/user/orderHistory`, {
      headers,
      params: {
        page,
        limit,
      },
    });
    const { data } = response.data;
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const editUserDetails = async (token, userDetails) => {
  try {
    const headers = createHeader(token);
    const response = await axios.post(`${baseUrl}/user/update`, userDetails, {
      headers,
    });
    const { data } = response.data;
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const fetchNotificationDetails = async (token) => {
  try {
    const headers = createHeader(token);
    const response = await axios.get(`${baseUrl}/user/data`, { headers });
    const { data } = response.data;
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const forgotPassword = async (email) => {
  try {
    await axios.get(`${baseUrl}/resetPassword/forgotPassword/${email}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};

export const updatePassword = async (userInfo) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/resetPassword/reset/`,
      userInfo
    );
    const { data } = response.data;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};
