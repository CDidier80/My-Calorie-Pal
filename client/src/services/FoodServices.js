import ApiClient from "./ApiClient";

export const __CreateFood = async (formData, mealId) => {
  try {
    const res = await ApiClient.post(`/food/${mealId}`);
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
