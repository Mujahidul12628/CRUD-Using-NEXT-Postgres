
const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
    console.log("Fetching Students Data");
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            console.error("Error fetching students:", error);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.status(200).json(results.rows);
    });
};

const getStudentById = (req, res) => {
    console.log("Fetching Student Data by ID");
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            console.error("Error fetching student by ID:", error);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.status(200).json(results.rows);
    });
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // Check if this email already exists
    pool.query(queries.checkEmailExist, [email], (error, results) => {
        if (error) {
            console.error("Error checking email existence:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (results.rows.length) {
            // Email already exists, send a response
            res.send("Email already exists");
        } else {
            // Email doesn't exist, proceed to insert the new student
            pool.query(queries.addStudent, [name, email, age, dob], (error, insertResults) => {
                if (error) {
                    console.error("Error adding new student:", error);
                    res.status(500).send("Internal Server Error");
                    return;
                }
                res.status(201).send("Student added successfully");
            });
        }
    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) {
            console.error("Error removing student:", error);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (results.rowCount === 0) {
            res.status(404).send("Student with this ID does not exist in the database");
        } else {
            res.status(200).send("Student removed successfully");
        }
    });
};


const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    // Check if a student with the specified ID exists
    pool.query(queries.updateStudent, [id], (error, results) => {
        if (error) {
            console.error("Error checking if student exists:", error);
            res.status(500).send("Internal Server Errorttttt");
            return;
        }

        const noStudentFound = results.rowCount === 0;

        if (noStudentFound) {
            res.status(404).send("Student with this ID does not exist in the database");
            return;
        }

        // Update the student's name
        pool.query(queries.updateStudent, [name, id], (updateError, updateResults) => {
            if (updateError) {
                console.error("Error updating student:", updateError);
                res.status(500).send("Internal Server Error");
                return;
            }
            res.status(200).send("Student updated successfully");
        });
    });
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};
