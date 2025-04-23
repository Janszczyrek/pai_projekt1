const db = require('../config/database');

class Tender {
    static findAll(callback) {
        const sql = "SELECT * FROM tenders ORDER BY start_time DESC";
        db.all(sql, [], callback);
    }

    static findActive(callback) {
        const sql = "SELECT * FROM tenders WHERE datetime(end_time) > CURRENT_TIMESTAMP AND datetime(start_time) < CURRENT_TIMESTAMP ORDER BY end_time ASC";
        db.all(sql, [], callback);
    }

    static findPast(callback) {
        const sql = "SELECT * FROM tenders WHERE datetime(end_time) <= CURRENT_TIMESTAMP ORDER BY end_time DESC";
        db.all(sql, [], callback);
    }

    static findById(id, callback) {
        const sql = "SELECT * FROM tenders WHERE id = ?";
        db.get(sql, [id], callback);
    }

    static create(data, callback) {
        const sql = `INSERT INTO tenders (name, orderer, max_price, description, start_time, end_time)
                     VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(sql, [data.name, data.orderer, data.max_price, data.description, data.start_time, data.end_time], function(err) {
            callback(err, { id: this ? this.lastID : null });
        });
    }

    static delete(id, callback) {
        const sql = "DELETE FROM tenders WHERE id = ?";
        db.run(sql, [id], function(err) {
            callback(err, { changes: this ? this.changes : 0 });
        });
    }
}

module.exports = Tender;