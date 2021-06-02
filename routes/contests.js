const express = require('express');
const router = express.Router();
const { Contest } = require('../models/Contest');
const { Project } = require('../models/Project');

// [GET] read contest lists
router.get("/lists", async (req, res) => {
    const contests = await Contest.find();
    res.send(contests);
});

// [POST] create contest
router.post("/create", async (req, res) => {
    const contests = new Contest({
        contestName: req.body.contestName, // 공모전 이름
        title: req.body.title, // 게시글 제목
        author: req.body.author, // 작성자
        deadLine: req.body.deadLine, // 마감일자
        detail: req.body.detail, // 세부사항
        poster: req.body.poster, // 공모전 포스터
        category: req.body.category, // 공모전 카테고리
        organizer: req.body.organizer, // 주최기관
        totalMembers: req.body.totalMembers, // 전체 모집 인원
    });
    await contests.save();
    res.status(201);
    res.send(contests);
});

// [GET] read contest
router.get("/:id", async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id });
        res.send(project);
    } catch {
        res.status(404);
        res.send({ error: "Contest doesn't exist!" });
    }
});

module.exports = router;