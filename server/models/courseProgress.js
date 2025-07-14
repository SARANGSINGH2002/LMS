import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
    lectureId:{type:String},
    viewed:{type:Boolean}
});

const courseProgressSchema = new mongoose.Schema({
    userId:{type:String},
    courseId:{type:String},
    completed:{type:Boolean},
    lectureProgress:[lectureProgressSchema]
});

//viewed: and completed: 
// if all lectures have been viewed....then it is completed

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);