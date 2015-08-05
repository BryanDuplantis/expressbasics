var loggly = require('loggly');

function logger(tag){
  return loggly.createClient({
    token: process.env.LOGGLY_TOKEN,
    subdomain: 'BryanDuplantis',
    tags: ['NodeJS'],
    json: true
  });
}

module.exports = logger;
