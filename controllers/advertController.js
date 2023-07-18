const advertService = require('../services/advertService');

const createAdvert = async (req, res) => {
  const userData = req.body;
  const userId = req?.user?.id;
  try {
    const result = await advertService.CreateAdvert(userData, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const approveAdvert = async (req, res) => {
  const { id } = req.params;
  console.log(`This is the id to be approved ${id}`);
  try {
    const result = await advertService.approveAdvert(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: `This is the error: ${error.message}` });
  }
};

const getAllUnapprovedAdverts = async (req, res) => {
  try {
    const result = await advertService.getAllUnapprovedAdverts();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: `This is the error: ${error.message}` });
  }
};

const getAllApprovedAdverts = async (req, res) => {
  try {
    const result = await advertService.getAllApprovedAdverts();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: `This is the error: ${error.message}` });
  }
};

const rejectAdvert = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await advertService.rejectAdvert(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: `This is the error: ${error.message}` });
  }
};

const getUserAdverts = async (req, res) => {
  const userId = req?.user?.id;
  try {
    const result = await advertService.getUserAdverts(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: `This is the error: ${error.message}` });
  }
};

const getApprovedUserAdverts = async (req, res) => {
  const userId = req?.user?.id;
  try {
    const result = await advertService.getApprovedUserAdverts(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: `This is the error: ${error.message}` });
  }
};

module.exports = {
  createAdvert,
  approveAdvert,
  getAllUnapprovedAdverts,
  getAllApprovedAdverts,
  rejectAdvert,
  getUserAdverts,
  getApprovedUserAdverts
};
