create database raulseixas;
use raulseixas;

create table usuario (
  id int primary key auto_increment,
  nome varchar(200) not null,
  email VARCHAR(100) not null,
  senha VARCHAR(50) not null,
  isADM boolean,
  foto varchar(200),
  prestigio int default 0,
  contadorLogins int default 0
);

create table album (
  id int primary key auto_increment,
  nome varchar(100) not null,
  srcCapa varchar(200),
  descricao varchar(1000),
  subtitulo varchar(200),
  avaliacao decimal(2, 1),
  descricaoAvaliacao varchar(500)
);

create table musica (
  id int,
  fkAlbum int,
  nome varchar(100) not null,
  duracao time,
  srcMusica varchar(200),
  srcLRC varchar(200),
  views int not null default 0,
  
  foreign key(fkAlbum) references album(id),
  primary key (id, fkAlbum)
);

create table comentario (
  id int,
  fkUsuario int,
  fkAlbum int,
  comentario varchar(1000),
  upvotes int default 0,
  downvotes int default 0,
  
  foreign key(fkUsuario) references usuario(id),
  foreign key(fkAlbum) references album(id),
  primary key(id, fkUsuario, fkAlbum)
);

create table cards(
	id int primary key auto_increment,
    srcFoto varchar(200),
    descricao varchar(1000),
    fkAlbum int,
    
    foreign key(fkAlbum) references album(id)
);

create table votes(
	id int primary key auto_increment,
    fkComentario int,
    fkUsuarioComentario int,
    fkAlbum int,
    fkUsuarioVoto int,
    
    tipo varchar(4),
	
    foreign key(fkComentario, fkUsuarioComentario, fkAlbum) references comentario(id, fkUsuario, fkAlbum),
    foreign key(fkUsuarioVoto) references usuario(id)
);

create user 'raulseixas_user_api' identified by 'raulseixas';
grant select, insert, update, delete on raulseixas.* to 'raulseixas_user_api';
flush privileges;
