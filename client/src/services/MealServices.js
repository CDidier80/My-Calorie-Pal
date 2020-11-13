import ApiClient from "./ApiClient";

export const __CreateMeal = async (formData, userId) => {
  try {
    const res = await ApiClient.post(`/meals/${userId}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __RemoveMeal = async (mealId) => {
  try {
    const res = await ApiClient.delete(`/meals/${mealId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetMeal = async (mealId) => {
  try {
    const res = await ApiClient.get(`/meals/${mealId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpDateMeal = async (formData, mealId) => {
  try {
    const res = await ApiClient.put(`/meals/${mealId}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
