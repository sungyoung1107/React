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