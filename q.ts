

import type { IBackground, ICanvasItemTypes } from "../taleem-canvas";
import type IEqsItem from "../eqsModule/IEqsItem";

interface IBaseSlide {
    uuid: string;
    name: string;
    startTime: number;
    endTime: number;
    version: "basic";
    template: string;
}

interface ICanvasSlide extends IBaseSlide {
    type: "canvas";
    items: ICanvasItemTypes[];
    slideExtra: IBackground;
}

interface IEqsSlide extends IBaseSlide {
    type: "eqs";
    items: IEqsItem[];
}

type ISlide = ICanvasSlide | IEqsSlide;

// Type guard function
function isCanvasSlide(slide: ISlide): slide is ICanvasSlide {
    return slide.type === "canvas";
}

function isEqsSlide(slide: ISlide): slide is IEqsSlide {
    return slide.type === "eqs";
}

export {
    IBaseSlide,
    ISlide,
    ICanvasSlide,
    IEqsSlide,
    isCanvasSlide,
    isEqsSlide
};


// Usage example:
// typescript
// function processSlide(slide: ISlide) {
//     if (isCanvasSlide(slide)) {
//         // Typescript knows slide.items is ICanvasItemTypes[]
//         // slide.slideExtra is available
//     } else if (isEqsSlide(slide)) {
//         // Typescript knows slide.items is IEqsItem[]
//     }
// }
//


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