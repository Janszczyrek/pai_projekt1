const Offer = require('../models/Offer');


exports.create = (req, res, next) => {
    const { offerer_name, price, tender_id } = req.body;
    if (!offerer_name || !price || !tender_id) {
        return res.render('newOffer');
    }
    const offerData = {
        offerer_name: offerer_name,
        price: price,
        tender_id: tender_id
    };

    Offer.create(offerData, (err, result) => {
        if (err) {
            return next(err);
        }
        res.redirect(`/offers/${result.id}`);
    });
}
exports.findByTenderId = (req, res, next) => {
    const TenderId = req.params.id;
    Offer.findById(TenderId, (err, Offers) => {
        if (err) {
            return next(err);
        }
        if (!Offer) {
            return res.status(404).send('Offers not found');
        }
        res.render('OfferDetails', { Offers: Offers });
    });
}

exports.deleteAll = (req, res, next) => {
    Offer.deleteAll((err, result) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}
