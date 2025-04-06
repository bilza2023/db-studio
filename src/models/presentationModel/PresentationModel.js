
const prisma = require("../db.js");
const uuid = require("../uuid.js");
const presentation = require("./presentationData-manual.js")
const presentationHelpers = require("./presentationHelpers");
const createPresentation = require("./createPresentation.js");
const del = require("./delete.js");
const readPresentation = require("./read.js");

///////////////////////////////////////////////////
  class PresentationModel {

   static async create(req, res){
    
    req.presentationData = presentation. presentationData;
    req.eqSlidesData = presentation. eqSlides;
    req.canvasSlidesData = presentation. canvasSlides;
    return await createPresentation(prisma,req, res);
  }
  
  static async del(req,res){
     return await del(prisma,req, res);
  }
  static async read(id){
     return await readPresentation(prisma,id);
  }





  }
  module.exports = PresentationModel;