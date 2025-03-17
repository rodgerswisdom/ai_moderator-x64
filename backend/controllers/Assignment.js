const user = require('../models/user_model');
const assignment = require('../models/assignment_model');

const auth = require('../middleware/authenticate');
const checkRole = require('../middleware/authorize');

class Assignment{
    
    async isStudent(userId) {
        try {
            const user = await users.findById(userId);
            if (!user) {
                return false;
            }
            if (user.role === "student") {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    static async createAssignment(req, res){
        try{
            const { title, description, dueDate, workspaceId } = req.body;

            const assignment = new assignment({
                title,
                description,
                dueDate,
                workspaceId
            });

            await assignment.save();
            res.status(201).send(assignment);
        }catch(e){
            res.status(400).send(e);
        }
    }

    static async getAssignment(req, res){
        try{
            const assignment = await assignment.find({});
            res.status(200).send(assignment);
        }catch(e){
            res.status(400).send(e, "Error fetching assignments");
        }
    }

    static async getAssignmentById(req, res){
        try{
            const assignment = await assignment.findById(req.params.id);
            if(!assignment){
                return res.status(404).send("Assignment not found");
            }
            res.status(200).send(assignment);
        }catch(e){
            res.status(400).send(e, "Error fetching assignment");
        }
    }

    static async addStudent(req, res){
        try{
            const assignment = await assignment.findById(req.params.id);
            if(!assignment){
                return res.status(404).send("Assignment not found");
            }
            const student = await user.findById(req.body.studentId);
            if(!student){
                return res.status(404).send("Student not found");
            }
            assignment.students.push(student._id);
            await assignment.save();
            res.status(200).send(assignment);
        }catch(e){
            res.status(400).send(e, "Error adding student to assignment");
        }
    }
}

module.exports = Assignment;