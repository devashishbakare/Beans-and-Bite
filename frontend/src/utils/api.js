import axios from "axios";
import { baseUrl } from "./Constant";
export const fetchBestSellingProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/product/bestSelling`);
    const { data } = response.data;
    return { success: true, data: data };
  } catch (error) {
    return { success: false, error: error.response.data.error };
  }
};
