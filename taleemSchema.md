
Here is my data structure

1 : Presentation Table : Top level ,is main entry point. Every query go through this, no direct access to other tables needed.This also has "slides" field which can be of type "canvas" or "eqs" 

2a: Eqs Table : All the Eqs data (it has "sp" array in eq.item.itemExtra.sp)
    2b- Eq items table : table for eq items 
    2c- Sp Table : all the "sp" items   which are for format {type: "text" | "image" ... , content:string}

3a: CanvasTable : all the canvas data 
    3b: slideExtra : i dont know if we need seperate table for slideExtra or not 
    3c: Canvas Items Tables : For each item type we have seperate table
        Angle
        Circle
        Dot
        Ellipse
        Icon
        Image
        Line
        List
        PieChart
        Ray
        Rectangle
        Sprite
        Text
        Triangle;

Requirements: 
1: Do you agree ? if yes make me a text based diagram of this database structure with relationships.
2: create me prisma schema for these tables


here is the data for each table 
Presentation Table

  "tcode": "fbise10math",
  "chapter": 1,
  "exercise": "1.1",
  "filename": "fbise10math_ch_1_ex_1.1_q_1_pt_1",
  "questionNo": 1,
  "part": 1,
  "name": "",
  "questionType": "paid",
  "status": "empty",
  "slides": [] //this can be of type CanvasSlide or EqsSlide


2: Eqs Table  and Eq items table for "sp" table the format is (type,content)
 "uuid": "656b5193-0bd1-4385-bfbd-208271162f20",
      "startTime": 0,
      "endTime": 10,
      "type": "eqs",
      "version": "basic",
      "template": "",
      "items": [
        {
          "uuid": "3f6820c3-4619-4335-82ad-18e35a4160b1",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {
            "startTime": 0,
            "endTime": 0,
            "code": "Write the following quadratic equations in the standard form and point out pure quadratic equations.",
            "type": "text",
            "sp": []
          },
        }
      ]
        
3: CanvasSlide table:

    "slides": [
      {
        "uuid": "31ce5b05-a8a3-43c3-b473-cddab5b978f6",
        "startTime": 0,
        "endTime": 10,
        "type": "canvas",
        "version": "basic",
        "template": "",
        "items": [
          {
            "uuid": "91ad766f-95a5-4f73-87a4-35fb9f7f6dfe",
            "name": "text_196076e4",
            "content": "",
            "showAt": 0,
            "hideAt": null,
            "itemExtra": {
              "uuid": "265125d8-e902-4c73-8f6c-a022f1708f20",
              "type": "text",
              "x": 110,
              "y": 157,
              "text": "Chapter  1 Ex 1.1 Q 1 Part (ii) ",
              "fontSize": 60,
              "fontFamily": "Times New Roman",
              "color": "#d91212",
              "globalAlpha": 1
            },
            "_id": {
              "$oid": "67ac30a534a981cbd55d216f"
            }
          }
        ],
        "slideExtra": {
          "backgroundColor": "#edece9",
          "canvasWidth": 1000,
          "canvasHeight": 360,
          "cellHeight": 25,
          "cellWidth": 25,
          "bgImg": "black_mat",
          "bgGlobalAlpha": 1,
          "xFactor": 0,
          "yFactor": 0,
          "showGrid": false,
          "gridLineWidth": 1,
          "gridLineColor": "gray",
          "imagesUrl": "https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/"
        },

Each itemExtra is different base on "type": "text", so need own table . following is typescript schemas of each     
"itemExtra": {
              "uuid": "265125d8-e902-4c73-8f6c-a022f1708f20",
              "type": "text",
              "x": 110,
              "y": 157,
              "text": "Chapter  1 Ex 1.1 Q 1 Part (ii) ",
              "fontSize": 60,
              "fontFamily": "Times New Roman",
              "color": "#d91212",
              "globalAlpha": 1
            },        

import { IBaseCanvasItem } from './IBaseCanvasItem';
///////////////////////////////////////////////////////////
// uuid,type,name,opacity,color
// x,y,rotation
///////////////////////////////////////////////////////////
interface IAngle extends IBaseCanvasItem {
 //checked on 2-Mar-2025
  uuid: string;
  type: 'angle';
  name: string;
  opacity: number;
  color: string;

  x: number;
  y: number;
  radius: number;
  ticks: number;
  startAngle: number;
  endAngle: number;
  lineWidth: number;
  showOrigin: boolean;
}
interface ICircle extends IBaseCanvasItem {
  uuid: string;
  type: 'circle';
  name: string;
  color: string;
  opacity: number;
/////////
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  lineWidth: number;
  dash: number;
  gap: number;
  filled: boolean;
}
interface IDot extends IBaseCanvasItem {
  uuid: string;
  type: 'dot';
  name: string;
  color: string;
  opacity: number;
////////
  x: number;
  y: number;
  label: string;
  radius: number;
  textColor: string;
  textSize: number;
}
interface IEllipse extends IBaseCanvasItem {
  uuid: string;
  type: 'ellipse';
  name: string;
  color: string;
  opacity: number;
/////////////////////////
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  startAngle: number;
  endAngle: number;
  lineWidth: number;
  filled: boolean;
}
interface IIcon extends IBaseCanvasItem {
  uuid: string;
  type: 'icon';
  name: string;
  color: string;
  opacity: number;
//////////////////////
  x: number;
  y: number;
  text: string;
  fontSize: number;
  iconSize: number;
  fontFamily: string;
  icon: string;
  showBg: boolean;
  iconOnTop: boolean;
  iconErrorX: number;
  iconErrorY: number;
  bgColor: string; // this can be color
}
interface IImage extends IBaseCanvasItem {
  uuid: string;
  type: 'image';
  name: string;
  opacity: number;
  color: string; //not used here
///////////////////////////////
  rotation: number;
  x: number;
  y: number;
  src: string;//?????
  width: number;
  height: number;
}
interface ILine extends IBaseCanvasItem {
  uuid: string;
  type: 'line';
  name: string;
  color: string;
  opacity: number;
/////////////////
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lineWidth: number;
  rotation: number;
  dash: number;
  gap: number;
}
interface IList extends IBaseCanvasItem {
  uuid: string;
  type: 'list';
  name: string;
  opacity: number;
  color: string;
////////////////////////
  x: number;
  y: number;
  listArray: string[];
  fontSize: number;
  fontFamily: string;
  lineGap: number;
  indentation: number;
}
interface IPieChart extends IBaseCanvasItem {
  uuid: string;
  type: 'piechart';
  name: string;
  // color: string; //not used
  opacity: number;
///////////////////////
  x: number;
  y: number;
  radius: number;
  data: Array<{label: string; percentage: number; color: string;}>;//very useful
  showLabels: boolean;
  labelFontSize: number;
  labelColor: string;
}
interface IRay extends IBaseCanvasItem {
  uuid: string;
  type: 'ray';
  name: string;
  color: string;
  opacity: number;
//////////////////
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  arrowWidth: number;
  arrowHeight: number;
  startArrow: boolean;
  endArrow: boolean;
  lineWidth: number;
  dash: number;
  gap: number;
}
interface IRectangle extends IBaseCanvasItem {

  uuid: string;
  type: 'rectangle'; //type is not string 
  name: string;
  color: string;
  opacity: number;
////////////////////
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  filled: boolean;
  lineWidth: number;
  dash: number;
  gap: number;
}
interface ISprite extends IBaseCanvasItem {
  uuid: string;
  type: 'sprite';
  name: string;
  opacity: number;
////////////////////////////
  src: string;
  selectedItem: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}
interface IText extends IBaseCanvasItem {
  uuid: string;
  type: 'text';
  name: string;
  color: string;
  opacity: number;
///////////////////////
  x: number;
  y: number;
  text: string;
  fontSize: number;
  rotation: number;
  fontFamily: string;
  width: number;
  height: number;
}
interface ITriangle extends IBaseCanvasItem {
  uuid: string,
  type: 'triangle';
  name: string,
  opacity: number;
  color: string;
////////////////////////
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  rotation: number,
  lineWidth: number,
  filled: true,
  dash: number,
  gap: number,
}

// Export all interfaces as an array of types
export  type ICanvasItemTypes =
  | IAngle
  | ICircle
  | IDot
  | IEllipse
  | IIcon
  | IImage
  | ILine
  | IList
  | IPieChart
  | IRay
  | IRectangle
  | ISprite
  | IText
  | ITriangle;

// Export all interfaces
export { 
  IAngle,
  ICircle,
  IDot,
  IEllipse,
  IIcon,
  IImage,
  ILine,
  IList,
  IPieChart,
  IRay,
  IRectangle,
  ISprite,
  IText,
  ITriangle
};





interface IBackground  {
    
    type: 'background';
    color: string;
    opacity: number;
//////////////////////////
    backgroundColor: string,
    cellHeight: number,
    cellWidth: number,
    backgroundImage: string | null,
    ///////////////////
    showGrid: boolean,
    gridLineWidth: number,
    gridLineColor: string
  }

  export type {IBackground}


interface IEqSpItem {
    code : string;
    type : "code" | "text" | "heading" | "image" | "table" | "tableCode";
}

interface IEqsItem {
    uuid: string;
    name: string;
    content: string;
    showAt: number | null;
    hideAt: number | null;
    itemExtra: {
        startTime?: number;
        endTime?: number;
        code: string;
        type: string;
        sp: IEqSpItem[]; // You might want to create a specific interface for 'sp' if you know its structure
    };

}

export default  IEqsItem;