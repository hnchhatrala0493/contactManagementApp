const asyncHandler = require("express-async-handler");

const contactModel = require("../models/contacts");

const getContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

const CreateContact = asyncHandler(async (req, res) => {
  const { fname, lname, email, phone } = req.body;
  if (!fname || !lname || !email || !phone) {
    res.status(400);
    throw new Error("This is required.");
  }
  const storeContact = await contactModel.create({
    fname,
    lname,
    email,
    phone,
  });
  res.status(201).json(storeContact);
});

const UpdateContact = asyncHandler(async (req, res) => {
  const id = await contactModel.findById(req.params.id);
  if (!id) {
    res.status(404);
    throw new Error("Contact not found.");
  }
  const UpdateContactDetails = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(UpdateContactDetails);
});
const getContactDetails = asyncHandler(async (req, res) => {
  const id = await contactModel.findById(req.params.id);
  if (!id) {
    res.status(404);
    throw new Error("Contact not found.");
  }
  const getContactDetails = await contactModel.findById(req.body, {
    new: true,
  });
  res.status(200).json(getContactDetails);
});

const DeleteContact = asyncHandler(async (req, res) => {
  const contact = await contactModel.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found.");
  }
  await contactModel.findByIdAndDelete(contact);
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  CreateContact,
  getContactDetails,
  UpdateContact,
  DeleteContact,
};
