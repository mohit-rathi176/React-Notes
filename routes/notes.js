const router = require('express').Router();

const Note = require('../models/Note');

const { noteValidation } = require('../validation/validate');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (!req.session.isAuth) {
        return res.status(401).json({ error: 'You are not authorized' });
    }
    else {
        next();
    }
}

// Get all notes
router.get('/', isAuthenticated, (req, res) => {

    const getNotes = async () => {
        try {
            const result = await Note.find(
                { email: req.session.user.email },
                { _id: 1, title: 1, description: 1 }
            );
            if (result.length == 0)
            {
                res.status(404).json({ error: "No notes found" });
            }
            else
            {
                res.status(200).json(result);
            }
        } catch(err) {
            console.log(err);
        }
    };

    getNotes();
});

// Get a note with id
router.get('/:id', isAuthenticated, (req, res) => {

    const getNote = async () => {
        try {
            const result = await Note.find(
                { id: parseInt(req.params.id) }
            );
            if (result.length == 0)
            {
                res.status(404).json({ error: "Note not found" });
            }
            else
            {
                res.status(200).json(result);
            }
        } catch(err) {
            console.log(err);
        }
    };

    getNote();
});

// Insert a note
router.post('/', isAuthenticated, (req, res) => {

    // Validate request, if invalid return 400 Bad Request
    const joi_result = noteValidation(req.body);
    if (joi_result.error)
        return res.status(400).json({ error: joi_result.error.details[0].message });

    // If valid, add the note
    const createNote = async () => {
        try {
            const note = new Note({
                email: req.session.user.email,
                title: req.body.title,
                description: req.body.description
            });
            const result = await note.save();
            res.status(201).json({ _id: result._id, title: result.title, description: result.description });
        } catch(err) {
            console.log(err);
        }
    };

    createNote();
});

// Update a note
router.put('/:id', isAuthenticated, (req, res) => {

    // Validate request, if invalid return 400 Bad Request
    const joi_result = noteValidation(req.body);
    
    if (joi_result.error)
        return res.status(400).json({ error: joi_result.error.details[0].message});
    
    // Update note
    const updateNote = async () => {
        try {
            const result = await Note.findOneAndUpdate(
                { _id: req.params.id },
                { title: req.body.title, description: req.body.description },
                { new: true }
            );
            if (result == null)
                return res.status(404).json({ error: "Note not found"});
            else
                return res.status(200).json(result);
        } catch(err) {
            console.log(err);
        }
    }

    updateNote();
});

// Delete a note
router.delete('/:id', isAuthenticated, (req, res) => {

    // Delete the note
    const deleteNote = async () => {
        try {
            const result = await Note.findOneAndDelete(
                { _id: req.params.id }
            );
            if (result == null)
                return res.status(404).json({ error: "Note not found" });
            else
                return res.status(200).json(result);
        } catch(err) {
            console.log(err);
        }
    }

    deleteNote();
});

module.exports = router;