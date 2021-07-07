module.exports = {
  apps: [{
    "name": "hy-server",
    "script": "./src/server.js",
    "instances": 4,
    "exec_mode": "cluster"
  }]
}