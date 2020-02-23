var db = require('../config/db');

module.exports = {

    isOwner: function (request, response) { // 유저가 로그인 한 상태인지 판단
        if (request.user) {
            console.log('[ isOwner ] Logged in')
            return true;
        } else {
            console.log('[ isOwner ] No user')
            return false;
        }
    },

    sameOwner: function (request, email) { // 로그인 유저와 글 저자가 같은지 판단
        if (request.user.email === email) {
            console.log("[ sameOwner ] Right approach")
            return 1;
        } else {
            console.log("[ sameOwner ] Cheating")
            return 0;
        }
    },

    hasPost: function (request, board, email) { // 로그인 유저가 게시글을 하나라도 가지고 있는지 판단
        db.query(
            `SELECT EXISTS(SELECT * FROM ${board} WHERE ${email}='${request.user.email}') AS SUCCESS`,
            function (error, result) {
                if (error) throw error;
                else {
                    console.log(result);
                    if (result[0].SUCCESS === 0) { // 작성한 게시글이 데이터가 없는 경우 0 리턴
                        console.log(`[ hasPost: ${board} ] No`);
                        return 0;
                    } else { // 작성한 게시글이 데이터가 있는 경우 1 리턴
                        console.log(`[ hasPost: ${board} ] Yes`);
                        return 1;
                    }
                }
            }
        );
    },

    hasComment: function (request, board, email){
        db.query(
            `SELECT EXISTS(SELECT * FROM comment WHERE type_board='${board}' and ${email}='${request.user.email}') AS SUCCESS`,
            function (error, result) {
                if (error) throw error;
                else {
                    console.log(result);
                    if (result[0].SUCCESS === 0) {
                        console.log(`[ hasComment: ${board} ] No`);
                        return 0;
                    } else { 
                        console.log(`[ hasComment: ${board} ] Yes`);
                        return 1;
                    }
                }
            }
        );
    }
    
}

