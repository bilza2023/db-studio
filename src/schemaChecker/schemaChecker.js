// Main validation framework for Prisma schema

/**
 * Global validation settings
 */
const ValidationSettings = {
    // Whether to continue validation after encountering errors
    continueOnError: true,
    // Detail level for reporting (1-minimal, 2-standard, 3-verbose)
    detailLevel: 2,
    // Whether to include field path in error messages
    includeFieldPath: true
  };
  
  /**
   * Main validation result class
   */
  class ValidationResult {
    constructor() {
      this.valid = true;
      this.errors = [];
      this.warnings = [];
      this.info = [];
    }
  
    addError(message, path = null) {
      this.valid = false;
      this.errors.push({ message, path });
    }
  
    addWarning(message, path = null) {
      this.warnings.push({ message, path });
    }
  
    addInfo(message) {
      this.info.push(message);
    }
  
    merge(otherResult, prefix = '') {
      if (!otherResult.valid) this.valid = false;
      
      // Merge errors with path prefix
      otherResult.errors.forEach(error => {
        this.errors.push({
          message: error.message,
          path: error.path ? `${prefix}${error.path}` : prefix
        });
      });
      
      // Merge warnings with path prefix
      otherResult.warnings.forEach(warning => {
        this.warnings.push({
          message: warning.message,
          path: warning.path ? `${prefix}${warning.path}` : prefix
        });
      });
      
      // Merge info messages
      this.info = [...this.info, ...otherResult.info];
      
      return this;
    }
  
    get summary() {
      return {
        valid: this.valid,
        errorCount: this.errors.length,
        warningCount: this.warnings.length,
        infoCount: this.info.length
      };
    }
  
    generateReport() {
      let report = "=== Validation Report ===\n\n";
      report += `Status: ${this.valid ? 'VALID' : 'INVALID'}\n`;
      report += `Errors: ${this.errors.length}\n`;
      report += `Warnings: ${this.warnings.length}\n`;
      report += `Info: ${this.info.length}\n\n`;
  
      if (this.errors.length > 0) {
        report += "=== ERRORS ===\n";
        this.errors.forEach((error, index) => {
          report += `${index + 1}. ${error.message}${error.path ? ` (at: ${error.path})` : ''}\n`;
        });
        report += "\n";
      }
  
      if (this.warnings.length > 0) {
        report += "=== WARNINGS ===\n";
        this.warnings.forEach((warning, index) => {
          report += `${index + 1}. ${warning.message}${warning.path ? ` (at: ${warning.path})` : ''}\n`;
        });
        report += "\n";
      }
  
      if (ValidationSettings.detailLevel >= 3 && this.info.length > 0) {
        report += "=== INFO ===\n";
        this.info.forEach((info, index) => {
          report += `${index + 1}. ${info}\n`;
        });
      }
  
      return report;
    }
  }
  
  /**
   * Core validation helper functions
   */
  const Validators = {
    /**
     * Check if a value is present and not null/undefined
     */
    required(value, fieldName) {
      const result = new ValidationResult();
      
      if (value === null || value === undefined) {
        result.addError(`Required field '${fieldName}' is missing or null`);
      } else {
        result.addInfo(`Field '${fieldName}' present`);
      }
      
      return result;
    },
  
    /**
     * Check if a value is within a specified range
     */
    range(value, fieldName, min, max) {
      const result = new ValidationResult();
      
      if (value === null || value === undefined) {
        result.addWarning(`Cannot validate range for null/undefined value: ${fieldName}`);
        return result;
      }
      
      if (value < min) {
        result.addError(`Field '${fieldName}' value ${value} is below minimum ${min}`);
      } else if (value > max) {
        result.addError(`Field '${fieldName}' value ${value} is above maximum ${max}`);
      } else {
        result.addInfo(`Field '${fieldName}' is within valid range (${min}-${max})`);
      }
      
      return result;
    },
  
    /**
     * Check if a string matches a specific pattern
     */
    pattern(value, fieldName, regex, description) {
      const result = new ValidationResult();
      
      if (value === null || value === undefined) {
        result.addWarning(`Cannot validate pattern for null/undefined value: ${fieldName}`);
        return result;
      }
      
      if (!regex.test(value)) {
        result.addError(`Field '${fieldName}' does not match expected ${description || 'pattern'}`);
      } else {
        result.addInfo(`Field '${fieldName}' matches expected ${description || 'pattern'}`);
      }
      
      return result;
    },
  
    /**
     * Check if a value is one of the allowed values
     */
    oneOf(value, fieldName, allowedValues) {
      const result = new ValidationResult();
      
      if (value === null || value === undefined) {
        result.addWarning(`Cannot validate enumeration for null/undefined value: ${fieldName}`);
        return result;
      }
      
      if (!allowedValues.includes(value)) {
        result.addError(`Field '${fieldName}' value '${value}' is not one of the allowed values: ${allowedValues.join(', ')}`);
      } else {
        result.addInfo(`Field '${fieldName}' has valid enumeration value: ${value}`);
      }
      
      return result;
    },
  
    /**
     * Check if a string is a valid JSON
     */
    validJson(value, fieldName) {
      const result = new ValidationResult();
      
      if (value === null || value === undefined) {
        result.addWarning(`Cannot validate JSON for null/undefined value: ${fieldName}`);
        return result;
      }
      
      try {
        JSON.parse(value);
        result.addInfo(`Field '${fieldName}' contains valid JSON`);
      } catch (e) {
        result.addError(`Field '${fieldName}' does not contain valid JSON: ${e.message}`);
      }
      
      return result;
    },
  
    /**
     * Check if a string is a valid URL
     */
    validUrl(value, fieldName) {
      const result = new ValidationResult();
      
      if (value === null || value === undefined) {
        result.addWarning(`Cannot validate URL for null/undefined value: ${fieldName}`);
        return result;
      }
      
      try {
        new URL(value);
        result.addInfo(`Field '${fieldName}' contains valid URL`);
      } catch (e) {
        result.addError(`Field '${fieldName}' does not contain valid URL: ${e.message}`);
      }
      
      return result;
    },
  
    /**
     * Check if a relationship field has the expected number of related items
     */
    relationshipCount(items, fieldName, min, max = null) {
      const result = new ValidationResult();
      
      if (items === null || items === undefined) {
        result.addError(`Relationship '${fieldName}' is null or undefined`);
        return result;
      }
      
      const count = Array.isArray(items) ? items.length : 0;
      
      if (count < min) {
        result.addError(`Relationship '${fieldName}' has too few items (${count}), expected at least ${min}`);
      } else if (max !== null && count > max) {
        result.addError(`Relationship '${fieldName}' has too many items (${count}), expected at most ${max}`);
      } else {
        result.addInfo(`Relationship '${fieldName}' has valid count: ${count}`);
      }
      
      return result;
    }
  };
  
  /**
   * Top-level validation function for Presentation
   */
  async function checkPresentation(presentation, prisma) {
    const result = new ValidationResult();
    
    if (!presentation) {
      result.addError("Presentation object is null or undefined");
      return result;
    }
    
    result.addInfo(`Starting validation for Presentation ID: ${presentation.id}`);
    
    // Basic field validation
    result.merge(Validators.required(presentation.id, "id"));
    result.merge(Validators.required(presentation.tcode, "tcode"));
    result.merge(Validators.required(presentation.chapter, "chapter"));
    result.merge(Validators.required(presentation.exercise, "exercise"));
    result.merge(Validators.required(presentation.filename, "filename"));
    result.merge(Validators.required(presentation.questionNo, "questionNo"));
    result.merge(Validators.required(presentation.part, "part"));
    result.merge(Validators.required(presentation.questionType, "questionType"));
    result.merge(Validators.required(presentation.status, "status"));
    
    // Validate numeric ranges
    result.merge(Validators.range(presentation.chapter, "chapter", 1, 100));
    result.merge(Validators.range(presentation.questionNo, "questionNo", 1, 1000));
    result.merge(Validators.range(presentation.part, "part", 0, 100));
    result.merge(Validators.range(presentation.sortOrder, "sortOrder", 0, 10000));
    
    // Validate enumerations
    result.merge(Validators.oneOf(presentation.status, "status", ["draft", "review", "published", "archived"]));
    
    // Validate JSON fields
    result.merge(Validators.validJson(presentation.tags, "tags"));
    
    // Load relationships if not already loaded
    const hasEqSlides = presentation.eqSlides !== undefined;
    const hasCanvasSlides = presentation.canvasSlides !== undefined;
    
    let eqSlides = presentation.eqSlides;
    let canvasSlides = presentation.canvasSlides;
    
    if (!hasEqSlides && prisma) {
      eqSlides = await prisma.eqSlide.findMany({
        where: { presentationId: presentation.id },
        include: {
          items: {
            include: {
              sps: true
            }
          }
        }
      });
    }
    
    if (!hasCanvasSlides && prisma) {
      canvasSlides = await prisma.canvasSlide.findMany({
        where: { presentationId: presentation.id },
        include: {
          slideExtra: true,
          textItems: true,
          rectangleItems: true,
          circleItems: true,
          imageItems: true,
          lineItems: true,
          rayItems: true,
          dotItems: true,
          ellipseItems: true,
          iconItems: true,
          listItems: true,
          pieChartItems: true,
          angleItems: true,
          spriteItems: true,
          triangleItems: true
        }
      });
    }
    
    // Validate slides existence
    if (!eqSlides && !canvasSlides) {
      result.addWarning("No slides found in presentation");
    } else {
      if (eqSlides && eqSlides.length > 0) {
        result.addInfo(`Found ${eqSlides.length} EqSlides`);
        
        // Process each EqSlide
        for (const [index, slide] of eqSlides.entries()) {
          const slideResult = await checkEqSlide(slide, prisma);
          result.merge(slideResult, `eqSlides[${index}].`);
        }
      }
      
      if (canvasSlides && canvasSlides.length > 0) {
        result.addInfo(`Found ${canvasSlides.length} CanvasSlides`);
        
        // Process each CanvasSlide
        for (const [index, slide] of canvasSlides.entries()) {
          const slideResult = await checkCanvasSlide(slide, prisma);
          result.merge(slideResult, `canvasSlides[${index}].`);
        }
      }
    }
    
    return result;
  }
  
  /**
   * Validation function for EqSlide
   */
  async function checkEqSlide(slide, prisma) {
    const result = new ValidationResult();
    
    if (!slide) {
      result.addError("EqSlide object is null or undefined");
      return result;
    }
    
    result.addInfo(`Validating EqSlide ID: ${slide.id}`);
    
    // Basic field validation
    result.merge(Validators.required(slide.id, "id"));
    result.merge(Validators.required(slide.uuid, "uuid"));
    result.merge(Validators.required(slide.startTime, "startTime"));
    result.merge(Validators.required(slide.endTime, "endTime"));
    result.merge(Validators.required(slide.type, "type"));
    result.merge(Validators.required(slide.version, "version"));
    
    // Validate uuids
    result.merge(Validators.pattern(slide.uuid, "uuid", /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i, "UUID format"));
    
    // Validate time ranges
    result.merge(Validators.range(slide.startTime, "startTime", 0, 9999999));
    result.merge(Validators.range(slide.endTime, "endTime", 0, 9999999));
    
    if (slide.startTime >= slide.endTime) {
      result.addError(`EqSlide startTime (${slide.startTime}) must be less than endTime (${slide.endTime})`);
    }
    
    // Load items if not already loaded
    const hasItems = slide.items !== undefined;
    let items = slide.items;
    
    if (!hasItems && prisma) {
      items = await prisma.eqItem.findMany({
        where: { slideId: slide.id },
        include: {
          sps: true
        }
      });
    }
    
    // Check items
    if (!items || items.length === 0) {
      result.addWarning("EqSlide has no items");
    } else {
      result.addInfo(`Found ${items.length} EqItems`);
      
      // Process each EqItem
      for (const [index, item] of items.entries()) {
        const itemResult = await checkEqItem(item, prisma);
        result.merge(itemResult, `items[${index}].`);
      }
    }
    
    return result;
  }
  
  /**
   * Validation function for EqItem
   */
  async function checkEqItem(item, prisma) {
    const result = new ValidationResult();
    
    if (!item) {
      result.addError("EqItem object is null or undefined");
      return result;
    }
    
    result.addInfo(`Validating EqItem ID: ${item.id}`);
    
    // Basic field validation
    result.merge(Validators.required(item.id, "id"));
    result.merge(Validators.required(item.uuid, "uuid"));
    result.merge(Validators.required(item.showAt, "showAt"));
    result.merge(Validators.required(item.hideAt, "hideAt"));
    result.merge(Validators.required(item.startTime, "startTime"));
    result.merge(Validators.required(item.endTime, "endTime"));
    result.merge(Validators.required(item.type, "type"));
    
    // Validate uuids
    result.merge(Validators.pattern(item.uuid, "uuid", /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i, "UUID format"));
    
    // Validate time ranges
    result.merge(Validators.range(item.showAt, "showAt", 0, 9999999));
    result.merge(Validators.range(item.hideAt, "hideAt", 0, 9999999));
    result.merge(Validators.range(item.startTime, "startTime", 0, 9999999));
    result.merge(Validators.range(item.endTime, "endTime", 0, 9999999));
    
    // Check time sequence
    if (item.showAt > item.hideAt) {
      result.addError(`EqItem showAt (${item.showAt}) must be less than or equal to hideAt (${item.hideAt})`);
    }
    
    if (item.startTime > item.endTime) {
      result.addError(`EqItem startTime (${item.startTime}) must be less than or equal to endTime (${item.endTime})`);
    }
    
    // Load solution points if not already loaded
    const hasSps = item.sps !== undefined;
    let sps = item.sps;
    
    if (!hasSps && prisma) {
      sps = await prisma.sp.findMany({
        where: { itemId: item.id }
      });
    }
    
    // Check solution points
    if (sps && sps.length > 0) {
      result.addInfo(`Found ${sps.length} Solution Points`);
      
      // Process each solution point
      for (const [index, sp] of sps.entries()) {
        const spResult = await checkSp(sp);
        result.merge(spResult, `sps[${index}].`);
      }
    } else {
      // No error for missing solution points, as they might be optional
      result.addInfo("EqItem has no solution points");
    }
    
    return result;
  }
  
  /**
   * Validation function for Solution Points (Sp)
   */
  async function checkSp(sp) {
    const result = new ValidationResult();
    
    if (!sp) {
      result.addError("Solution Point object is null or undefined");
      return result;
    }
    
    result.addInfo(`Validating Solution Point ID: ${sp.id}`);
    
    // Basic field validation
    result.merge(Validators.required(sp.id, "id"));
    result.merge(Validators.required(sp.code, "code"));
    result.merge(Validators.required(sp.type, "type"));
    
    // No specific range or pattern checks for solution points
    // Add more validation if needed for specific solution point types
    
    return result;
  }
  
  /**
   * Validation function for CanvasSlide
   */
  async function checkCanvasSlide(slide, prisma) {
    const result = new ValidationResult();
    
    if (!slide) {
      result.addError("CanvasSlide object is null or undefined");
      return result;
    }
    
    result.addInfo(`Validating CanvasSlide ID: ${slide.id}`);
    
    // Basic field validation
    result.merge(Validators.required(slide.id, "id"));
    result.merge(Validators.required(slide.uuid, "uuid"));
    result.merge(Validators.required(slide.type, "type"));
    
    // Validate uuids
    result.merge(Validators.pattern(slide.uuid, "uuid", /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i, "UUID format"));
    
    // Type should be "canvas"
    result.merge(Validators.oneOf(slide.type, "type", ["canvas"]));
    
    // Check SlideExtra (1-to-1 relationship)
    if (slide.slideExtra) {
      result.addInfo("CanvasSlide has SlideExtra");
      const slideExtraResult = await checkSlideExtra(slide.slideExtra);
      result.merge(slideExtraResult, "slideExtra.");
    } else {
      // Load SlideExtra if not already loaded
      if (prisma) {
        const slideExtra = await prisma.slideExtra.findUnique({
          where: { slideId: slide.id }
        });
        
        if (slideExtra) {
          const slideExtraResult = await checkSlideExtra(slideExtra);
          result.merge(slideExtraResult, "slideExtra.");
        } else {
          result.addWarning("CanvasSlide missing SlideExtra");
        }
      }
    }
    
    // Check all canvas items
    await checkCanvasItems(slide, result);
    
    return result;
  }
  
  /**
   * Validation function for SlideExtra
   */
  async function checkSlideExtra(slideExtra) {
    const result = new ValidationResult();
    
    if (!slideExtra) {
      result.addError("SlideExtra object is null or undefined");
      return result;
    }
    
    result.addInfo(`Validating SlideExtra ID: ${slideExtra.id}`);
    
    // Basic field validation
    result.merge(Validators.required(slideExtra.id, "id"));
    result.merge(Validators.required(slideExtra.type, "type"));
    result.merge(Validators.required(slideExtra.color, "color"));
    result.merge(Validators.required(slideExtra.opacity, "opacity"));
    result.merge(Validators.required(slideExtra.backgroundColor, "backgroundColor"));
    result.merge(Validators.required(slideExtra.cellHeight, "cellHeight"));
    result.merge(Validators.required(slideExtra.cellWidth, "cellWidth"));
    
    // Validate color formats
    const colorPattern = /^#[0-9A-Fa-f]{6}$/;
    result.merge(Validators.pattern(slideExtra.color, "color", colorPattern, "hex color format"));
    result.merge(Validators.pattern(slideExtra.backgroundColor, "backgroundColor", colorPattern, "hex color format"));
    result.merge(Validators.pattern(slideExtra.gridLineColor, "gridLineColor", colorPattern, "hex color format"));
    
    // Validate numeric ranges
    result.merge(Validators.range(slideExtra.opacity, "opacity", 0, 1));
    result.merge(Validators.range(slideExtra.cellHeight, "cellHeight", 1, 1000));
    result.merge(Validators.range(slideExtra.cellWidth, "cellWidth", 1, 1000));
    result.merge(Validators.range(slideExtra.gridLineWidth, "gridLineWidth", 0.1, 10));
    
    // Check backgroundImage URL if present
    if (slideExtra.backgroundImage) {
      result.merge(Validators.validUrl(slideExtra.backgroundImage, "backgroundImage"));
    }
    
    return result;
  }
  
  /**
   * Helper function to check all canvas items
   */
  async function checkCanvasItems(slide, result) {
    // Check text items
    if (slide.textItems && slide.textItems.length > 0) {
      result.addInfo(`Found ${slide.textItems.length} Text Items`);
      for (const [index, item] of slide.textItems.entries()) {
        const itemResult = await checkCanvasText(item);
        result.merge(itemResult, `textItems[${index}].`);
      }
    }
    
    // Check rectangle items
    if (slide.rectangleItems && slide.rectangleItems.length > 0) {
      result.addInfo(`Found ${slide.rectangleItems.length} Rectangle Items`);
      for (const [index, item] of slide.rectangleItems.entries()) {
        const itemResult = await checkCanvasRectangle(item);
        result.merge(itemResult, `rectangleItems[${index}].`);
      }
    }
    
    // Check circle items
    if (slide.circleItems && slide.circleItems.length > 0) {
      result.addInfo(`Found ${slide.circleItems.length} Circle Items`);
      for (const [index, item] of slide.circleItems.entries()) {
        const itemResult = await checkCanvasCircle(item);
        result.merge(itemResult, `circleItems[${index}].`);
      }
    }
    
    // Check image items
    if (slide.imageItems && slide.imageItems.length > 0) {
      result.addInfo(`Found ${slide.imageItems.length} Image Items`);
      for (const [index, item] of slide.imageItems.entries()) {
        const itemResult = await checkCanvasImage(item);
        result.merge(itemResult, `imageItems[${index}].`);
      }
    }
    
    // Check line items
    if (slide.lineItems && slide.lineItems.length > 0) {
      result.addInfo(`Found ${slide.lineItems.length} Line Items`);
      for (const [index, item] of slide.lineItems.entries()) {
        const itemResult = await checkCanvasLine(item);
        result.merge(itemResult, `lineItems[${index}].`);
      }
    }
    
    // Check ray items
    if (slide.rayItems && slide.rayItems.length > 0) {
      result.addInfo(`Found ${slide.rayItems.length} Ray Items`);
      for (const [index, item] of slide.rayItems.entries()) {
        const itemResult = await checkCanvasRay(item);
        result.merge(itemResult, `rayItems[${index}].`);
      }
    }
    
    // Check dot items
    if (slide.dotItems && slide.dotItems.length > 0) {
      result.addInfo(`Found ${slide.dotItems.length} Dot Items`);
      for (const [index, item] of slide.dotItems.entries()) {
        const itemResult = await checkCanvasDot(item);
        result.merge(itemResult, `dotItems[${index}].`);
      }
    }
    
    // Check ellipse items
    if (slide.ellipseItems && slide.ellipseItems.length > 0) {
      result.addInfo(`Found ${slide.ellipseItems.length} Ellipse Items`);
      for (const [index, item] of slide.ellipseItems.entries()) {
        const itemResult = await checkCanvasEllipse(item);
        result.merge(itemResult, `ellipseItems[${index}].`);
      }
    }
    
    // Check icon items
    if (slide.iconItems && slide.iconItems.length > 0) {
      result.addInfo(`Found ${slide.iconItems.length} Icon Items`);
      for (const [index, item] of slide.iconItems.entries()) {
        const itemResult = await checkCanvasIcon(item);
        result.merge(itemResult, `iconItems[${index}].`);
      }
    }
    
    // Check list items
    if (slide.listItems && slide.listItems.length > 0) {
      result.addInfo(`Found ${slide.listItems.length} List Items`);
      for (const [index, item] of slide.listItems.entries()) {
        const itemResult = await checkCanvasList(item);
        result.merge(itemResult, `listItems[${index}].`);
      }
    }
    
    // Check pie chart items
    if (slide.pieChartItems && slide.pieChartItems.length > 0) {
      result.addInfo(`Found ${slide.pieChartItems.length} Pie Chart Items`);
      for (const [index, item] of slide.pieChartItems.entries()) {
        const itemResult = await checkCanvasPieChart(item);
        result.merge(itemResult, `pieChartItems[${index}].`);
      }
    }
    
    // Check angle items
    if (slide.angleItems && slide.angleItems.length > 0) {
      result.addInfo(`Found ${slide.angleItems.length} Angle Items`);
      for (const [index, item] of slide.angleItems.entries()) {
        const itemResult = await checkCanvasAngle(item);
        result.merge(itemResult, `angleItems[${index}].`);
      }
    }
    
    // Check sprite items
    if (slide.spriteItems && slide.spriteItems.length > 0) {
      result.addInfo(`Found ${slide.spriteItems.length} Sprite Items`);
      for (const [index, item] of slide.spriteItems.entries()) {
        const itemResult = await checkCanvasSprite(item);
        result.merge(itemResult, `spriteItems[${index}].`);
      }
    }
    
    // Check triangle items
    if (slide.triangleItems && slide.triangleItems.length > 0) {
      result.addInfo(`Found ${slide.triangleItems.length} Triangle Items`);
      for (const [index, item] of slide.triangleItems.entries()) {
        const itemResult = await checkCanvasTriangle(item);
        result.merge(itemResult, `triangleItems[${index}].`);
      }
    }
  }
  
  /**
   * Validation functions for specific Canvas item types
   */
  
  async function checkCanvasText(item) {
    const result = new ValidationResult();
    
    if (!item) {
      result.addError("CanvasText object is null or undefined");
      return result;
    }
    
    // Base canvas item validations
    result.merge(checkBaseCanvasItem(item, "CanvasText"));
    
    // Text-specific validations
    result.merge(Validators.required(item.text, "text"));
    result.merge(Validators.required(item.fontSize, "fontSize"));
    result.merge(Validators.required(item.fontFamily, "fontFamily"));
    result.merge(Validators.required(item.width, "width"));
    result.merge(Validators.required(item.height, "height"));
    
    // Range validations
    result.merge(Validators.range(item.fontSize, "fontSize", 1, 200));
    result.merge(Validators.range(item.width, "width", 0, 10000));
    result.merge(Validators.range(item.height, "height", 0, 10000));
    
    return result;
  }
  
  async function checkCanvasRectangle(item) {
    const result = new ValidationResult();
    
    if (!item) {
      result.addError("CanvasRectangle object is null or undefined");
      return result;
    }
    
    // Base canvas item validations
    result.merge(checkBaseCanvasItem(item, "CanvasRectangle"));
    
    // Rectangle-specific validations
    result.merge(Validators.required(item.width, "width"));
    result.merge(Validators.required(item.height, "height"));
    result.merge(Validators.required(item.lineWidth, "lineWidth"));
    
    // Range validations
    result.merge(Validators.range(item.width, "width", 0, 10000));
    result.merge(Validators.range(item.height, "height", 0, 10000));
    result.merge(Validators.range(item.lineWidth, "lineWidth", 0.1, 50));
    
    return result;
  }
  
  async function checkCanvasCircle(item) {
    const result = new ValidationResult();
    
    if (!item) {
      result.addError("CanvasCircle object is null or undefined");
      return result;
    }
    
    // Base canvas item validations
    result.merge(checkBaseCanvasItem(item, "CanvasCircle"));
    
    // Circle-specific validations
    result.merge(Validators.required(item.radius, "radius"));
    result.merge(Validators.required(item.startAngle, "startAngle"));
    result.merge(Validators.required(item.endAngle, "endAngle"));
    // result.
}