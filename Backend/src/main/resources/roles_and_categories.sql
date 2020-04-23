create table roles (
    `role_id` bigint(20) not null auto_increment,
    `name` varchar(60) not null ,
     PRIMARY KEY (`role_id`),
     UNIQUE KEY `uk_roles_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into roles (name) values ('ROLE_USER');
insert into roles (name) values ('ROLE_ADMIN');

create table categories (
    `category_id` bigint(20) not null auto_increment,
    `name` varchar(60) not null,
    primary key (`category_id`),
    unique key `uk_categories_name` (`name`)
) engine = InnoDB default charset = utf8;

insert into categories (name) values ('Музыка');
insert into categories (name) values ('Искусствознание');
insert into categories (name) values ('Литература');
insert into categories (name) values ('Архитектура');
insert into categories (name) values ('Изобразительное искусство');
insert into categories (name) values ('Дизайн');