+---------------------+     +-----------------+
| Presentation        |--<--| Eqs             |
|---------------------|     |-----------------|
| tcode               |     | uuid (PK)       |
| chapter             |     | startTime       |
| exercise            |     | endTime         |
| filename            |     | type            |
| questionNo          |     | version         |
| part                |     | template        |
| name                |     | presentationId (FK)|
| questionType        |     |                 |
| status              |     +-----------------+
| slides (JSON)       |         ^
+---------------------+         |
                                 +-----------------+
                                 | EqItem          |
                                 |-----------------|
                                 | uuid (PK)       |
                                 | name            |
                                 | content         |
                                 | showAt          |
                                 | hideAt          |
                                 | eqId (FK)       |
                                 | itemExtra (JSON)|
                                 +-----------------+
                                        ^
                                        |
                                 +-----------------+
                                 | Sp              |
                                 |-----------------|
                                 | id (PK)         |
                                 | type            |
                                 | content         |
                                 | eqItemId (FK)   |
                                 +-----------------+

+---------------------+     +-----------------+
| Presentation        |--<--| CanvasSlide     |
|---------------------|     |-----------------|
| tcode               |     | uuid (PK)       |
| chapter             |     | startTime       |
| exercise            |     | endTime         |
| filename            |     | type            |
| questionNo          |     | version         |
| part                |     | template        |
| name                |     | presentationId (FK)|
| questionType        |     | slideExtra (JSON)|
| status              |     |                 |
| slides (JSON)       |     +-----------------+
+---------------------+         ^
                                 |
          +----------------------+----------------------+----------------------+
          |                      |                      |                      |
+-----------------+    +-----------------+    +-----------------+    + ... +
| CanvasItem_Angle|    | CanvasItem_Circle|    | CanvasItem_Dot   |
|-----------------|    |-----------------|    |-----------------|
| uuid (PK)       |    | uuid (PK)       |    | uuid (PK)       |
| canvasSlideId (FK)|    | canvasSlideId (FK)|    | canvasSlideId (FK)|
| ... (Angle Props)|    | ... (Circle Props)|    | ... (Dot Props)   |
+-----------------+    +-----------------+    +-----------------+

          +-----------------+
          | CanvasItem_Text |
          |-----------------|
          | uuid (PK)       |
          | canvasSlideId (FK)|
          | ... (Text Props) |
          +-----------------+