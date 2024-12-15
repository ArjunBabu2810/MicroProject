const express = require("express");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require("../db"); // Import the database connection
const moment = require('moment');

// Fetch all students
router.get("/all", async (req, res) => {
  console.log("called all ");
  try {
    const [rows] = await db.query("SELECT * FROM assignment"); 
    console.log(rows);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Database query failed" });
  }
});


  
  // Define where to store the uploaded files (e.g., 'uploads' directory)
  const uploadDirectory = path.join(__dirname, 'uploads');
  
  // Make sure the upload directory exists
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }
  
  // Middleware to handle file upload
  const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory temporarily
  
  router.post('/upload/:assignmentId', async (req, res) => {
    console.log("called upload");
    console.log(req.body);
    const assignmentId = req.params.assignmentId;
    const file = req.body.fileContent;
    const userId = req.body.userId; // Make sure the frontend sends userId in the request body
  
    if (userId) {
      console.log("Entered If");
      try {
  
        const fileData = {
          assignmentId: assignmentId,
          userId: userId,
          status: 'submitted',
          submittedDate :  moment().format('YYYY-MM-DD'),
          fileContent : file,
        };
  
        // Save file metadata and file path in the database
        const [result1] = await db.query(
          'SELECT * FROM `submitted` WHERE userId=? AND assignmentId=?',
          [fileData.userId, fileData.assignmentId]
        );
        let f = true;
        result1.forEach(element => {
          if (element.status === 'submitted'){
            res.status(200).json({ success: true, message:'Already Submitted' });
            f=false;
          }
        });
        if (f){
          const [result] = await db.query(
            'INSERT INTO `submitted` (`userId`, `assignmentId`, `content`, `status`, `submittedDate`) VALUES (?, ?, ?, ?, ?)',
            [fileData.userId, fileData.assignmentId, fileData.fileContent, fileData.status, fileData.submittedDate]
          );
          console.log(result);        
          res.status(200).json({ success: true, fileId: result.insertId });
        }
        // Respond with success
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: 'Failed to save file data' });
      }
    } else {
      res.status(400).json({ success: false, message: 'No file uploaded or userId missing' });
    }
  });
  

module.exports = router;


module.exports = router;
