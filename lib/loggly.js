var loggly = require('loggly');

function logger(tag){
  return loggly.createClient({
    token: '4f8af67e-dbee-44e2-9e41-a785f6edfadf',
    subdomain: 'BryanDuplantis',
    tags: ['NodeJS'],
    json: true
  });
}

module.exports = logger;
