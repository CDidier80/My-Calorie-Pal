import ApiClient from "./ApiClient";

export const __CreateExercise = async (formData, userId) => {
  try {
    const res = await ApiClient.post(`/exercise/${userId}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __DeleteExercise = async (exerciseId) => {
  try {
    const res = await ApiClient.delete(`/exercise/${exerciseId}`);
  } catch (error) {
    throw error;
  }
};
