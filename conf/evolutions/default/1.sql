# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table locations2 (
  brand                     varchar(255),
  store_number              varchar(255),
  name                      varchar(255),
  ownership_type            varchar(255),
  facility_id               varchar(255),
  features_products         varchar(255),
  features_service          varchar(255),
  features_stations         varchar(255),
  food_region               varchar(255),
  venue_type                varchar(255),
  phone_number              varchar(255),
  location                  varchar(255),
  street_address            varchar(255),
  street_line_1             varchar(255),
  street_line_2             varchar(255),
  city                      varchar(255),
  state                     varchar(255),
  zip                       varchar(255),
  country                   varchar(255),
  coordinates               varchar(255),
  latitude                  varchar(255),
  longitude                 varchar(255),
  insert_date               varchar(255))
;

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

drop table locations2;

drop table reviews;

drop table users;

SET FOREIGN_KEY_CHECKS=1;

