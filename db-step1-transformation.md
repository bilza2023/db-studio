
This solution worked like a charm and a simple array of objects has been created which is flat and simple.

Requirements:

1: We need to write prisma schemas for the the database 
2: We need to write a node function using the newly created prisma models to inser the data from relational-data.json into sqlite data base with prisma.

==> Some important changes that we need to make to the data while transforming into sqlite format

    1: the "slides" field be renamed as "eqSlides" (follow the suitable naming convention).
    2: a new field (soredOrder:0) should be added to each slide and each item inside the slide. Let me explain again : there are slides insdie the slides array (in old data in new data the slides field is called now eqSlides). so we add soredOrder to each slide object and each item object inside slide object. 
    3: an empty folder "canvasSlides" be added to each presentation as well.
    4: discard the field "imagesUrl"



Here is my proposed data structure for prisma

1: "presentations" table:
=======================
    "id": "6779fd29808e55c288cb3fd6",
    "tcode": "fbise10math",
    "chapter": 1,
    "exercise": "1.1",
    "filename": "fbise10math_ch_1_ex_1.1_q_1_pt_1",
    "questionNo": 1,
    "part": 1,
    "name": "",
    "questionType": "paid",
    "status": "empty",
    "tags": [],
    "sortOrder": 0,
    "comments": "",
    "slides": []

2: Slides level : "eqSlides" table
=====================================
This is a 1 to many relational table means that all the eqSlides of the presentation table will be placed here.

    "id": "6779fd29808e55c288cb3fd7",
        "uuid": "656b5193-0bd1-4385-bfbd-208271162f20",
        "startTime": 0,
        "endTime": 10,
        "type": "eqs",
        "version": "basic",
        "template": "",

        //discard imagesUrl

3: items Level: Table name eqItems table. This table has 1 to many relationship with eqSlides table such that the items array has entries in items eqItems table.

        "id": "6779fd29808e55c288cb3fd8",
            "uuid": "3f6820c3-4619-4335-82ad-18e35a4160b1",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "Write the following quadratic equations in the standard form and point out pure quadratic equations.",
            "type": "text",
            <!-- "sp": [] next level -->

4: sp table : this is where all the sp of eqSlides eqItems are stored 

  "code": "Solution",
        "type": "text"

Following are sample prisma file and smaple from the data that is to be read into sqlite models.

sample
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}


// Main question model
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
  
  // Relationships to slides
  canvasSlides CanvasSlide[]
  eqsSlides    EqsSlide[]
  
  // Sequence order - stores type and uuid references in order
  sequenceOrder Json     // Array of {type: "canvas"|"eqs", uuid: string}
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

data sample

[
  {
    "id": "6779fd29808e55c288cb3fd6",
    "tcode": "fbise10math",
    "chapter": 1,
    "exercise": "1.1",
    "filename": "fbise10math_ch_1_ex_1.1_q_1_pt_1",
    "questionNo": 1,
    "part": 1,
    "name": "",
    "questionType": "paid",
    "status": "empty",
    "tags": [],
    "sortOrder": 0,
    "comments": "",
    "slides": [
      {
        "id": "6779fd29808e55c288cb3fd7",
        "uuid": "656b5193-0bd1-4385-bfbd-208271162f20",
        "startTime": 0,
        "endTime": 10,
        "type": "eqs",
        "version": "basic",
        "template": "",
        "imagesUrl": "https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/",
        "items": [
          {
            "id": "6779fd29808e55c288cb3fd8",
            "uuid": "3f6820c3-4619-4335-82ad-18e35a4160b1",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "Write the following quadratic equations in the standard form and point out pure quadratic equations.",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd29808e55c288cb3fd9",
            "uuid": "e82b65a9-7f24-4508-868e-a8fe7b122e77",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "(x+7)(x-3)=-7",
            "type": "code",
            "sp": [
              {
                "code": "Solution",
                "type": "text"
              }
            ]
          },
          {
            "id": "6779fd29808e55c288cb3fda",
            "uuid": "7e7dd9cb-53eb-47b8-bae0-56a5b79348f6",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "(x+7)(x-3)=-7",
            "type": "code",
            "sp": [
              {
                "code": "Multiply the equation",
                "type": "text"
              }
            ]
          },
          {
            "id": "6779fd29808e55c288cb3fdb",
            "uuid": "efcdef96-552d-4933-aac8-554957f9ac60",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "x^2+4x-21=-7",
            "type": "code",
            "sp": []
          },
          {
            "id": "6779fd29808e55c288cb3fdc",
            "uuid": "5da7ea51-fb71-4799-8b77-ee36f627c3ae",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "x^2+4x-21+7=7",
            "type": "code",
            "sp": []
          },
          {
            "id": "6779fd29808e55c288cb3fdd",
            "uuid": "3d185056-8bfb-4e2e-8a4f-3a10261f3d70",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "x^2+4x-14=0",
            "type": "code",
            "sp": [
              {
                "code": "It is standard form of  quadratic equation(Standard Form)",
                "type": "text"
              },
              {
                "code": "ax^2+bx+c=0",
                "type": "code"
              },
              {
                "code": "Answer",
                "type": "text"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "6779fd29808e55c288cb3fdf",
    "tcode": "fbise10math",
    "chapter": 1,
    "exercise": "1.1",
    "filename": "fbise10math_ch_1_ex_1.1_q_1_pt_2",
    "questionNo": 1,
    "part": 2,
    "name": "",
    "questionType": "paid",
    "status": "empty",
    "tags": [],
    "sortOrder": 0,
    "comments": "",
    "slides": [
      {
        "id": "6779fd29808e55c288cb3fe0",
        "uuid": "116e79a7-e9c9-466c-95bb-d931fb45a5a5",
        "startTime": 0,
        "endTime": 10,
        "type": "eqs",
        "version": "basic",
        "template": "",
        "imagesUrl": "https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/",
        "items": [
          {
            "id": "6779fd29808e55c288cb3fe1",
            "uuid": "21ec753b-aa39-4a99-88c9-7059f4d42998",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "Write the following quadratic equations in the standard form and point out pure quadratic equations.",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd29808e55c288cb3fe2",
            "uuid": "8d8cb01d-e31e-415a-8a5a-d1a383bf9415",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "\\frac{x^2+4}{3}-\\frac{x}{7}=1",
            "type": "code",
            "sp": []
          },
          {
            "id": "6779fd29808e55c288cb3fe3",
            "uuid": "26ffabd0-df40-40fc-8cd5-2939d27932f8",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "Solution",
            "type": "code",
            "sp": []
          },
          {
            "id": "6779fd29808e55c288cb3fe4",
            "uuid": "007816b8-9782-4f5b-9905-0c9cb7fd3204",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "\\frac{x^2+4}{3}-\\frac{x}{7}=1",
            "type": "code",
            "sp": [
              {
                "code": "Multiplying both sides by 21",
                "type": "text"
              }
            ]
          },
          {
            "id": "6779fd29808e55c288cb3fe5",
            "uuid": "2f2c2b11-ea24-46e9-8df5-48f0c60193e4",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 0,
            "code": "21*(\\frac{x^2+4}{3})-21*(\\frac{x}{7})=21*1",
            "type": "code",
            "sp": []
          },
          {
            "id": "6779fd29808e55c288cb3fe6",
            "uuid": "64bc62ce-344e-4c02-83e2-803b4dd96e95",
            "name": "",
            "content": "",
