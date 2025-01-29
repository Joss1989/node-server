import express, { response } from "express";
// import morgan from 'morgan';
// import bodyParser from "body-parser";
import dotenv from "dotenv";
import Data from "./models/Data.js";

dotenv.config();

const router = express.Router();

router.use(express.json());

router.get("/test", (req, res) => {
  res.send("Hello, World root!");
});

// router.get("/data", (request, response) => {
//   response.send("Hello, World data!");
// });

router.get("/getByQuery", async (req, res) => {
  try {
    const { param } = req.query
    const data = await Data.find({  
      $or: [ 
        { name: { $regex: new RegExp(param, 'i') } },         
        { text: { $regex: new RegExp(param, 'i') } }

      ]})    
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/getName", async (req, res) => {
  const data = await Data.find({"name":"poul"})
  res.json(data)
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Data.findById(req.params.id)
      res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.get("/getAlldata", async (req, res) => {
  try {
    const cards = await Data.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post("/postsingle", async (req, res) => {

//   try {
//     const cardItem = {
//       name: "Potati",
//       img: "potati",
//       information: { strength: 10, lives: 1 },
//       text: "potati without"
//     }
//     const documentId = "6798cc8698729e7e4616f3e2" // document ID
//     const updatedDocument = await Data.findByIdAndUpdate(
//       documentId,
//       { $push: { content: cardItem } },
//       { new: true }
//     )
//       res.status(200).json(updatedDocument)
//   } catch (error) {
//       res.status(400).json({ message: error.message })
//   }
// })

router.post("/post", async (req, res) => {

  const formData = req.body;

  const data = new Data({
    name: formData.name,
    img: formData.img,
    information: { 
      strength: formData.strength, 
      lives: formData.lives 
    },
    text: formData.text
  })

  try {
    const dataToSave = await data.save()
    res.status(200).json(dataToSave)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id
    const data = await Data.findByIdAndDelete(id)
    res.send(`Document with ${ data?.name } er blevet slettet`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id
    const updateData = req.body
    const options = { new: true }

    const result = await Data.findByIdAndUpdate(
      id, updateData, options
    )
    res.send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router;
