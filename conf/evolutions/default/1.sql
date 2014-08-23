# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table reviews (
  id                        bigint auto_increment not null,
  store_id                  varchar(255),
  user_id                   integer,
  review_text               varchar(255),
  num_stars                 integer,
  constraint pk_reviews primary key (id))
;

create table users (
  id                        bigint auto_increment not null,
  username                  varchar(255),
  hashedpass                varchar(255),
  zip                       varchar(255),
  constraint pk_users primary key (id))
;




# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table reviews;

drop table users;

SET FOREIGN_KEY_CHECKS=1;

