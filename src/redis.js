const redis = require('redis');


const opts = {
	auth_pass: 9348
}

const client = redis.createClient(6379, 'redis', opts);

client.on("ready", function (err) {
  if (err) {
    console.log("Error " + error);
  } else {
    console.log("redis ready");
  }
})

client.on("connect", function (err) {
  if (err) {
    console.log("Error " + error);
  } else {
    console.log("redis connect");
  }
})

const get = (key) => new Promise((resolve, reject) => {
  client.get(key, (err, v) => {
    if (err) reject('error');
    resolve(v);
  })
})

const set = (k, v) => client.set(k, v);

// init 

get('mode')
  .then(v => {
    if (v == null) set('mode', '1.1');
  });

module.exports = {
  get,
  set
}