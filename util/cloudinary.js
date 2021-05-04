import axios from "axios";

export const upload = async (files) => {
  const uploaders = files.map((file) => {
    // Initial FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET); // Replace the preset name with your own

    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      )
      .then((response) => {
        const data = response.data;
        const fileURL = data.secure_url; // You should store this URL for future references in your app
        return fileURL;
      });
  });

  // Once all the files are uploaded
  return axios.all(uploaders).then((data) => {
    return data;
  });
};
