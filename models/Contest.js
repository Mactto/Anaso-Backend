const mongoose = require('mongoose');

const positionSchema = mongoose.Schema({
    positionName: { // 포지션 이름
        type: String,
        default: ""
    },
    recruitNumbers: { // 모집 인원
        type: Number,
        default: 0
    },
    applyNumbers: { // 신청 인원
        type: Number,
        default: 0
    },
    applyMembers: { // 신청 인원 목록
        type: Array,
        default: []
    },
    confirmedNumbers: { // 승인 인원
        type: Number,
        default: 0
    },
    confirmedMembers: { // 숭인 인원 목록
        type: Array,
        default: []
    }
});
const Position = mongoose.model('Position', positionSchema);

const contestSchema = mongoose.Schema({
    contestName: { // 공모전 이름
        type: String,
        maxlength: 50
    },
    hitCount: { // 조회수
        type: Number,
        default: 0
    },
    title: { // 게시글 제목
        type: String,
        maxlength: 50
    },
    author: { // 작성자
        type: String
    },
    postDate: { // 등록일자
        type: Date,
        default: Date.now
    },
    deadLine: { // 마감일자
        type: Date,
        default: Date.now
    },
    supportScale: {
        type: String,
        default: ""
    },
    detail: { // 세부사항
        type: String
    },
    poster: { // 공모전 포스터
        type: String
    },
    category: { // 공모전 카테고리
        type: String,
        default: "",
    },
    organizer: { // 주최기관
        type: String,
        maxlength: 100
    },
    homepage: { // 공모전 주소
        type: String,
        default: ""
    },
    closingStatus: { // 모집 마감여부
        type: Boolean,
        default: false
    },
    totalMembers: { // 전체 모집 인원
        type: Number,
        default: 0
    },
    applyStatus: { // 신청 현황
        totalApplyNumbers: { // 전체 신청 인원
            type: Number,
            default: 0
        },
        totalConfirmedNumbers: { // 전체 승인 인원
            type: Number,
            default: 0
        },
        positions: {
            type: Array,
            default: [Position]
        }
    }
});
const Contest = mongoose.model('Contest', contestSchema);

module.exports = { Contest }