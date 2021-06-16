const express = require('express');
const router = express.Router();
const { Contest } = require('../models/Contest');

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
router.get("/detail/:id", async (req, res) => {
    try {
        const contest = await Contest.findOne({ _id: req.params.id });
        contest.hitCount += 1;
        await contest.save();
        res.send(contest);
    } catch {
        res.status(404);
        res.send({ error: "Contest doesn't exist!" });
    }
});

// [PATCH] update contest
router.patch("/:id", async (req, res) => {
    try {
        const contest = await Contest.findOne({ _id: req.params.id });

        if (req.body.contestName) { // 공모전 이름
            contest.contestName = req.body.contestName;
        }

        if (req.body.title) { // 게시글 제목
            contest.title = req.body.title;
        }

        if (req.body.deadLine) { // 마감일자
            contest.deadLine = req.body.deadLine;
        }

        if (req.body.detail) { // 세부사항
            contest.detail = req.body.detail;
        }

        if (req.body.poster) { // 공모전 포스터
            contest.poster = req.body.poster;
        }

        if (req.body.category) { // 공모전 카테고리
            contest.category = req.body.category;
        }

        if (req.body.organizer) { // 주최기관
            contest.organizer = req.body.organizer
        }

        if (req.body.totalMembers) { // 전체 모집 인원
            contest.totalMembers = req.body.totalMembers;
        }
        
        await contest.save();
        res.send(contest);
    } catch {
        res.status(404);
        res.send({ error: "contest doesn't exist!" });
    }
});

// [DELETE] delete contest
router.delete("/delete/:id", async (req, res) => {
    try{
        await Contest.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "contest doesn't exist! "});
    }
});

// [PATCH] participate contest
router.patch("/participate/:id", async (req, res) => {
    try {
        const contest = await Contest.findOne({ _id: req.params.id });
        contest.volunteers.push( req.body.volunteer );
        await contest.save();
        res.send(contest);
    } catch {
        res.status(404);
        res.send({ error: "Contest doesn't exist!" });
    }
});

// [PATCH] confirm member at contest
router.patch("/confirmMember/:id", async (req, res) => {
    try {
        const contest = await Contest.findOne({ _id: req.params.id });

        if (contest.confirmedMembers.membersNum >= contest.totalMembers) {
            res.status(400);
            res.send("Need to increase more total members.");
            return
        }

        const memberIdx = contest.volunteers.indexOf(req.body.member);
        if (memberIdx > -1) contest.volunteers.splice(memberIdx, 1);
        else throw new Error("isNotVolunteer");

        contest.confirmedMembers.membersList.push( req.body.member );
        contest.confirmedMembers.membersNum += 1;

        if (contest.confirmedMembers.membersNum === contest.totalMembers) {
            contest.closingStatus = true;
        }

        await contest.save();

        res.status(201);
        res.send(contest);
    } catch (e) {
        if (e.message === "isNotVolunteer") {
            res.status(403);
            res.send({ error: "The member is not volunteer." });
        }
        res.status(404);
        res.send({ error: "Contest doesn't exist!" });
    }
});

module.exports = router;