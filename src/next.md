 some small problems
 
 1:::
  the slideExtra needs to be seperate table (1-1 relationship with canvas slide object 1 slideExtra for each slide) 

 This must not be part of canvas slide
  // Background (formerly slideExtra)
  backgroundType        String    @default("background")
  backgroundColor       String    @default("#363446")
  backgroundOpacity     Float     @default(0.7)
  backgroundImage       String?
  showGrid             Boolean   @default(false)
  gridLineWidth        Float     @default(1)
  gridLineColor        String    @default("black")
  cellHeight           Float     @default(25)
  cellWidth            Float     @default(25)
   