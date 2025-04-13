
const PresentationModel = require("../models/presentationModel/PresentationModel");

const express = require("express");

const PresentationRouter = express();

PresentationRouter.post("/create", async (req, res) => {
  try {
    const createResult = await PresentationModel.create(req,res);

    return res.json({ message: "created", createResult }).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
PresentationRouter.get("/read/:id", async (req, res) => {
  try {
   
    const { id } = req.params;
    const presentation = await PresentationModel.read(id);

    return res.json(presentation).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
PresentationRouter.post("/readMany", async (req, res) => {
  try {
   
    const presentations = await PresentationModel.readMany(req,res);

    return res.json(presentations).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
PresentationRouter.post("/update", async (req, res) => {
  try {
    // debugger;
    const updateResult = PresentationModel.update(req,res);
    // const { id } = req.params;
    // const presentation = await PresentationModel.read(id);
    if(updateResult==true){
      return res.json({message : "success"}).status(200);
    }else {
      return res.json({message : "failed"}).status(500);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// PresentationRouter.delete("/delete/:id", async (req, res) => {
//     try {
//       const deleteResult = await PresentationModel.del(req,res);
  
//       return res.json({ message: "deleted", deleteResult }).status(200);
//     } catch (error) {
//       return res.status(500).json({ error: error.message });
//     }
//   });

/////////////////////////////////////////////////  
module.exports = PresentationRouter;