import { baseUrl } from "../../utils/Constant";
import axios from "axios";
import { setBestSellingProducts, setError } from "../slices/commonSlice";

export const fetchBestSellingProductThunk = () => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/product/bestSelling`);
    const { data } = response.data;
    dispatch(setBestSellingProducts({ status: 1, data }));
  } catch (error) {
    dispatch(setError(error.response.data.error));
  }
};
