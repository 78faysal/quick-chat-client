// export const ImageUpload = (imageData) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(imageData);
//   reader.onload = () => {
//     // console.log(reader.result);
//     return reader.result;
//   };
//   reader.onerror = (error) => {
//     return console.log("Error", error);
//   };
// };
import axios from 'axios';

export const ImageUpload = async(image) => {
  const formData = new FormData();
  formData.append('image', image);
  const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
  console.log(data.data);
  return data.data;
}