const Tender = require('../models/Tender');

exports.listActive = (req, res, next) => {
    Tender.findActive((err, tenders) => {
        if (err) {
            return next(err);
        }
        res.render('activeTenders', {tenders: tenders });
    });
};

exports.listPast = (req, res, next) => {
    Tender.findPast((err, tenders) => {
        if (err) {
            return next(err);
        }
        res.render('pastTenders', {tenders: tenders });
    });
};

exports.create = (req, res, next) => {
    const { name, orderer, max_price, description, end_time, start_time } = req.body;
    if (!name || !orderer || !end_time || !start_time) {
        return res.render('newTender');
    }
    const tenderData = {
        name: name,
        orderer: orderer,
        max_price: max_price || null,
        description: description,
        end_time: end_time,
        start_time: start_time
    };

    Tender.create(tenderData, (err, result) => {
        if (err) {
            return next(err);
        }
        res.redirect(`/tenders/${result.id}`);
    });
};

exports.findById = (req, res, next) => {
    const tenderId = req.params.id;
    Tender.findById(tenderId, (err, tender) => {
        if (err) {
            return next(err);
        }
        if (!tender) {
            return res.status(404).send('Tender not found');
        }
        res.render('tenderDetails', { tender: tender });
    });
}
