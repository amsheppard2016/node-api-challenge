const express = require("express");

const Projects = require("../helpers/projectModel.js");
const Actions = require("../helpers/actionModel.js");

const router = express.Router();

router.use((req, res, next) => {
    console.log("project router");
    next();
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    Projects.get(id)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((err) => {
            res.status(500).json({ message: "database error" });
        });
});

router.get("/:id/actions", (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
        .then((project_actions) => {
            if (!id) {
                res.status(404).json({
                    message:
                        "The project actions with the specified ID does not exist.",
                });
            } else {
                res.status(200).json(project_actions);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "database error" });
        });
});

router.post("/", (req, res) => {
    const body = req.body;
    Projects.insert(body)
        .then((project) => {
            if (
                body.name === undefined ||
                body.description === undefined ||
                body.completed === undefined
            ) {
                res.status(400).json({
                    message: "name, description, or completed status missing",
                });
            } else {
                res.status(200).json(project);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "database error" });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
        .then((count) => {
            console.log(id);
            if (count > 0) {
                res.status(200).json({ message: "Project removed" });
            } else {
                res.status(404).json({
                    message:
                        "The project with the specified ID does not exist.",
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
    Projects.update(id, changes)
        .then(() => {
            if (
                changes.name === undefined ||
                changes.description === undefined ||
                changes.completed === undefined
            ) {
                res.status(400).json({
                    errorMessage:
                        "Please provide name, description, and completed status for the project.",
                });
            } else {
                res.status(200).json(changes);
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: "The project information could not be retrieved.",
            });
        });
});

module.exports = router;
