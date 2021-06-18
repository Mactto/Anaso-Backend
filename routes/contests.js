const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Contest } = require('../models/Contest');

// [GET] read contest lists
router.get("/lists", async (req, res) => {
    const contests = await Contest.find();
    res.send(contests);
});

// [POST] create contest
router.post("/create", passport.authenticate('jwt', {session: false}), async (req, res) => {
    const positions = req.body.positions;
    
    const contest = new Contest({
        contestName: req.body.contestName, // 공모전 이름
        title: req.body.title, // 게시글 제목
        author: req.body.author, // 작성자
        deadLine: req.body.deadLine, // 마감일자
        supportScale: req.body.supportScale, // 지원 규모
        detail: req.body.detail, // 세부사항
        poster: req.body.poster, // 공모전 포스터
        category: req.body.category, // 공모전 카테고리
        organizer: req.body.organizer, // 주최기관
        homepage: req.body.homepage, // 공모전 주소
        totalMembers: req.body.totalMembers, // 전체 모집 인원
    });
    positions.forEach(element => {
        contest.positions.push({
            positionName: element.positionName,
            recruitNumbers: element.recruitNumbers,
            applyNumbers: 0,
            applyMembers: [],
            confirmedNumbers: 0,
            confirmedMembers: []
        });
    });
    await contest.save();
    res.status(201);
    res.send(contest);
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
router.patch("/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
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

        if (req.body.supportScale) { // 지원 규모
            contest.supportScale = req.body.supportScale;
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

        if (req.body.organizer) { // 주최기관
            contest.organizer = req.body.organizer
        }

        if (req.body.homepage) { // 전체 모집 인원
            contest.homepage = req.body.homepage;
        }

        if (req.body.positions) {
            contest.positions = req.body.positions;
        }
        
        await contest.save();
        res.send(contest);
    } catch {
        res.status(404);
        res.send({ error: "contest doesn't exist!" });
    }
});

// [DELETE] delete contest
router.delete("/delete/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
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
        let positionsIdx = -1;
        contest.positions.forEach((element, index) => {
            if (element.positionName === req.body.positionName) {
                element.applyMembers.push(req.body.volunteer);
                console.log(req.body.volunteer);
                element.applyNumbers += 1;
                positionsIdx = index;
                return;
            }
        });
        contest.applyStatus.totalApplyNumbers += 1;
        console.log(1);
        //contest.applyStatus.positions[positionsIdx].markModified('applyMembers');
        console.log(2);
        await contest.save();
        res.send(contest);
    } catch (e) {
        console.log(e);
        res.status(404);
        res.send({ error: "Contest doesn't exist!" });
    }
});

// [PATCH] confirm member at contest
router.patch("/confirmMember/:id", async (req, res) => {
    try {
        const contest = await Contest.findOne({ _id: req.params.id });
        if (contest.closingStatus === true) {
            throw new Error("closed");
        }
        contest.applyStatus.positions.forEach(element => {
            if (element.positionName === req.body.positionName) {
                element.confirmedMembers.push(req.body.volunteer);
                element.confirmedNumbers += 1;

                const idx = element.applyMembers.indexOf(req.body.volunteer);
                element.applyMembers.splice(idx, 1);
                element.applyNumbers -= 1;
                return;
            }
        });
        contest.applyStatus.totalConfirmedNumbers += 1;

        if (contest.applyStatus.totalConfirmedNumbers === contest.totalMembers) {
            contest.closingStatus = true;
        }
        contest.markModified('confirmedMembers');

        await contest.save();

        res.status(201);
        res.send(contest);
    } catch (e) {
        if (e.message === "closed") {
            res.status(403);
            res.send({ error: "This contest is closed." });
        }
        res.status(404);
        res.send({ error: "Contest doesn't exist!" });
    }
});

module.exports = router;