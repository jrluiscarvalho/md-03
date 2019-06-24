const kue = require('kue')
const RedisConfig = require('../../config/redis')
const jobs = require('../jobs')

const Queue = kue.createQueue({
  redis: RedisConfig
})

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

module.exports = Queue
