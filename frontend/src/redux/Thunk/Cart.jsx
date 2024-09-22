import { baseUrl } from "../../utils/Constant";
import axios from "axios";
import { setCartError, incrementCount } from "../slices/notificationSlice";
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
    dispatch(incrementCount({ requestFor: "cart", incrementCount: 1 }));
    dispatch(setCartError({ error: null }));
  } catch (error) {
    dispatch(
      setCartError({ error: "something went wrong, please try again later" })
    );
  }
};
