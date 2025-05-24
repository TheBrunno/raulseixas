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

create table avaliacao(
	fkusuario int,
    fkalbum int,
    avaliacao tinyint,
    
    foreign key (fkusuario) references usuario(id),
    foreign key (fkalbum) references album(id),
    
    primary key(fkusuario, fkalbum)
);

create user 'raulseixas_user_api' identified by 'raulseixas';
grant select, insert, update, delete on raulseixas.* to 'raulseixas_user_api';
flush privileges;

desc album;

insert into album(nome, descricao, subtitulo, avaliacao, descricaoAvaliacao)
values ("Novo Aeon", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis, augue non mollis dictum, metus sem euismod massa, nec elementum tortor velit in eros. Vestibulum vestibulum tortor vel magna sodales convallis. Ut blandit nec justo vitae interdum. Aenean porta tortor sed lorem porttitor pellentesque. Quisque vel est vitae libero dapibus vehicula. Nam maximus odio nec maximus imperdiet. Etiam id turpis turpis. Donec nisl metus, ultrices sit amet fermentum id, iaculis id arcu. Curabitur lectus sapien, viverra eget lacinia in, sodales et ante. Vestibulum ex justo, vestibulum sit amet justo eu, convallis tincidunt metus. Nunc nec elementum elit, in varius odio. Nunc nunc mi, euismod non bibendum quis, blandit sed risus. Etiam varius purus in maximus ultrices. Etiam at velit eget neque consectetur hendrerit sed id ante. Praesent pulvinar ornare mi a suscipit. Sed vestibulum pellentesque scelerisque. Aenean placerat orci vel luctus porta.", "Um dos principais álbuns do artista, trazendo diversas músicas que o tornaram conhecido por todo o país.", 4.8, "Lançado em 1975, o álbum causou estranhamento no público por trazer letras densas e referências ao ocultismo e à filosofia. Diferente dos sucessos anteriores de Raul Seixas, esse trabalho foi pouco compreendido na época e teve baixa aceitação comercial. Com o passar dos anos, porém, Novo Aeon foi redescoberto e passou a ser considerado uma de suas obras mais ousadas, conquistando status cult entre fãs e críticos.");

update album set descricaoAvaliacao = 'Lançado em 1975, o álbum causou <span class="destaque_text">estranhamento</span> no público por trazer letras densas e referências ao <span class="destaque_text">ocultismo</span> e à <span class="destaque_text">filosofia</span>. Diferente dos sucessos anteriores de Raul Seixas, esse trabalho foi <span class="destaque_text">pouco compreendido</span> na época e teve baixa aceitação comercial. Com o passar dos anos, porém, <span class="destaque_text">Novo Aeon</span> foi redescoberto e passou a ser considerado uma de suas obras mais <span class="destaque_text"><span class="destaque_text">ousadas</span></span>, conquistando status cult entre fãs e críticos.'
where id = 1;

select * from album;

desc album;
alter table album modify descricaoAvaliacao varchar(5000);

desc musica;
insert into musica(id, fkAlbum, nome) 
values 
(2, 1, "A maça"),
(3, 1, "Caminhos");

update album set nome = 'Novo Aeon' where id = 1;

select * from musica;

select * from cards;