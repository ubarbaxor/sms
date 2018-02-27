const client = require('mongodb').MongoClient
const GridFSBucket = require('mongodb').GridFSBucket

const conf = {
  host: 'localhost',
  port: 27017,
  db: 'sms',
}
conf.url = `mongodb://${conf.host}:${conf.port}/${conf.db}`

const connection = client.connect(conf.url)
  .then(db => (console.log(`Got DB : ${db.databaseName}`), db))
  .then(db => (
    db.collection('users')
    .createIndex( { phone: 1 }, { unique: true } ), db))
  .catch(e => ( console.error('error', e), e ))

// const grid = connection
//   .then(db => ( new GridFSBucket(db) ))
//   .then(bucket => ( console.log(`Connected to GridFS`), bucket ))
//   .catch(e => ( console.error(`couldn't connect to grid`), e ))

// const files = {
//   get: id => grid.then(bucket => bucket.openDownloadStream(id)),
//   post: (stream, meta) => grid
//   .then(bucket => {
//     const uploadStream = bucket.openUploadStream(meta.filename, meta)
//     stream.pipe(uploadStream)
//     return uploadStream
//   }),
//   find: (...args) => connection
//     .then(db => db.collection('fs.files').find(...args).toArray()),
//   findOne: filter => connection
//     .then(db => db.collection('fs.files').findOne(filter)),
// }

const users = {
  get: number => connection
    .then(db => db.collection('users').find( { number } ))
    .catch(e => console.error( 'DB error', e)),
  add: number => connection
    .then(db => db.collection('users').insert( { number } ))
    .catch(e => console.error( 'DB error', e)),
}

module.exports = {
  // files,
  users,
}
