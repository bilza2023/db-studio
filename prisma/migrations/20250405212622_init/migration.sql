-- CreateTable
CREATE TABLE "SlideExtra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT 'background',
    "color" TEXT NOT NULL DEFAULT 'gray',
    "opacity" REAL NOT NULL DEFAULT 0.7,
    "backgroundColor" TEXT NOT NULL DEFAULT '#363446',
    "cellHeight" REAL NOT NULL DEFAULT 25,
    "cellWidth" REAL NOT NULL DEFAULT 25,
    "backgroundImage" TEXT,
    "showGrid" BOOLEAN NOT NULL DEFAULT false,
    "gridLineWidth" REAL NOT NULL DEFAULT 1,
    "gridLineColor" TEXT NOT NULL DEFAULT 'black',
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SlideExtra_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasText" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "rotation" REAL NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL,
    "fontSize" REAL NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "width" REAL NOT NULL,
    "height" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasText_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasRectangle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'rectangle',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "rotation" REAL NOT NULL DEFAULT 0,
    "width" REAL NOT NULL,
    "height" REAL NOT NULL,
    "filled" BOOLEAN NOT NULL DEFAULT false,
    "lineWidth" REAL NOT NULL DEFAULT 1,
    "dash" REAL NOT NULL DEFAULT 0,
    "gap" REAL NOT NULL DEFAULT 0,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasRectangle_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasCircle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'circle',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "radius" REAL NOT NULL,
    "startAngle" REAL NOT NULL,
    "endAngle" REAL NOT NULL,
    "lineWidth" REAL NOT NULL,
    "dash" REAL NOT NULL,
    "gap" REAL NOT NULL,
    "filled" BOOLEAN NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasCircle_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'image',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL DEFAULT '',
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "rotation" REAL NOT NULL DEFAULT 0,
    "src" TEXT NOT NULL,
    "width" REAL NOT NULL,
    "height" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasImage_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'line',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "rotation" REAL NOT NULL DEFAULT 0,
    "x1" REAL NOT NULL,
    "y1" REAL NOT NULL,
    "x2" REAL NOT NULL,
    "y2" REAL NOT NULL,
    "lineWidth" REAL NOT NULL,
    "dash" REAL NOT NULL,
    "gap" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasLine_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasRay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ray',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x1" REAL NOT NULL,
    "y1" REAL NOT NULL,
    "x2" REAL NOT NULL,
    "y2" REAL NOT NULL,
    "lineWidth" REAL NOT NULL,
    "arrowWidth" REAL NOT NULL,
    "arrowHeight" REAL NOT NULL,
    "startArrow" BOOLEAN NOT NULL,
    "endArrow" BOOLEAN NOT NULL,
    "dash" REAL NOT NULL,
    "gap" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasRay_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasDot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'dot',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "label" TEXT NOT NULL,
    "radius" REAL NOT NULL,
    "textColor" TEXT NOT NULL,
    "textSize" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasDot_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasEllipse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ellipse',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "radiusX" REAL NOT NULL,
    "radiusY" REAL NOT NULL,
    "rotation" REAL NOT NULL,
    "startAngle" REAL NOT NULL,
    "endAngle" REAL NOT NULL,
    "lineWidth" REAL NOT NULL,
    "filled" BOOLEAN NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasEllipse_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasIcon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'icon',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "text" TEXT NOT NULL,
    "fontSize" REAL NOT NULL,
    "iconSize" REAL NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "showBg" BOOLEAN NOT NULL,
    "iconOnTop" BOOLEAN NOT NULL,
    "iconErrorX" REAL NOT NULL,
    "iconErrorY" REAL NOT NULL,
    "bgColor" TEXT NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasIcon_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'list',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "listItems" TEXT NOT NULL,
    "fontSize" REAL NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "lineGap" REAL NOT NULL,
    "indentation" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasList_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasPieChart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'piechart',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "radius" REAL NOT NULL,
    "chartData" TEXT NOT NULL,
    "showLabels" BOOLEAN NOT NULL,
    "labelFontSize" REAL NOT NULL,
    "labelColor" TEXT NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasPieChart_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasAngle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'angle',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "radius" REAL NOT NULL,
    "ticks" INTEGER NOT NULL,
    "startAngle" REAL NOT NULL,
    "endAngle" REAL NOT NULL,
    "lineWidth" REAL NOT NULL,
    "showOrigin" BOOLEAN NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasAngle_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasSprite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'sprite',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "src" TEXT NOT NULL,
    "selectedItem" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "width" REAL NOT NULL,
    "height" REAL NOT NULL,
    "rotation" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasSprite_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CanvasTriangle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'triangle',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x1" REAL NOT NULL,
    "y1" REAL NOT NULL,
    "x2" REAL NOT NULL,
    "y2" REAL NOT NULL,
    "x3" REAL NOT NULL,
    "y3" REAL NOT NULL,
    "rotation" REAL NOT NULL,
    "lineWidth" REAL NOT NULL,
    "filled" BOOLEAN NOT NULL,
    "dash" REAL NOT NULL,
    "gap" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasTriangle_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SlideExtra_slideId_key" ON "SlideExtra"("slideId");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasText_uuid_key" ON "CanvasText"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasRectangle_uuid_key" ON "CanvasRectangle"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasCircle_uuid_key" ON "CanvasCircle"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasImage_uuid_key" ON "CanvasImage"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasLine_uuid_key" ON "CanvasLine"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasRay_uuid_key" ON "CanvasRay"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasDot_uuid_key" ON "CanvasDot"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasEllipse_uuid_key" ON "CanvasEllipse"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasIcon_uuid_key" ON "CanvasIcon"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasList_uuid_key" ON "CanvasList"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasPieChart_uuid_key" ON "CanvasPieChart"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasAngle_uuid_key" ON "CanvasAngle"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasSprite_uuid_key" ON "CanvasSprite"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CanvasTriangle_uuid_key" ON "CanvasTriangle"("uuid");
