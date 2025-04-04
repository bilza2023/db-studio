
Here is some data from a mongodb database in .json format.

PLEASE WRITE ME A NODE FUNCTION THAT CONVERTS THIS DATA INTO A SIMPLE ARRAY OF OBJECTS DATA THAT I CAN LATER UPLOAD TO SQLITE (convert from document based to relational). For now i just need a node function that reads in this data and output a file with simplified version (a simple js array of objects simplified and with no mongodb related stuff).

Explanation of the data 

The data is a mongodb collection (an array of objects and that is how i want to keep it as an array of objects in out put format as well.). 

Each object break down is as following:

level 1:presentation level : on the top level (lets call it "presentation") . it has 
==========================
{
  "_id": {
    "$oid": "6779fd29808e55c288cb3fd6"
  },
  "tcode": "fbise10math",
  "chapter": 1,
  "exercise": "1.1",
  "filename": "fbise10math_ch_1_ex_1.1_q_1_pt_1",
  "questionNo": 1,
  "part": 1,
  "name": "",
  "questionType": "paid",
  "status": "empty",
  "slides": [] /// this field is very important and must be paid attention to 
  .....and
    "tags": [],
  "sortOrder": 0,
  "comments": "",


level 2: The "slides" field
===========================

Each slide has these on top level (slide level)
"uuid": "656b5193-0bd1-4385-bfbd-208271162f20",
      "startTime": 0,
      "endTime": 10,
      "type": "eqs",
      "version": "basic",
      "template": "",
      "items" : [] // once again this is another nesting

level 3: Items level
====================
each item has
 "uuid": "3f6820c3-4619-4335-82ad-18e35a4160b1",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {}//

level 4: itemExtra
==================
it has 
  "startTime": 0,
            "endTime": 0,
            "code": "Write the following quadratic equations in the standard form and point out pure quadratic equations.",
            "type": "text",
            "sp": []

level 5: sp
==================

 {
                "code": "Solution",
                "type": "text"
}

==> I suggest we merge level 3 and 4 (merge item and itemExtra) so we just have "item" and the "sp" and we reduce 1 level on nesting.

==> in your node function i dont know how will you take care of 

 "_id": {
    "$oid": "6779fd29808e55c288cb3fd6"
  },

  but if possible i will like to keep the same ids in new data -- if possible.


sample data->
[{
  "_id": {
    "$oid": "6779fd29808e55c288cb3fd6"
  },
  "tcode": "fbise10math",
  "chapter": 1,
  "exercise": "1.1",
  "filename": "fbise10math_ch_1_ex_1.1_q_1_pt_1",
  "questionNo": 1,
  "part": 1,
  "name": "",
  "questionType": "paid",
  "status": "empty",
  "slides": [
    {
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
          "_id": {
            "$oid": "6779fd29808e55c288cb3fd8"
          }
        },
        {
          "uuid": "e82b65a9-7f24-4508-868e-a8fe7b122e77",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {
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
          "_id": {
            "$oid": "6779fd29808e55c288cb3fd9"
          }
        },
        {
          "uuid": "7e7dd9cb-53eb-47b8-bae0-56a5b79348f6",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {
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
          "_id": {
            "$oid": "6779fd29808e55c288cb3fda"
          }
        },
        {
          "uuid": "efcdef96-552d-4933-aac8-554957f9ac60",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {
            "startTime": 0,
            "endTime": 0,
            "code": "x^2+4x-21=-7",
            "type": "code",
            "sp": []
          },
          "_id": {
            "$oid": "6779fd29808e55c288cb3fdb"
          }
        },
        {
          "uuid": "5da7ea51-fb71-4799-8b77-ee36f627c3ae",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {
            "startTime": 0,
            "endTime": 0,
            "code": "x^2+4x-21+7=7",
            "type": "code",
            "sp": []
          },
          "_id": {
            "$oid": "6779fd29808e55c288cb3fdc"
          }
        },
        {
          "uuid": "3d185056-8bfb-4e2e-8a4f-3a10261f3d70",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {
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
          },
          "_id": {
            "$oid": "6779fd29808e55c288cb3fdd"
          }
        }
      ],
      "slideExtra": {
        "imagesUrl": "https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/"
      },
      "_id": {
        "$oid": "6779fd29808e55c288cb3fd7"
      }
    }
  ],
  "tags": [],
  "sortOrder": 0,
  "comments": "",
  "__v": 0
},
{
  "_id": {
    "$oid": "6779fd29808e55c288cb3fdf"
  },
  "tcode": "fbise10math",
  "chapter": 1,
  "exercise": "1.1",
  "filename": "fbise10math_ch_1_ex_1.1_q_1_pt_2",
  "questionNo": 1,
  "part": 2,
  "name": "",
  "questionType": "paid",
  "status": "empty",
  "slides": [
    {
      "uuid": "116e79a7-e9c9-466c-95bb-d931fb45a5a5",
      "startTime": 0,
      "endTime": 10,
      "type": "eqs",
      "version": "basic",
      "template": "",
      "items": [
        {
          "uuid": "21ec753b-aa39-4a99-88c9-7059f4d42998",
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
          "_id": {
            "$oid": "6779fd29808e55c288cb3fe1"
          }
        },
        {
          "uuid": "8d8cb01d-e31e-415a-8a5a-d1a383bf9415",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {
            "startTime": 0,
            "endTime": 0,
            "code": "\\frac{x^2+4}{3}-\\frac{x}{7}=1",
            "type": "code",
            "sp": []
          },
          "_id": {
            "$oid": "6779fd29808e55c288cb3fe2"
          }
        },
        {
          "uuid": "26ffabd0-df40-40fc-8cd5-2939d27932f8",
          "name": "",
          "content": "",
          "showAt": 0,
          "hideAt": 0,
          "itemExtra": {
            "startTime": 0,
            "endTime": 0,






