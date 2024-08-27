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
//fetchSuggetion
