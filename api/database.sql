CREATE DATABASE
CREATE TABLE Books (id  serial, bookid varchar(50), title varchar(100), subtitle varchar(100), authors varchar(100), descr varchar(3000), categories varchar(100), pablisher varchar(100), publisherDate varchar(50), previewLink varchar(255), coverImage varchar(255), searchword varchar(255), tstamp timestamp, favorite boolean DEFAULT false, PRIMARY KEY (id))
