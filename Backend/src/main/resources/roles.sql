create table roles (
    `role_id` bigint(20) not null auto_increment,
    `name` varchar(60) not null ,
     PRIMARY KEY (`role_id`),
     UNIQUE KEY `uk_roles_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into roles (name) values ('ROLE_USER');
insert into roles (name) values ('ROLE_ADMIN');