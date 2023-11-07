const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const contactsRouter = require("../controllers/contacts");
const cors = require('cors');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use(cors({credentials: true, origin: `${process.env.ORIG1N}`}));

router.post("/api/v1/contact", contactsRouter.sendEmail);

router.get("/*", (req, res) => {
    res.status(404).send("Error 404 - Not Found");
});

module.exports = router;