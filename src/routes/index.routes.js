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

router.get("/", (req, res) => {
  res.render("images");
});

router.get("/images/add", (req, res) => {
  // No es necesario darle la direccion de views ya que
  // en express definimos donde estaría la carpeta views
  // al usar render busca directamente la carpeta views
  res.render("image_form");
});

router.post("/images/add", async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  console.log(result);
  const newPhoto = new Photo({
    title: req.body.title,
    description: req.body.description,
    imageURL: result.secure_url,
    public_id: result.public_id,
  });
  await newPhoto.save();
  res.send('Recibido');
});

router.post;
module.exports = router;
