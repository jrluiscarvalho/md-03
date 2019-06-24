const Ad = require('../models/Ad')
const User = require('../models/User')
const Queue = require('../services/Queue')
const PurchseMail = require('../jobs/PurchaseMail')

class PurchaseController {
  async store(req, res) {
    const {
      ad,
      content
    } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()
