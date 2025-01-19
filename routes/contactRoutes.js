const express = require("express");
const {
  getContact,
  CreateContact,
  UpdateContact,
  DeleteContact,
  getContactDetails,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/api/contacts").get(getContact).post(CreateContact);
router
  .route("/api/contacts/:id")
  .get(getContactDetails)
  .put(UpdateContact)
  .delete(DeleteContact);

module.exports = router;
