const mongoose = require('mongoose');

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
    detail: { // 세부사항
        type: String
    },
    poster: { // 공모전 포스터
        type: String
    },
    category: { // 공모전 카테고리
        type: Array,
        default: []
    },
    organizer: { // 주최기관
        type: String,
        maxlength: 100
    },
    closingStatus: { // 모집 마감여부
        type: Boolean,
        default: false
    },
    totalMembers: { // 전체 모집 인원
        type: Number,
        default: 0
    },
    volunteers: { // 지원자 목록
        type: Array,
        default: []
    },
    confirmedMembers: { // 모집 완료 인원
        membersNum: { // 완료된 총 모집 인원 수
            type: Number,
            default: 0
        },
        membersList: { // 모집 인원 리스트
            type: Array,
            default: []
        }
    }
});

const Contest = mongoose.model('Contest', contestSchema);

module.exports = { Contest }