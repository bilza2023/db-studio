
const prisma = require("../db.js");
const uuid = require("../uuid.js");
// const presentation = require("./presentationData-manual.js")
const createPresentation = require("./createPresentation.js");
const updatePresentation = require("./updatePresentation.js");
const del = require("./delete.js");
const readPresentation = require("./read.js");

///////////////////////////////////////////////////
  class PresentationModel {

   static async create(req, res){
    
    // req.presentationData = presentation. presentationData;
    // req.eqSlidesData = presentation. eqSlides;
    // req.canvasSlidesData = presentation. canvasSlides;
    return await createPresentation(prisma,req, res);
  }
  
  static async del(req,res){
     return await del(prisma,req, res);
  }
  static async read(id){
     return await readPresentation(prisma,id);
  }

  static async update(req, res){
    try{
    return await updatePresentation(prisma,req, res);
    }catch(error) {
      // console.error("Error updating presentation:", error);
      return false;
    }
  }





  }
  module.exports = PresentationModel;