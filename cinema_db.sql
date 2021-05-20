create database cinema_db;
use cinema_db;
 
create table filmes(
   id int auto_increment primary key,
   titulo varchar(25),
   genero varchar(12),
   duracao varchar(3),
   sinopse varchar(10000),
   preco decimal(9,2),
   foto varchar(100)
);
