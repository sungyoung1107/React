/*
    1 2 3 4 5 6 7 8 9 10                0~9      >> group 1  1~10page
    11 12 13 14 15 16 17 18 19 20       10~19     >> group 2  11~20page
    21 22 23 24 25 26 27                20~26     >> group 3  21~30page
    
    (현재페이지 - 1)/10*10 

    (1-1)/10*10  = 0
    (2-1)/10*10  = 0
    .
    .
    (9-1)/10*10  = 0
    (10-1)/10*10  = 0
    (11-1)/10*10  = 10
    (12-1)/10*10  = 10
    (13-1)/10*10  = 10
    .
    .
    (21-1)/10*10  = 20
    
*/
//routes 폴더에 놓을 것 commonUtil.js
function getPaging(pg, totalCnt, pageGroupSize = 10) {
  // 전체 페이지 갯수를 확인해보고, 어느 그룹에 속하는지 확인해야 한다.
  pnTotal = Math.ceil(totalCnt / 10); // 전체 페이지 갯수
  // 강제올림.. 글이 5개 남아도 한 페이지 차지해야 함.
  pgGroupStart = parseInt((pg - 1) / pageGroupSize) * pageGroupSize + 1; //소숫점 자르기 위해 parseInt사용
  pgGroupEnd = pgGroupStart + 10;
  if (pgGroupEnd >= pnTotal) {
    // == 아님 //
    pgGroupEnd = pnTotal + 1;
  }
  // console.log(pg, pgGroupStart, pgGroupEnd);

  return { pnTotal: pnTotal, pnStart: pgGroupStart, pnEnd: pgGroupEnd, pg: pg };
}

// for (i = 1; i <= 32; i++) getPaging(i, 320);

// 함수 노출
exports.getPaging = getPaging;

/*
예를 들어, 전체 게시글 수(totalCnt)가 320개이고 페이지 그룹 크기(pageGroupSize)가 10일 때,
전체 페이지 수(pnTotal)는 32가 됩니다. 이때, 현재 페이지(pg)가 31이라면,
페이지 그룹의 시작 페이지(pgGroupStart)는 31이 됩니다.
그리고 pgGroupEnd = pgGroupStart + 10;에 의해 페이지 그룹의 끝 페이지(pgGroupEnd)는 41이 됩니다.
그러나 전체 페이지 수(pnTotal)는 32이므로, 다음 페이지 그룹이 존재하지 않습니다.
따라서, 위 조건문이 실행되어 pgGroupEnd = pnTotal + 1;이 되어 마지막 페이지를 끝 페이지로 지정해주게 됩니다.
*/

// undefined 체크해주고, int 범위 체크해주고, 자료형 체크해주고
// checkInfos //
// checkInfos = [
//   { key: "title", type: "str", range: 40 },
//   { key: "writer", type: "str", range: 40 },
//   { key: "contents", type: "str", range: -1 },
// ];
function checkInfo(req, checkInfos) {
  msg = ""; // 검사 결과 메세지
  result = 0; // 검사 결과 코드 (0: 문제 없음, 1: 문제 있음)
  resultInfo = {}; // 검사 결과를 담는 객체
  for (info of checkInfos) {
    console.log("여기" + info.key); // title, writer, contents

    if (req.body[info.key] == undefined) {
      msg = info.key + "is empty";
      result = 1;
      req.body[info.key] = "";
    }
    //타입 체크, 범위 체크
    if (
      info.type == "str" &&
      info.range !== -1 &&
      req.body[info.key].length > info.range
    ) {
      msg += info.key + "range error";
    }
    resultInfo[info.key] = req.body[info.key];
    resultInfo["result"] = result;
    resultInfo["msg"] = msg;
  }

  return resultInfo;
}
// 외부에서 사용하기 위해서 exports
exports.checkInfo = checkInfo;
