CREATE TABLE tb_member
(
	member_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	-- auto_increment : 자동증가, not null, primary key 세 개가 한 쌍
	userid VARCHAR(100) UNIQUE, -- unique 제약조건은 값이 중복되어서는 안된다. 단, null은 허용
	password VARCHAR(20),
	username VARCHAR(100),
	phone VARCHAR(20), 
	email VARCHAR(100), 
	zipcode CHAR(5),
	address1 VARCHAR(100),
	address2 VARCHAR(100),
	wdate DATETIME -- 시간까지 저장한다.
);

alter TABLE tb_member add nickname VARCHAR(100); 

SELECT * FROM tb_member;

-- NOW는 현재 날짜와 시간을 알려주는 함수CREATE TABLE tb_member
(
	member_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	-- auto_increment : 자동증가, not null, primary key 세 개가 한 쌍
	userid VARCHAR(100) UNIQUE, -- unique 제약조건은 값이 중복되어서는 안된다. 단, null은 허용
	password VARCHAR(20),
	username VARCHAR(100),
	phone VARCHAR(20), 
	email VARCHAR(100), 
	zipcode CHAR(5),
	address1 VARCHAR(100),
	address2 VARCHAR(100),
	wdate DATETIME -- 시간까지 저장한다.
)
-- 자동 COMMIT임
INSERT INTO tb_member(title, writer, contents, wdate)
VALUES ('제목1','홍길동','내용1', NOW()); 

select A.id, A.title, A.writer, date_format(A.wdate, '%Y-%m-%d') wdate (select username from tb_member B where A.writer=B.userid) username from tb_board A where id=68;