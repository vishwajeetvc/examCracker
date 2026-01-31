import Catalogue from '../model/catalogue.model.js';
import Mcq from '../model/mcqs.model.js';
import mongoose from 'mongoose';

export const getMcqs = async (req, res) => {
  try {

    const { chapterId } = req.params;
    const mcqs = await Mcq.findById( chapterId );

    return res.status(200).send({mcqs});

  } catch (error) {
    return res.status(500).send({ message: 'Something went wrong' });
  }
}

export const addMcqs = async (req, res)=> {

  // body : {
  //   questions : [
  //     { q : "What is your name", options : ['ram','lak','mohan','shyam'], ans : '3'},
  //     { q : "What is your name", options : ['ram','lak','mohan','shyam'], ans : '3'},
  //   ]
  // }

  const { standard, subject, chapterId } = req.params;
  const { questions } = req.body;

  if (!mongoose.Types.ObjectId.isValid(chapterId)) {
    return res.status(400).send({ message: 'Invalid MCQ id' });
  }

  if(!Array.isArray(questions)){
    return res.status(400).send({ message: 'Something went wrong' });
  }

  try {

    const standardCatalogue = await Catalogue.findOne({standard});

    const sub = standardCatalogue.subjects.find(sub => sub.subject == subject);

    if(!sub){
      return res.status(404).send({ message: 'Subject Not found' });
    }

    const chapter = sub.chapters.find(chap => chap._id == chapterId);

    if(!chapter){
      return res.status(404).send({ message: 'Chapter Not found' });
    }

    if(!chapter.ref){

      const result = await Mcq.insertOne({questions : questions})
      chapter.ref = result._id;
      await standardCatalogue.save();
      return res.status(200).send({ chapter,  message: 'Mcq uploaded' });

    } else {

      return res.status(409).send({ message: 'Chapter already exist' });

    }

  } catch (error) {
    return res.status(500).send({ error, message: 'Something went wrong' });
  }
}

export const addQuestion = async (req, res) => {
  // PUT {{server}}/api/mcq/<objectId>
  // expected in body
  //   {
  //     "question": {
  //         "q": "Ram",
  //         "options": [ "yellow","green" ],
  //         "answer": "3"
  //     }
  // }
  try {
    const { chapterId } = req.params;
    const { question } = req.body;

    const result = await Mcq.findByIdAndUpdate(
      chapterId, { $addToSet : { questions : question } }
    )
    
    return res.status(200).send({ result, message: 'Question uploaded Successfully' });

  } catch (error) {

    return res.status(500).send({ error, message: 'Something went wrong' });

  }

}
