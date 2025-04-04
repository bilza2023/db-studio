# Transitioning from MongoDB to Relational Databases: A Case Study in Educational Content Management

## Introduction

When building applications, choosing the right database structure is crucial for long-term success. In this article, I'll walk through a real-world case study of transitioning from a MongoDB document-based structure to a relational database model. We'll explore the challenges of managing complex hierarchical educational content with varying data types and discuss best practices for designing a future-proof database schema.

## The Original Problem: MongoDB's Limitations

Our educational platform initially stored all content in MongoDB as a single collection. While this simplified initial development, we encountered several limitations:

1. **Search limitations with "RAW" data types**: MongoDB's querying capabilities became restricted when working with complex nested structures.
2. **Schema flexibility became a double-edged sword**: Without enforced structure, our data became inconsistent over time.
3. **Difficulty managing polymorphic content**: Our educational slides took multiple forms (equation-based and canvas-based), creating challenges in consistent processing.

Let's examine the original MongoDB structure:

```json
{
  "_id": {"$oid": "6779fd29808e55c288cb3fd6"},
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
    // Complex array with different slide types
  ],
  "tags": [],
  "sortOrder": 0,
  "comments": "",
  "__v": 0
}
```

The most challenging aspect was the `slides` array, which contained two fundamentally different data structures:

1. **Equation slides (type "eqs")**: Text-based slides with equations and explanatory content
2. **Canvas slides**: Interactive drawing canvases with various geometric and text elements

Each canvas slide could contain multiple canvas items (rectangles, circles, lines, text, etc.), each with its own unique properties.

## Designing a Relational Alternative

When transitioning to a relational database like SQLite (via Prisma) or PostgreSQL, we need to carefully normalize this structure while maintaining the relationships between entities.

### Key Design Decisions

#### 1. Entity Identification

First, we need to identify the primary entities in our data model:

- **Questions**: The top-level educational content units
- **Tags**: Categories or labels for questions
- **Slides**: Content containers belonging to questions
- **EQS Slides**: A specific type of slide containing text/equations
- **Canvas Slides**: A specific type of slide containing drawings
- **Canvas Items**: Individual elements within canvas slides

#### 2. Handling Polymorphic Relationships

The most critical design decision concerns how to model the canvas items. These items have both:
- Common properties (position, color, name)
- Type-specific properties (e.g., radius for circles, width/height for rectangles)

#### 3. Multi-Table Inheritance vs. JSON Storage

For polymorphic canvas items, we have three options:

**Option A: Single Table with All Possible Columns**
- Put all properties of all item types in one wide table
- Many NULL values for properties not applicable to certain types
- Not recommended due to database bloat and poor normalization

**Option B: Base Table + Type-Specific Tables (Recommended)**
- Create a base `canvas_items` table with common properties
- Create separate tables for each item type linking back to the base table
- Each type-specific table contains only relevant properties for that type

**Option C: Single Table with JSON Properties**
- Store common properties as columns
- Store type-specific properties as JSON
- Sacrifices query capabilities for implementation simplicity

## The Optimal Relational Schema

After careful analysis, here's the recommended structure:

### Main Entities

1. **Questions Table**
   - Core entity for educational content
   - Contains metadata like tcode, chapter, exercise, etc.
   - Links to slides via foreign key relationship

2. **Tags Table**
   - Stores content tags/categories
   - Many-to-many relationship with questions

3. **Slides Table (Base Table)**
   - Common properties for all slide types
   - Type column indicating "eqs" or "canvas"
   - Links to specific slide type tables

4. **EQS Slides Table**
   - Properties specific to equation/text slides
   - Links to EQS items

5. **EQS Items Table**
   - Content elements within EQS slides
   - May link to a special parameters table for complex properties

6. **Canvas Slides Table**
   - Properties specific to canvas slides
   - Background settings, grid configuration, etc.

### Canvas Items Structure (Table-per-Type Pattern)

7. **Canvas Items Table (Base Table)**
   - Common properties: UUID, name, position, rotation, color
   - Type identifier indicating specific item type
   - Foreign key to canvas slide

8. **Type-Specific Tables**
   - **Rectangles**: Width, height, fill properties
   - **Circles**: Radius, angles, fill properties
   - **Text Items**: Font, text content, size
   - **Lines**: Start/end coordinates, line properties
   - **Triangles**: Vertex coordinates, fill properties
   - **Angles**: Angle properties, ticks, radius
   - **Rays**: Start/end points, arrow properties
   - **Dots**: Label, radius, text properties
   - **Lists**: Array of text items, formatting
   - **Sprites**: Source, selected item, dimensions
   - **Images**: Source, dimensions
   - **Pie Charts**: Data points, labels, colors

Each type-specific table has a one-to-one relationship with an entry in the canvas items table.

## Advantages of This Approach

1. **Full Query Capabilities**: Every property is a proper column that can be searched and indexed
2. **Data Integrity**: The database enforces proper types and constraints
3. **Clear Documentation**: The schema itself documents the data structure
4. **Future-Proof**: Easy to add new item types without changing existing structures
5. **Performance**: Queries only need to join relevant tables

## Implementation Considerations

When implementing this design:

1. **Foreign Key Constraints**: Use cascading deletes where appropriate to maintain referential integrity
2. **Indexes**: Create indexes on commonly queried columns and join conditions
3. **Migration Strategy**: Plan a careful migration path with data validation

## Conclusion

Transitioning from MongoDB to a relational database requires careful analysis of your data structure. By identifying entities, relationships, and implementing proper normalization through the table-per-type pattern, you can create a robust, queryable database that provides better long-term maintainability than a document-based approach for complex, structured content.

This approach balances:
- Normalization best practices
- Query performance and flexibility
- Schema evolution capabilities
- Data integrity enforcement

The extra effort of creating type-specific tables pays dividends in code clarity, data quality, and application performance.