import axios from "axios";
export const fetchData = async (url) => {
  try {
  const resp= await axios.get(url);
  return resp.data
} catch (error) {
  console.error('Error in postData:', error);
  throw error; // Re-throw the error to be handled by the calling function
}
};
export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data; // Return only the response data
  } catch (error) {
    console.error('Error in postData:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }

};
export const updateData = async (url,data) => {
  try {
  const resp= await axios.put(url, data);
  return resp.data;
  }
  catch (error) {
    console.error('Error in postData:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }

};
export const deleteData = async (url) => {
  return await axios.delete(url);
};
