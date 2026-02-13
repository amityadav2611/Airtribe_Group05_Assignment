const router = require("express").Router();
const controller = require("../controllers/budget.controller");

router.get("", controller.getBudget);
router.post("", controller.setBudget);


module.exports = router;
