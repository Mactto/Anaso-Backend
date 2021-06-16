const express = require('express');
const router = express.Router();
const {Project} = require('../models/Project');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get("/lists", async (req, res) => {
    const projects = await Project.find()
    res.send(projects)
})
module.exports = router;

router.post("/create", passport.authenticate('jwt', {session: false}), async (req, res) => {
    const projects = new Project({
        title: req.body.title,
        participant: req.body.participant,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        thumbnail: req.body.thumbnail,
        role: req.body.role,
        explanation: req.body.content,
    })
    await projects.save()
    res.send(projects)
})

router.get("/:id", async (req, res) => {
    try{
        const project = await Project.findOne({ _id: req.params.id })
        res.send(project)
    } catch {
        res.status(404)
        res.send({ error: "Project doesn't exist!" })
    }
})

router.patch("/:id",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id })

        if (req.body.title) {
            project.title = req.body.title
        }

        if (req.body.participant) {
            project.participant = req.body.participant
        }

        if (req.body.thumbnail) {
            project.thumbnail = req.body.thumbnail
        }

        if (req.body.role) {
            project.role = req.body.role
        }

        if (req.body.explanation) {
            project.explanation = req.body.explanation
        }
        await project.save()
        res.send(project)
    } catch {
        res.status(404)
        res.send({ error: "Project doesn't exist!" })
    }
    
})

router.delete("/delete/:id",passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        await Project.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Project doesn't exist! "})
    }
})