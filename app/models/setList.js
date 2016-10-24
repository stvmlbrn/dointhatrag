var appRoot = require('app-root-path');
var db = require(appRoot + '/app/db');

exports.search = function(criteria) {
  var sql = `select v.name as venueName, v.location, s.title, c.date, b.name as bandName, sl.id,
    sl.audio, sl.video
    from venues v inner join concerts c on v.id = c.venueID
    inner join bands b on b.id = c.bandID
    inner join setLists sl on sl.concertID = c.id
    inner join songs s on s.id = sl.songID
    where s.title like ? or v.name like ?
    order by c.date desc`;

  return db.queryAsync(sql, [`%${criteria}%`, `%${criteria}%`]);
};
