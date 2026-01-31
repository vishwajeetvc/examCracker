import mongoose from 'mongoose'

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
      type : [
        {
          title : String, 
          ref : { 
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Mcq',
            default : null
          },
        }
      ],
      default : [],
      required : true,
    } 
  }]
})

const Catalogue = mongoose.model('Catalogue', catalogueSchema);
export default Catalogue;


// dummy
// const catalogue = [
//   {
//     standared : "12th",
//     subjects : [
//       {subject : "English", chapters : [{title : "hi" , ref : id || null}},
//       {subject : "English", chapters : [{title : "hi" , ref : id || null}},
//       {subject : "English", chapters : [{title : "hi" , ref : id || null}},
//     ]
//   },
// ]

