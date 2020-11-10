import ApiClient from "./ApiClient";

export const __CreateProfile = async (formData, userId) => {
  try {
    const res = await ApiClient.post(`/profile/${userId}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __UpdateProfile = async (userId) => {
  try {
  } catch (error) {
    throw error;
  }
};
