import config from '../config.json';

const {CLOUDINARY_NAME} = config;
const {CLOUDINARY_PRESET} = config;

const UploadImage = async (file:any) => {
  let imageData = new FormData();
  imageData.append('file', file);
  imageData.append('cloud_name', CLOUDINARY_NAME);
  imageData.append('upload_preset', CLOUDINARY_PRESET);

  try{
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/"+CLOUDINARY_NAME+"/image/upload",
      {
        method: 'post',
        body: imageData
      }
    )
    let objImage = await response.json();
    let imageUrl = objImage.secure_url;
    return imageUrl;
  }
  catch(err){
    console.log(err);
  }
}

export default UploadImage;
