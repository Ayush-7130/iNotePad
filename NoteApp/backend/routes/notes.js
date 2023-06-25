const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');

var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')

// Route 1: Get All Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


// Route 2: Add new notes using: POST "/api/notes/addnote". Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Enter valid Description').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // If there are error return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNotes = await notes.save();

        res.json(saveNotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

// Route 3: Update notes using: PUT "/api/notes/updatenotes". Login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create new Notes object
        const newNotes = {};
        if (newNotes.title = title);
        if (newNotes.description = description);
        if (newNotes.tag = tag);

        // Find the Note to be update it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("Not Found") }
        if (notes.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.send(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})


// Route 4: Delete notes using: DELETE "/api/notes/deletenotes". Login required
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Find the Note to be update it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("Not Found") }

        // Verification
        if (notes.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        // Allow Deletion after verified
        notes = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", notes: notes });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
})

module.exports = router