import Catalogue from "../model/catalogue.model.js"

export const getCatalogue  = async (_req, res) => {
  try {
    const catalogue = await Catalogue.find();
    res.status(200).send(catalogue);
  } catch (error) {
    res.status(500).send({message : "something Went wrong"});
  }
}

export const addStandard = async (req, res) => {

  // POST /api/catalogue/standard
  // expected data from frontEnd
  // {
  //     "standard" : "10th",
  //     "data" : {
  //         "subject" : "English",
  //         "chapters" : ["The Lion King", "Linear Equation", "The Moon"]
  //     }
  // }
  
  try {
    const { standard, data } = req.body;

    const catalogue = new Catalogue({
      standard,
      subjects : [{ 
          subject : data.subject,
          chapters : data.chapters
      }]
    })

    await catalogue.save();
    res.status(200).send({message : "Success"});
  } catch (error) {

    if (error.code == 11000) {
      return res.status(409).send({message : "Standard already Exist"});
    } else {
      return res.status(500).send({ message : "Something went wrong"});
    }
  }
}

export const deleteStandard = async (req, res) => {
  // DELETE /api/catalogue/:standard
  try {
    const { standard } = req.params;

    const result = await Catalogue.deleteOne({ standard });

    if (result.deletedCount === 0) {
      return res.status(404).send({standard,  message: "Standard not found" });
    }

    res.status(200).send({message: "Standard deleted successfully" });

  } catch (error) {
    res.status(500).send({
      message: "Something wrong in deletion.",
    });
  }
};

export const addNewSubject = async (req, res) => {

  // POST /api/catalogue/:standard/subject
  // Body : {
  //   "subject" : "English"
  //   "chapters" : [{title : "The Lion King", ref : id || null},{..}, {..}]
  // }
  
  try {
    const { standard } = req.params;
    const { chapters, subject } = req.body;

    const result = await Catalogue.updateOne(
      {
        standard,
        "subjects.subject": {
          $not: { $regex: new RegExp(`^${subject}$`, "i") }
        }
      },
      {
        $push: { subjects: { subject, chapters } }
      }
    );

    if (result.modifiedCount === 0 && result.matchedCount === 0) {
      return res.status(409).send({ message: "Something went wrong" });
    }

    res.status(200).send({message : "Success"});
  } catch (error) {
    res.status(500).send({message : "Something went wrong"});
  }
}

export const deleteSubject = async (req, res) => {
  // DELETE /api/catalogue/:standard/:subject
  try {
    const { standard, subject } = req.params;


    const result = await Catalogue.updateOne(
      { standard },
      {
        $pull: {
          subjects: {
            subject: subject
          }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Standard not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Subject not found" });
    }

    res.status(200).send({ message: "Subject deleted successfully" });

  } catch (error) {
    res.status(500).send({
      message: "Something wrong in deletion.",
    });
  }
};

export const addChapter = async (req, res) => {
  // PUT /api/catalogue/:standard/:subject/:chapter
  try {
    const { standard, subject, chapter } = req.params;

    const result = await Catalogue.updateOne(
      {
        standard,
        "subjects.subject": { $regex: new RegExp(`^${subject}$`, "i") }
      },
      {
        $addToSet: {
          "subjects.$.chapters": { title : chapter }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Standard or Subject not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(409).send({ message: "Chapter already exists" });
    }

    res.status(200).send({ message: "Chapter added successfully" });

  } catch (error) {
    res.status(500).send({ error,
      message: "Something went wrong while adding chapter.",
    });
  }
};


export const deleteChapter = async (req, res) => {
  // DELETE /api/catalogue/:standard/:subject/:chapter
  try {
    const { standard, subject, chapter } = req.params;

    const result = await Catalogue.updateOne(
      {
        standard,
        "subjects.subject": subject
      },
      {
        $pull: {
          "subjects.$.chapters": { title : chapter }
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Standard or Subject not found" });
    }

    if (result.modifiedCount === 0) {
      return res.status(404).send({ message: "Chapter not exists" });
    }

    res.status(200).send({ message: "Chapter removed successfully" });

  } catch (error) {
    res.status(500).send({
      message: "Something went wrong while removing chapter.",
    });
  }
}

