import { baseUrl } from "../../utils/Constant";
import axios from "axios";
import {
  setCartError,
  incrementCount,
  addToFavorites,
  removeFromFavorites,
  setFavoriteError,
  decrementCount,
} from "../slices/notificationSlice";
import { createHeader } from "../../utils/Constant";

export const addToCart = (cartCustomizationData, token) => async (dispatch) => {
  try {
    const headers = createHeader(token);
    const response = await axios.post(
      `${baseUrl}/cart/add`,
      cartCustomizationData,
      { headers }
    );
    const { data } = response.data;
    dispatch(incrementCount({ requestFor: "cart", count: 1 }));
    dispatch(setCartError({ error: null }));
  } catch (error) {
    dispatch(
      setCartError({ error: "something went wrong, please try again later" })
    );
  }
};

export const addAndRemoveFromFavorites =
  (token, productId, favorites) => async (dispatch) => {
    try {
      // const headers = createHeader(token);

      const isPresent = favorites.find((product) => product == productId);
      if (isPresent) {
        // await axios.post(
        //   `${baseUrl}/user/removeFavorite`,
        //   { productId },
        //   { headers }
        // );
        dispatch(removeFromFavorites({ productId }));
        dispatch(decrementCount({ requestFor: "fav", count: 1 }));
      } else {
        // await axios.post(
        //   `${baseUrl}/user/addFavorite`,
        //   { productId },
        //   { headers }
        // );
        dispatch(addToFavorites({ productId }));
        dispatch(incrementCount({ requestFor: "fav", count: 1 }));
      }
      // dispatch(setFavoriteError({ error: null }));
    } catch (error) {
      dispatch(
        setFavoriteError({ error: "something went wrong, Try again later" })
      );
    }
  };
