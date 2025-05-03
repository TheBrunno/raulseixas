create database raulseixas;
use raulseixas;

create table usuario (
  id int primary key auto_increment,
  nome varchar(200) not null,
  email VARCHAR(100) not null,
  senha VARCHAR(50) not null,
  isADM boolean,
  foto varchar(200)
);

create table album (
  id int primary key auto_increment,
  nome varchar(100) not null,
  capa varchar(200),
  descricao varchar(1000)
);

create table musica (
  id int,
  fkAlbum int,
  nome varchar(100) not null,
  duracao time not null,
  local varchar(200),
  views int not null default 0,
  
  foreign key(fkAlbum) references album(id),
  primary key (id, fkAlbum)
);

create table comentario (
  id int,
  fkUsuario int,
  comentario varchar(1000),
  fkMusica INT NOT NULL,
  fkAlbum INT NOT NULL,
  
  foreign key(fkMusica, fkAlbum) references musica(id, fkAlbum),
  foreign key(fkUsuario) references usuario(id),
  primary key(id, fkUsuario)
);

alter table usuario add column loginsCount int default 0;

create user 'raulseixas_user_api' identified by 'raulseixas';
grant select, insert, update, delete on raulseixas.* to 'raulseixas_user_api';
flush privileges;

select * from usuario;
