const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {authMiddleware} = require("../middleware");
const {jsonPassword} = require("../password");
const {User,Notes} = require("../Database");
const {NotesSchema} = require("../zod");

router.use(express.json());

//Creates a new note
router.post("/",authMiddleware,async (req,res)=>{
    const body = req.body;
    const response = NotesSchema.safeParse(body);
    if(!response.success){
        return res.status(203).json({
            error:"Incorrect Inputs"
        })
    }

    await Notes.create({title:body.title,content:body.content,userId: req.userId});
    return res.json({
        msg: "Note Added"
    })

})

//Fetch all the notes for the user
router.get("/notes",authMiddleware,async (req,res)=>{
    const notes = await Notes.find({userId: req.userId});
    if(!notes.length){ //Since find() returns an array even if its empty
        return res.json({
            msg: "No notes yet"
        })
    } else{
        return res.json({
            notes: notes
        })
    }

})

//Fetches a single note
router.get("/notes/:id",authMiddleware,async (req,res)=>{
    const note = await Notes.findOne({_id:req.params.id,userId: req.userId});
    if(!note){
        return res.status(403).json({
            error:"Note not found"
        })
    }else{
        return res.json({note});
    }
})

//Updates a single note
router.put("/notes/:id",authMiddleware,async (req,res)=>{
    const body = req.body;
    const response = NotesSchema.safeParse(body); 
    if(!response.success){
        return res.status(400).json({
            error:"Invalid inputs"
        })
    }
    await Notes.updateOne({_id:req.params.id, userId:req.userId},{
        $set:{title:body.title, content:body.content}
    })
    return res.json({
        msg:"Note updated successfully"
    })
})

//Deletes a note
router.delete("/notes/:id",authMiddleware,async (req,res)=>{
    await Notes.findOneAndDelete({_id:req.params.id, userId: req.userId});
    return res.json({
        msg:"Note deleted successfully"
    })
})


module.exports = router;