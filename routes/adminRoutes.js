const express = require("express")
const router = express.Router()
const adminControllers = require("../controllers/admin/adminControllers")
// const verifyUser = require("../middleware/middleware")

router.post("/signin", adminControllers.adminSignin)
router.post("/enterEmployeeDetails", adminControllers.enterEmployeeDetails)
router.get("/getEmployeeDetails", adminControllers.getEmployeeDetails)
router.put("/editEmployeeDetails/:id", adminControllers.editEmployeeDetails)
router.delete("/deleteEmployeeDetails/:id", adminControllers.deleteEmployeeDetails)


module.exports = router

