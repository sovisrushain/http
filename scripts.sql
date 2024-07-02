
create table category (
	id serial not null primary key,
	name varchar(60) not null unique,
	created_date timestamp not null default current_timestamp,
	updated_date timestamp not null default current_timestamp
)

create table product (
	id serial not null primary key,
	name varchar(120) not null,
	description text,
	price numeric(10,2) not null,
	currency varchar(5) not null default('LKR'),
	quantity integer not null default 0,
	active boolean not null default true,
	category_id integer not null references category(id),
	created_date timestamp not null default current_timestamp,
	updated_date timestamp not null default current_timestamp
)

insert into category (name) values ('Electronics') returning *

insert into product (name, description, price, quantity, category_id)
values ('Docker in Action', 'desc2', 30.99, 4, 1)
returning *