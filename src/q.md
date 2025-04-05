
Prisma Express Api for Presentation.

I want you to create an API (create api end-points as you feel fit) for my "Presentations" app using prisma and express.

Requirements:

1: i want to create/read/update/delete presentations.

2: please give me usage examples also with fake data using prisma schemas.

Here is a simple express api to use as a starter

const { PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient(); // Instantiate the Prisma Client


// const presentation = prisma.presentation;
const app = express();
const port = 5000;

app.use(express.json());

app.get("/" , (req,res)=>{
    return res.json({message:"Welcome to Prisma API"}).status(200);
});
app.get("/ping" , (req,res)=>{
     const count = prisma.presentation.findMany();

    return res.json({message:"pong" , count}).status(200);
});

app.listen(port,()=>{
    console.log(`App Running on Port ${port}`);
});


and here is my prisma schema to be studies in detail


generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}


// Main presentation model (top level content)
model Presentation {
  id           String   @id
  tcode        String
  chapter      Int
  exercise     String
  filename     String
  questionNo   Int
  part         Int
  name         String   @default("")
  questionType String
  status       String
  sortOrder    Int      @default(0)
  comments     String   @default("")
  tags         String   @default("[]") // Stored as JSON string
  
  // Relationships to slides
  eqSlides     EqSlide[]
  canvasSlides CanvasSlide[] // Empty array as per requirements
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// EqSlide model for equation slides
model EqSlide {
  id          String    @id
  uuid        String    @unique
  startTime   Int
  endTime     Int
  type        String
  version     String
  template    String    @default("")
  sortOrder   Int       @default(0) 
  
  // Relationship to parent presentation
  presentation   Presentation @relation(fields: [presentationId], references: [id], onDelete: Cascade)
  presentationId String
  
  // Relationship to items
  items       EqItem[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Canvas slide model (empty but required by schema)
model CanvasSlide {
  id          String    @id
  uuid        String    @unique
  type        String    @default("canvas")
  sortOrder   Int       @default(0)
  
  // Relationship to parent presentation  
  presentation   Presentation @relation(fields: [presentationId], references: [id], onDelete: Cascade)
  presentationId String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// EqItem model for items within equation slides
model EqItem {
  id          String    @id
  uuid        String    @unique
  name        String    @default("")
  content     String    @default("")
  showAt      Int
  hideAt      Int
  startTime   Int
  endTime     Int
  code        String    @default("")
  type        String
  sortOrder   Int       @default(0)
  
  // Relationship to parent slide
  slide       EqSlide   @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  // Relationship to solution points
  sps         Sp[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Solution Points (sp) model
model Sp {
  id          String    @id @default(cuid())
  code        String
  type        String
  sortOrder   Int       @default(0)
  
  // Relationship to parent item
  item        EqItem    @relation(fields: [itemId], references: [id], onDelete: Cascade)
  itemId      String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}