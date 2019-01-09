// Hook checks if an appropriate record already exists; 
// If so, it returns that instead of proceeding.
// Otherwise, it generates the LNK.
const base64url = require('base64url');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    await context.service
      .find({ query: { url: context.data.url } })
      .then(async d => {
        if (d.data.length) {
          let record = d.data[0]
          record.message = "LNK for this URL already existed"
          context.result = record
        } else {
          await context.service
            .find({ query: { $limit: 0 } })
            .then(header => {
              context.data.LNK = base64url(`${header.total}`)
            })
        }
      })
      .catch(d => console.log('error', d))
  };
};
