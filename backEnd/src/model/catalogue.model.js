import mongoose from 'mongoose'

// dummy
// const catalogue = [
//   {
//     standared : "12th",
//     subjects : [
//       {subject : "English", chapters : ["1.king", "2.Queen"]},
//       {subject : "Hindi", chapters : ["1.king", "2.Queen"]},
//       {subject : "Science", chapters : ["1.king", "2.Queen"]},
//       {subject : "Physics", chapters : ["1.king", "2.Queen"]},
//     ]
//   },
// ]

const catalogueSchema = new mongoose.Schema({
  standard : {
    type : String,
    required : true,
    unique : true,
    trime : true,
  },
  subjects : [{
    _id : false,
    subject : {
      type : String,
      required : true,
    },
    chapters : {
      type : [String],
      default : [],
      required : true,
    } 
  }]
})

const Catalogue = mongoose.model('Catelogue', catalogueSchema);
export default Catalogue;

