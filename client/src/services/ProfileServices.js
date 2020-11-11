import ApiClient from "./ApiClient";

export const __CreateProfile = async (formData, userId) => {
  try {
    const res = await ApiClient.post(`/profile/create/${userId}`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetProfile = async (userId) => {
  try {
    const res = await ApiClient.get(`/profile/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
