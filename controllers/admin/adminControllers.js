const sequelize = require("../../config/config");
const f_Employee = sequelize.db.f_Employee;
const t_login = sequelize.db.t_login;
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require('path');

// const { body, validationResult } = require('express-validator');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "../../uploads"); // The folder where the image will be stored
    const uploadPath = path.join(__dirname, '../../uploads'); // Set the upload path
    cb(null, uploadPath);
  },
  limits: 800000,
  // filename: function (req, file, cb) {
  //   cb(null, Date.now() + "-" + file.originalname); // Rename the file to avoid name conflicts
  // },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Add timestamp to file name to avoid duplicates
  }
});
const upload = multer({ storage: storage }).single("image"); // Handling single image file upload

const adminSignin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await t_login.findOne({
      where: {
        f_userName: username,
      },
    });

    // console.log(user);


    // Validate the provided username and password
    if (user) {
      // Generate JWT token for admin
      const jwtToken = jwt.sign({ user: username }, process.env.JWTSECRETKEY, {
        expiresIn: "1h",
      });
      res.status(200).send({
        message: "Admin signin successful",
        jwtToken: jwtToken,
        role: "admin",
      });
    } else {
      // Invalid username or password
      // console.log("sd card");

      res.status(400).send({
        message:
          "Invalid username or password. Please enter the correct admin credentials.",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

// const enterEmployeeDetails = async (req, res) => {
//   // First, handle file upload using multer
//   upload(req, res, async function (err) {
//     if (err) {
//       // console.log("user");

//       return res
//         .status(500)
//         .send({ status: "failed", message: "File upload failed", error: err });
//     }

//     // Now proceed to handle form data
//     try {
//       const { name, email, mobile, designation, gender, course, image } = req.body;
//       // console.log(req);
//       console.log(user);


//       // Validation checks for input fields
//       if (!name || name.length < 3) {
//         return res.status(400).send({
//           status: "failed",
//           message: "Name must be at least 3 characters long.",
//         });
//       }
//       if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
//         return res.status(400).send({
//           status: "failed",
//           message: "Please provide a valid email address.",
//         });
//       }
//       if (!mobile || !/^\d{10}$/.test(mobile)) {
//         return res.status(400).send({
//           status: "failed",
//           message: "Mobile number must be 10 digits long.",
//         });
//       }
//       if (!designation) {
//         return res
//           .status(400)
//           .send({ status: "failed", message: "Designation is required." });
//       }
//       if (!["male", "female", "other"].includes(gender)) {
//         return res
//           .status(400)
//           .send({ status: "failed", message: "Please select a valid gender." });
//       }
//       if (!course) {
//         return res
//           .status(400)
//           .send({ status: "failed", message: "Course field is required." });
//       }

//       // Check if the user already exists by email
//       const user = await f_Employee.findOne({
//         where: {
//           email: email,
//         },
//       });



//       if (user) {
//         return res
//           .status(403)
//           .send({ status: "failed", message: "Email already exists." });
//       } else {
//         // If email is unique, create the user
//         const newUser = await f_Employee.create({
//           f_image: req.file ? req.file.filename : null,
//           f_Name: name,
//           f_Email: email,
//           f_Mobile: mobile,
//           f_Designation: designation,
//           f_gender: gender,
//           f_Course: course,
//           f_Createdate: new Date().toString(),
//         });

//         // console.log(newUser);


//         res.status(200).send({
//           status: "success",
//           message: "User has been added successfully.",
//         });
//       }
//     } catch (error) {
//       // console.log("Error:", error);
//       res.status(500).send({
//         status: "failed",
//         message: "An error occurred while adding the user.",
//       });
//     }
//   });
// };

const enterEmployeeDetails = async (req, res) => {
  // First, handle file upload using multer
  upload(req, res, async function (err) {
    if (err) {
      console.error("File upload error:", err); // Log the error
      return res.status(500).send({ status: "failed", message: "File upload failed", error: err });
    }

    // console.log("Uploaded file:", req.body.image); // Log the uploaded file
    // console.log("Form data:", req.body); // Log form data

    // Now proceed to handle form data
    try {
      const { name, email, mobile, designation, gender, course } = req.body;

      // Validation checks for input fields
      if (!name || name.length < 3) {
        return res.status(400).send({ status: "failed", message: "Name must be at least 3 characters long." });
      }
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).send({ status: "failed", message: "Please provide a valid email address." });
      }
      if (!mobile || !/^\d{10}$/.test(mobile)) {
        return res.status(400).send({ status: "failed", message: "Mobile number must be 10 digits long." });
      }
      if (!designation) {
        return res.status(400).send({ status: "failed", message: "Designation is required." });
      }
      if (!["male", "female", "other"].includes(gender)) {
        return res.status(400).send({ status: "failed", message: "Please select a valid gender." });
      }
      if (!course) {
        return res.status(400).send({ status: "failed", message: "Course field is required." });
      }

      // Check if the user already exists by email
      const user = await f_Employee.findOne({ where: { f_Email: email } });

      if (user) {
        return res.status(403).send({ status: "failed", message: "Email already exists." });
      } else {
        // If email is unique, create the user
        const newUser = await f_Employee.create({
          f_Image: req.file ? `/uploads/${req.file.filename}` : null, // Store file path
          f_Name: name,
          f_Email: email,
          f_Mobile: mobile,
          f_Designation: designation,
          f_gender: gender,
          f_Course: course,
          f_Createdate: new Date().toString(),
        });

        // console.log("New user created:", newUser);

        res.status(200).send({
          status: "success",
          message: "User has been added successfully.",
        });
      }
    } catch (error) {
      // console.error("Error during employee creation:", error); // Log the error
      res.status(500).send({
        status: "failed",
        message: "An error occurred while adding the user.",
      });
    }
  });
};


const getEmployeeDetails = async (req, res) => {
  // const id = req.user.user.id
  const employees = await f_Employee.findAll();
  // console.log(employees);


  res.status(200).send({ data: employees });
};

const editEmployeeDetails = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res
        .status(500)
        .send({ status: "failed", message: "File upload failed", error: err });
    }

    try {
      const { name, email, mobile, designation, gender, course, image } = req.body;
      const { id } = req.params
      // console.log(id, "id ok ");


      // Validate required fields
      if (!name || !email || !mobile || !designation || !gender || !course) {
        return res
          .status(400)
          .send({ status: "failed", message: "All fields are required." });
      }

      // Check if the user exists
      const user = await f_Employee.findOne({ where: { f_id: id } });

      if (!user) {
        return res
          .status(404)
          .send({ status: "failed", message: "Employee not found." });
      }

      // Update the employee's details
      await f_Employee.update(
        {
          f_Name: name,
          f_Email: email,
          f_Mobile: mobile,
          f_Designation: designation,
          f_gender: gender,
          f_Course: course,
          f_Image: req.file ? `/uploads/${req.file.filename}` : null, // Store file path
        },
        { where: { f_id: id } }
      );

      res.status(200).send({
        status: "success",
        message: "Employee details updated successfully.",
      });
    } catch (error) {
      console.error("Error updating employee details:", error);
      res.status(500).send({
        status: "failed",
        message: "An error occurred while updating employee details.",
      });
    }
  });
};

// const 

const deleteEmployeeDetails = async (req, res) => {
  const employeeId = req.params.id; // Get employee ID from the URL
  console.log(employeeId);


  try {
    // Check if the employee exists
    const employee = await f_Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ status: 'failed', message: 'Employee not found' });
    }

    // Delete the employee from the database
    await f_Employee.destroy({ where: { f_id: employeeId } });

    // Return success response
    return res.status(200).json({ status: 'success', message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error during delete operation:', error);
    return res.status(500).json({ status: 'failed', message: 'An error occurred while deleting the employee' });
  }
}

module.exports = {
  adminSignin,
  enterEmployeeDetails,
  getEmployeeDetails,
  editEmployeeDetails,
  deleteEmployeeDetails
};
