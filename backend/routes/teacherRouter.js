const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("../db"); // Import the database connection
const moment = require("moment");

// Fetch all students
router.get("/all", async (req, res) => {
  console.log("called Studentall ");
  try {
    const [rows] = await db.query("SELECT * FROM user WHERE type = 'student'");
    // console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

router.get("/assignments/all", async (req, res) => {
  console.log("called assignment all ");
  try {
    const [rows] = await db.query("SELECT * FROM assignment");
    // console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

router.get("/assignments/submissions/:id", async (req, res) => {
  console.log("called assignment fetch");
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
        SELECT submitted.*, user.*
        FROM 
            submitted
        INNER JOIN 
            user
        ON 
            submitted.userid = user.id
        WHERE 
            submitted.assignmentid = ?;
      `, [id]);
    // console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});

router.get("/assignments/:id", async (req, res) => {
    console.log("called assignment fetch");
    const { id } = req.params;
    try {
      const [rows] = await db.query(`
          SELECT * FROM assignment
          WHERE id = ?;
        `, [id]);
      // console.log(rows);
  
      res.status(200).json({
        success: true,
        data: rows,
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, message: "Database query failed" });
    }
  });

// Add a new assignment
router.post("/assignments/add", async (req, res) => {
  console.log("called assignment add ");
  const { teacherName, subName, assignmentName, postDate, dueDate } = req.body;

  if (!teacherName || !subName || !assignmentName || !postDate || !dueDate) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO assignment (teacherName, subName, assignmentName, postDate, dueDate, aStatus) 
         VALUES (?, ?, ?, ?, ?,'Posted')`,
      [teacherName, subName, assignmentName, postDate, dueDate]
    );

    res.status(201).json({
      success: true,
      message: "Assignment added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add assignment" });
  }
});

router.put("/assignments/update/:id", async (req, res) => {
  console.log("Called update assignment");
  const { id } = req.params; // Assignment ID from the route parameter
  const { teacherName, subName, assignmentName, postDate, dueDate, aStatus } =
    req.body; // Updated data from the request body
  console.log(req.body);
  // Validate input
  // if (!subName || !postDate || !dueDate || teacherName || assignmentName || aStatus) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "All fields are required",
  //   });
  // }

  try {
    // Update the assignment in the database
    const [result] = await db.query(
      `UPDATE assignment 
         SET teacherName = ?, 
             subName = ?, 
             assignmentName = ?, 
             postDate = ?, 
             dueDate = ?, 
             aStatus = ? 
         WHERE assignment.id = ?;`,
      [teacherName, subName, assignmentName, postDate, dueDate, aStatus, id]
    );
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the assignment",
    });
  }
});

// Update a student
router.put("/student/update/:studentId", async (req, res) => {
  console.log("called Studentupdate");
  const { studentId } = req.params; // Extract studentId from the URL
  const { name, email } = req.body; // Extract updated fields from the request body

  try {
    // Validate the input
    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Email are required" });
    }

    // Update the student in the database
    const [result] = await db.query(
      "UPDATE user SET name = ?, email = ? WHERE id = ? AND type = 'student'",
      [name, email, studentId]
    );

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ success: true, message: "Student updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update student" });
  }
});

module.exports = router;

//   // Define where to store the uploaded files (e.g., 'uploads' directory)
//   const uploadDirectory = path.join(__dirname, 'uploads');

//   // Make sure the upload directory exists
//   if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory);
//   }

//   // Middleware to handle file upload
//   const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory temporarily

//   router.post('/upload/:assignmentId', async (req, res) => {
//     console.log("called upload");
//     console.log(req.body);
//     const assignmentId = req.params.assignmentId;
//     const file = req.body.fileContent;
//     const userId = req.body.userId; // Make sure the frontend sends userId in the request body

//     if (userId) {
//       console.log("Entered If");
//       try {

//         const fileData = {
//           assignmentId: assignmentId,
//           userId: userId,
//           status: 'submitted',
//           submittedDate :  moment().format('YYYY-MM-DD'),
//           fileContent : file,
//         };

//         // Save file metadata and file path in the database
//         const [result1] = await db.query(
//           'SELECT * FROM `submitted` WHERE userId=? AND assignmentId=?',
//           [fileData.userId, fileData.assignmentId]
//         );
//         let f = true;
//         result1.forEach(element => {
//           if (element.status === 'submitted'){
//             res.status(200).json({ success: true, message:'Already Submitted' });
//             f=false;
//           }
//         });
//         if (f){
//           const [result] = await db.query(
//             'INSERT INTO `submitted` (`userId`, `assignmentId`, `content`, `status`, `submittedDate`) VALUES (?, ?, ?, ?, ?)',
//             [fileData.userId, fileData.assignmentId, fileData.fileContent, fileData.status, fileData.submittedDate]
//           );
//           console.log(result);
//           res.status(200).json({ success: true, fileId: result.insertId });
//         }
//         // Respond with success
//       } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ success: false, message: 'Failed to save file data' });
//       }
//     } else {
//       res.status(400).json({ success: false, message: 'No file uploaded or userId missing' });
//     }
//   });

// module.exports = router;
