module.exports = {
  apps: [{
    "name": "hy-server",
    "script": "./src/server.js",
    "instances": 1,
    "exec_mode": "cluster"
  }]
}