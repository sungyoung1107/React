CREATE TABLE tb_board
(
	id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	-- auto_increment : 자동증가, not null, primary key 세 개가 한 쌍
	title VARCHAR(1000),
	writer VARCHAR(100),
	contents LONGTEXT, -- 2G, oracledms clob
	hit BIGINT DEFAULT 0, -- 기본값 0
	wdate DATETIME -- 시간까지 저장한다.
);

-- NOW는 현재 날짜와 시간을 알려주는 함수
-- 자동 COMMIT임
INSERT INTO tb_board(title, writer, contents, wdate)
VALUES ('제목1','홍길동','내용1', NOW()); 

SELECT count(id) AS lg
FROM tb_board;

SELECT * FROM tb_board;

INSERT INTO tb_board(title, writer, wdate, contents)
VALUES('제목', '작성자', NOW(), '내용');

-- <<  <1, 2, 3, 4, 5, 6, 7, 8, 9, 10> >>

-- DB 쿼리 limit 시작위치값, 길이1  0~9
-- 1 10,10, 10~19 
-- 2 20~10, 20~29 
-- 3 30~10, 20~29
-- 4 40~10, 40~49

SELECT * FROM tb_board
LIMIT 0, 10;

-- DB 쿼리가 limit 시작 위치값, 길이 1 (0~9)까지 나와야하고,
-- 1페이지 선택시 10,10, -> 10~29까지
-- 2페이지 선택시 20,10,  -> 20~29까지
-- 이렇게 연산이 되어야한다.
-- 첫 번째 인수는 반환할 첫 번째 레코드의 인덱스(0부터 시작)를 나타내고, 두 번째 인수는 반환할 레코드 수를 나타냅니다.
select * from tb_board limit 0, 10;
-- 글을 썼다가 지웠다하면 id값이 이가 빠진 것처럼 된다. (Problem)
-- 변수를 만들어서 번호를 할당할 수 있다. (Solution)
-- @rownum - 변수를 선언해서 값을 0으로 초기화를 하고
-- 임시테이블로 B라고 준다.
select A.id, A.title, @rownum:=@rownum+1
from tb_board A, (select @rownum:=0) B
order by id desc;
-- 왜 A, B를 붙이냐...table을 만들면 column이 저장되는 공간이 따로 있다.이 공간을 딕셔너리라고 한다. 그 딕셔너리를 다 뒤져서
-- alias를 만들면, A로 임시 테이블을 만들어버리면, 검색 속도를 매우 빠르게 할 수 있다.
select A.id, A.title, @rownum:=@rownum+1
from tb_board A, (select @rownum:=0) B
order by id
limit 0, 10;
-- limit를 붙이면,
SELECT * from
(
   select A.id, A.title, @rownum:=@rownum+1
	from tb_board A, (select @rownum:=0) B
	order by id
) K
limit 10, 10;
-- 서브쿼리 안에서 함수를 호출하게 되면 내부의 모든 데이터
-- 함수를 이 안에서 호출하면, 시간이 많이 소요된다. (Problem)
-- 함수를 그래서 밖에서 불러오는 게 좋음.
-- @rownum:=@rownum +1 이 먼저 적용되고나서 limit를 적용하는 것이 좋다.
SELECT A.id, A.title, A.writer, date_format(A.wdate, '%Y-%m-%d') wdate
from
(
select A.id, A.title, A.writer, A.wdate , @rownum:=@rownum +1
from tb_board A, (Select @rownum:=0) B
order by id
) A
limit 10, 10;


UPDATE tb_board SET writer='mung' WHERE 1=1; -- 전체데이터 엎어치기

ALTER TABLE tb_board ADD FOREIGN KEY(writer) REFERENCES tb_member(userid);

-- tb_board 테이블의 writer가 tb_member의 userid를 참조한다.
-- tb_board의 writer 필드의 내용이 tb_member의 userid인 것만 가능하다.
SELECT A.id, A.title, A.writer, A.num, A.username,
date_format(A.wdate, '%Y-%m-%d') wdate
from
(
select A.id, A.title, A.writer, A.wdate , C.username, @rownum:=@rownum +1 num
from tb_board A
LEFT OUTER JOIN (Select @rownum:=0) B ON 1=1 -- 조인할 조건이 없는 경우 써준다.
LEFT OUTER JOIN tb_member C ON A.writer = C.userid
order by id
) A
limit 0, 10;

INSERT INTO tb_board(title, writer, wdate, contents)
VALUES('제목', 'mung', NOW(), '내용');


