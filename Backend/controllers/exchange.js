const Exchange = require("../models/exchange");
const ExchangeIcon = require("../models/exchange-icons");
const axios = require("axios");
const env = require("../environment.json");

const ITEMS_PER_PAGE = 10;

exports.postExchange = async (req, res, next) => {
  try {
    const exchangeLists = await axios.get(`${env.EXCHANGE_API}${env.API_KEY}`);
    const exchangeListIcons = await axios.get(
      `${env.EXCHANGEICONS_API}${env.API_KEY}`
    );

    await Exchange.remove();
    await ExchangeIcon.remove();

    const promise1 = new Promise(async (resolve, reject) => {
      resolve(await Exchange.insertMany(exchangeLists.data));
    });

    const promise2 = new Promise(async (resolve, reject) => {
      resolve(ExchangeIcon.insertMany(exchangeListIcons.data));
    });

    Promise.all([promise1, promise2])
      .then((values) => {
        console.log(values[0], values[1]);
        return res.json({ message: "Data Stored" });
        console.log(values);
      })
      .catch((err) => {
        console.log(err);
        return res.json({ message: "Some Error Ocurred" });
      });
  } catch (err) {
    const error = new Error(err);
    error.message = err.response.statusText;
    error.httpStatusCode = err.response.status;
    return next(error);
  }
};

exports.getExchange = async (req, res, next) => {
  try {
    let page = +req.query.p || 1;

    const totalItems = await Exchange.find().countDocuments();

    const allExchanges = await Exchange.aggregate([
      {
        $lookup: {
          from: "exchange-icons",
          localField: "exchange_id",
          foreignField: "exchange_id",

          as: "url",
        },
      },
    ])
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({ exchangeList: allExchanges, totalItems });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 401;
    return next(error);
  }
};

exports.searchExchange = async (req, res, next) => {
  try {
    let page = req.query.p || 1;
    const totalItems = await Exchange.find({
      name: { $regex: new RegExp("^" + req.query.search, "i") },
    }).countDocuments();

    const allExchanges = await Exchange.aggregate([
      {
        $match: {
          name: { $regex: new RegExp("^" + req.query.search, "i") },
        },
      },
      {
        $lookup: {
          from: "exchange-icons",
          localField: "exchange_id",
          foreignField: "exchange_id",

          as: "url",
        },
      },
    ])
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.json({ result: allExchanges, totalItems });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 401;
    return next(error);
  }
};
