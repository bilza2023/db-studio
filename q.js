"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCanvasSlide = isCanvasSlide;
exports.isEqsSlide = isEqsSlide;
// Type guard function
function isCanvasSlide(slide) {
    return slide.type === "canvas";
}
function isEqsSlide(slide) {
    return slide.type === "eqs";
}
