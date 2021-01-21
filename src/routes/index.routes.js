const { Router } = require("express");
const router = Router();
const Photo = require("../models/photo");
const fs = require('fs-extra');
// CONFIGURACIÓN DE CLOUDINARY
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/", async(req, res) => {
  const photos = await Photo.find().lean();
  res.render('images',{photos});
});

router.get("/images/add", async(req, res) => {
  const photos = await Photo.find().lean();
  // No es necesario darle la direccion de views ya que
  // en express definimos donde estaría la carpeta views
  // al usar render busca directamente la carpeta views
  res.render("image_form",{photos});
});

router.post("/images/add", async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  console.log(req.file.path)
  const newPhoto = new Photo({
    title: req.body.title,
    description: req.body.description,
    imageURL: result.secure_url,
    public_id: result.public_id,
  });
  await newPhoto.save();
  await fs.unlink(req.file.path);
  res.redirect('/');
});

router.get("/images/delete/:photo_id", async(req,res)=>{
  const{ photo_id } = req.params;
  
  const photo = await Photo.findByIdAndDelete(photo_id);
  console.log("FOTO: " + photo);
  const result= await cloudinary.v2.uploader.destroy(photo.public_id);
  res.redirect('/images/add');
})

module.exports = router;
