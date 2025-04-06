const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');

// @route POST /api/transactions/send
// @desc Send money to another user
router.post('/send', protect, async (req, res) => {
  const { receiverEmail, amount } = req.body;

  try {
    const sender = req.user;
    const receiver = await User.findOne({ email: receiverEmail });

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    if (sender._id.equals(receiver._id)) {
      return res.status(400).json({ message: "You can't send money to yourself" });
    }

    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
    });

    await transaction.save();

    res.status(201).json({ message: 'Transaction successful', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/transactions/history
// @desc Get user's transaction history
router.get('/history', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .populate('sender', 'name email')
      .populate('receiver', 'name email')
      .sort({ timestamp: -1 });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
