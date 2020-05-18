const express = require("express");

const Projects = require("../helpers/projectModel.js");
const Actions = require("../helpers/actionModel.js");

const router = express.Router();

router.use((req, res, next) => {
    console.log("action router");
    next();
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    Actions.get(id)
        .then((action) => {
            console.log(id);

            res.status(200).json(action);
        })
        .catch((err) => {
            res.status(500).json({ message: "database error" });
        });
});

router.post("/", (req, res) => {
    const body = req.body;
    Actions.insert(body)
        .then((action) => {
            if (
                body.project_id === undefined ||
                body.description === undefined ||
                body.notes === undefined ||
                body.completed === undefined
            ) {
                res.status(400).json({
                    message:
                        "project id, description, notes, or completed status missing",
                });
            } else {
                res.status(200).json(action);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "database error" });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
        .then((count) => {
            console.log(id);
            if (count > 0) {
                res.status(200).json({ message: "actions removed" });
            } else {
                res.status(404).json({
                    message:
                        "The actions with the specified ID does not exist.",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "database error" });
        });
});
router.put("/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    Actions.update(id, changes)
        .then(() => {
            if (
                changes.project_id === undefined ||
                changes.description === undefined ||
                changes.notes === undefined ||
                changes.completed === undefined
            ) {
                res.status(400).json({
                    errorMessage:
                        "Please provide description, notes, and completed status for the actions.",
                });
            } else {
                res.status(200).json(changes);
            }
        })
        .catch((error) => {
            res.status(500).json({
                error:
                    "The actions database information could not be retrieved.",
            });
        });
});

module.exports = router;
