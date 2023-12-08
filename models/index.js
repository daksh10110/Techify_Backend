const Student = require("./Student");
const Mentor = require("./Mentor");

// Define the many-to-many relationship
Student.belongsToMany(Mentor, {
  through: "student_mentor",
  as: "subscribed_mentors",
  foreignKey: "student_id",
});

Mentor.belongsToMany(Student, {
  through: "student_mentor",
  as: "subscribed_students",
  foreignKey: "mentor_id",
});

module.exports = {
  Student,
  Mentor,
};
