const db = require('../config/database');

class Offer {
    static findByTenderId(tenderId, callback) {
        const sql = "SELECT o.* FROM offers o JOIN tenders t ON o.tender_id = t.id WHERE o.tender_id = ? AND (t.max_price IS NULL OR o.price <= t.max_price) ORDER BY o.price ASC";
        db.all(sql, [tenderId], callback);
    }

    static create(data, callback) {
        const sql = `INSERT INTO offers (tender_id, offerer_name, price)
                     VALUES (?, ?, ?)`;
        db.run(sql, [data.tender_id, data.user_id, data.price, data.description], function(err) {
            callback(err, { id: this ? this.lastID : null });
        });
    }
    static deleteAll(callback) {
        const sql = "DELETE FROM offers WHERE 1 = 1";
        db.run(sql, [], function(err) {
            callback(err, { changes: this ? this.changes : 0 });
        });
    }

}

module.exports = Offer;