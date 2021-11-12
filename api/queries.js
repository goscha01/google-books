module.exports = {
    selectAllQuery: 'select * FROM Books',
    insertQuery : 'INSERT INTO Books (title, subtitle, authors, descr, categories, pablisher, publisherDate, previewLink, coverImage, searchword) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    insertMultiQuery : 'INSERT INTO Books (bookid, title, subtitle, authors, descr, categories, pablisher, publisherDate, previewLink, coverImage, searchword, tstamp ) VALUES %L',
    deleteQuery : 'DELETE FROM Books  WHERE id in (SELECT id FROM Books ORDER BY id asc LIMIT 1) RETURNING bookid',
    deleteAllQuery : 'TRUNCATE Books',
    serchWordQuery : 'SELECT COUNT(1) FROM Books WHERE searchword = $1',
    selectFromDB : 'SELECT * FROM Books WHERE searchword = $1',
    updateFavoriteQuery : 'UPDATE Books SET favorite = $1 WHERE bookid = $2 RETURNING favorite',
    selectAllFromShelfQuery : 'SELECT * FROM Books WHERE favorite = true',
    createTableQuery: 'CREATE TABLE Books (id  serial, bookid varchar(50), title varchar(100), subtitle varchar(100), authors varchar(100), descr varchar(3000), categories varchar(100), pablisher varchar(100), publisherDate varchar(50), previewLink varchar(255), coverImage varchar(255), searchword varchar(255), tstamp timestamp, favorite boolean DEFAULT false, PRIMARY KEY (id))'
}

  