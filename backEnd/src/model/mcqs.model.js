import mongoose from 'mongoose'

const mcqSchema = new mongoose.Schema({
  questions : {
    type : [
      { q : String, options : [String], answer : String, _id : false }
    ]
  }
})


const Mcq = mongoose.model('Mcq', mcqSchema);

export default Mcq;
