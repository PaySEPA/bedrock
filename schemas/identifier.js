var tools = require(__libdir + '/bedrock/tools');

var schema = {
  required: true,
  title: 'ID',
  description: 'A unique identifier.',
  type: 'string',
  minLength: 1,
  disallow: {
    type: 'string',
    enum: ['0']
  }
};

module.exports = function(extend) {
  if(extend) {
    return tools.extend(true, tools.clone(schema), extend);
  }
  return schema;
};