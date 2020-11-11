import ApiClient from "./ApiClient";

export const __CreateFood = async (formData, mealId) => {
  try {
    const res = await ApiClient.post(`/food/${mealId}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __RemoveFood = async (mealId, foodId) => {
  try {
    const res = await ApiClient.delete(`/food/${mealId}/remove/${foodId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetFood = async (foodId) => {
  try {
    const res = await ApiClient.get(`/food/${foodId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
