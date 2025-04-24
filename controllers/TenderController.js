const Tender = require('../models/Tender');
const Offer = require('../models/Offer');

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
        end_time: end_time.split('T')[0] + ' ' + end_time.split('T')[1] + ":00",
        start_time: start_time.split('T')[0] + ' ' + start_time.split('T')[1] + ":00" 
    };
    console.log(tenderData);

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
            return res.status(404).render('landing');
        }
        if (new Date(tender.start_time) > new Date()) {
            return res.status(404).render('landing');
        }
        Offer.findByTenderId(tenderId, (err, offers) => {
            if (err) {
                return next(err);
            }
            res.render('tenderDetails', { tender: tender, offers: offers });
        });
    });
}
exports.addOfferByTenderId = (req, res, next) => {
    const tenderId = req.params.id;
    const { offerer_name, price } = req.body;
    if (!offerer_name || !price) {
        return res.render('newOffer');
    }
    Tender.findById(tenderId, (err, tender) => {
        if (err) {
            return next(err);
        }
        if (!tender) {
            return res.status(404).render('landing');
        }
        if (new Date(tender.start_time) > new Date()) {
            return res.status(404).render('landing');
        }
        if (new Date(tender.end_time) < new Date()) {
            return res.status(404).render('landing');
        }
        const offerData = {
            tender_id: tenderId,
            user_id: offerer_name,
            price: price
        };
        Offer.create(offerData, (err, result) => {
            if (err) {
                return next(err);
            }
            res.redirect(`/tenders/${tenderId}`);
        });
    });
}
