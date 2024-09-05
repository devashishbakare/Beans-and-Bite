import { baseUrl } from "../../utils/Constant";
import axios from "axios";
import { addProductFromCategories, setError } from "../slices/productSlice";

export const checkAndFetchProduct =
  (categoryName) => async (dispatch, getState) => {
    try {
      const state = getState();
      if (state.category.categories[categoryName]) {
        return;
      }
      const response = await axios.get(
        `${baseUrl}/product/category?categoryName=${categoryName}`
      );
      const { data } = response.data;
      dispatch(addProductFromCategories({ categoryName, data }));
    } catch (error) {
      dispatch(setError(error.response.data.error));
    }
  };
