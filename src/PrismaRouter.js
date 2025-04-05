
const express = require('express');

class PrismaRouter {
  constructor(prismaModel) {
    this.model = prismaModel;
    
    // Middleware for each route, default to an empty array if not provided
    this.middlewareForList    = [];
    this.middlewareForGetById = [];
    this.middlewareForCreate  = [];
    this.middlewareForUpdate  = [];
    this.middlewareForDelete  = [];
    this.extraRoutes = [];
  }

  // Method to add extra routes
  addExtraRoute(route) {
    this.extraRoutes.push(route);
  }

  getRouter() {
    const router = express.Router();

    // Attach routes with specific middleware arrays
    router.get('/', ...this.middlewareForList, this.listItems.bind(this)); 
    router.get('/:id', ...this.middlewareForGetById, this.getItemById.bind(this)); 
    router.post('/', ...this.middlewareForCreate, this.createItem.bind(this)); 
    router.put('/:id', ...this.middlewareForUpdate, this.updateItem.bind(this)); 
    router.delete('/:id', ...this.middlewareForDelete, this.deleteItem.bind(this)); 

    // Attach additional routes
    this.extraRoutes.forEach(route => {
      const { method, path, middlewares, handler } = route;
      router[method](path, ...middlewares, handler.bind(this));
    });
    
    return router;
  }

  // Controller methods adapted for Prisma
  async listItems(req, res) {
    try {
      const { sort = 'id', limit = 10, page = 1, fields, ...filters } = req.query;
      
      // Handle sorting (convert MongoDB-style sort to Prisma style)
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? 'desc' : 'asc';
      const orderBy = { [sortField]: sortOrder };
      
      // Handle field selection
      let select;
      if (fields) {
        select = fields.split(',').reduce((acc, field) => {
          acc[field.trim()] = true;
          return acc;
        }, {});
      }
      
      // Convert to numbers and calculate skip
      const limitNum = Number(limit);
      const pageNum = Number(page);
      const skip = limitNum * (pageNum - 1);
      
      // Process filters (primitive handling - may need adjustment for specific use cases)
      const where = {};
      Object.keys(filters).forEach(key => {
        where[key] = filters[key];
      });
      
      // Execute query
      const [data, total] = await Promise.all([
        this.model.findMany({
          where,
          select,
          orderBy,
          take: limitNum,
          skip
        }),
        this.model.count({ where })
      ]);

      res.status(200).json({ data, total, page: pageNum, limit: limitNum });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getItemById(req, res) {
    try {
      // Check if id is numeric and convert accordingly
      const id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id);
      
      const item = await this.model.findUnique({
        where: { id }
      });
      
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createItem(req, res) {
    try {
      const newItem = await this.model.create({
        data: req.body
      });
      
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateItem(req, res) {
    try {
      // Check if id is numeric and convert accordingly
      const id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id);
      
      const updatedItem = await this.model.update({
        where: { id },
        data: req.body
      });
      
      res.status(200).json(updatedItem);
    } catch (err) {
      // Prisma throws P2025 error when record not found
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(500).json({ error: err.message });
    }
  }

  async deleteItem(req, res) {
    try {
      // Check if id is numeric and convert accordingly
      const id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id);
      
      const deletedItem = await this.model.delete({
        where: { id }
      });
      
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
      // Prisma throws P2025 error when record not found
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PrismaRouter;