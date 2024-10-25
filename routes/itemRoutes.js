const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route    GET /api/items
// @desc     Get all items
// @access   Public
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST /api/items
// @desc     Add a new item
// @access   Public
router.post('/', async (req, res) => {
  const { name, quantity, description } = req.body;
  try {
    const newItem = new Item({
      name,
      quantity,
      description,
    });
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT /api/items/:id
// @desc     Update an item
// @access   Public
router.put('/:id', async (req, res) => {
  const { name, quantity, description } = req.body;
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    item.name = name || item.name;
    item.quantity = quantity || item.quantity;
    item.description = description || item.description;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE /api/items/:id
// @desc     Delete an item
// @access   Public
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    await item.remove();
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;