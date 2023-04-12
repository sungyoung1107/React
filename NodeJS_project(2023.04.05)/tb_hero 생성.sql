CREATE TABLE tb_hero
(
	id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	hero_name VARCHAR(40),
	hero_desc VARCHAR(100),
	wdate datetime
);

alter TABLE tb_hero add wdate datetime; 

/*
	char(40) '홍길동               ' : 40byte 다 채워서 들어감 : 고정길이 일때 (주민번호, 성별)
	varchar(40) '홍길동'             : 문자부분까지만 채움 : 가변길이 일 때
	
	// 한글을 한글자당 3byte
	
	where hero_name = '홍길동           ';
	where trim(hero_name) = '홍길동';
*/

INSERT INTO tb_hero(hero_name, hero_desc, wdate)
VALUES ('이순신','임진왜란승리',NOW());

INSERT INTO tb_hero(hero_name, hero_desc, wdate)
VALUES ('강감찬','귀주대첩',NOW());

INSERT INTO tb_hero(hero_name, hero_desc, wdate)
VALUES ('서희','강동6주',NOW());

SELECT A.id, A.hero_name, A.hero_desc, A.wdate FROM tb_hero A;