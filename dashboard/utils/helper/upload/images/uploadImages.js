import axios from "axios";

export const uploadImage = async (file) => {
    try {
        if (!file) throw "No file found";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "PlantMart");
        const uploadImg = await axios.post("https://api.cloudinary.com/v1_1/dhelycucn/upload", formData);
        return uploadImg.data.secure_url;
    } catch (error) {
        return false;
    }
};
