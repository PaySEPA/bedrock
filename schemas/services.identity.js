/*
 * Copyright (c) 2012-2014 Digital Bazaar, Inc. All rights reserved.
 */
var email = require('./email');
var description = require('./description');
var identifier = require('./identifier');
var jsonldContext = require('./jsonldContext');
var jsonldType = require('./jsonldType');
var label = require('./label');
var nonce = require('./nonce');
var passcode = require('./passcode');
var password = require('./password');
var publicKeyPem = require('./publicKeyPem');
var slug = require('./slug');
var url = require('./url');

var sysImageType = {
  required: false,
  type: 'string',
  enum: ['url', 'gravatar']
};
var sysGravatarType = {
  required: false,
  type: 'string',
  enum: ['gravatar', 'mm', 'identicon', 'monsterid', 'wavatar', 'retro']
};
var sysPublic = {
  required: false,
  title: 'Identity Property Visibility',
  description: 'A list of Identity properties that are publicly visible.',
  type: 'array',
  uniqueItems: true,
  items: {
    type: 'string',
    enum: [
      'description',
      'email',
      'image',
      'label',
      'url'
    ]
  },
  errors: {
    invalid: 'Only "description", "email", "image", "label", and "url" are ' +
      'permitted.',
    missing: 'Please enter the properties that should be publicly visible.'
  }
};

var postIdentity = {
  title: 'Post Identity',
  type: 'object',
  properties: {
    '@context': jsonldContext(),
    id: identifier(),
    description: description({required: false}),
    //email: email({required: false}),
    image: url({required: false}),
    label: label({required: false}),
    url: url({required: false}),
    sysImageType: sysImageType,
    sysGravatarType: sysGravatarType,
    sysPublic: sysPublic,
    sysSigningKey: identifier({required: false})
  },
  additionalProperties: false
};

var getIdentitiesQuery = {
  title: 'Get Identities Query',
  type: 'object',
  properties: {
    service: {
      required: false,
      type: 'string',
      enum: ['add-key']
    },
    'public-key-label': {
      required: false,
      type: label()
    },
    'public-key': {
      required: false,
      type: publicKeyPem()
    },
    'registration-callback': {
      required: false,
      type: url()
    },
    'response-nonce': {
      required: false,
      type: nonce()
    }
  }
};

var postIdentitiesQuery = {
  title: 'Post Identities Query',
  type: 'object',
  properties: {
    action: {
      required: false,
      type: 'string',
      enum: ['query']
    },
    authorize: {
      required: false,
      type: 'string',
      enum: ['true']
    },
    credentials: {
      required: false,
      type: 'string',
      enum: ['true', 'false']
    },
    domain: {
      required: true,
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    callback: {
      required: false,
      type: url()
    }
  }
};

var postIdentities = {
  title: 'Post Identities',
  description: 'Identity credentials query or Identity creation',
  type: [{
    title: 'Identity Query',
    description: 'Query Identity credentials',
    type: 'object',
    properties: {
      query: {
        required: true,
        type: 'string'
      }
    },
    additionalProperties: false
  }, {
    title: 'Create Identity',
    description: 'Create an Identity',
    type: 'object',
    properties: {
      '@context': jsonldContext(),
      type: {
        required: true,
        type: 'string',
        enum: ['Identity']
      },
      sysSlug: slug(),
      label: label(),
      image: url({required: false}),
      email: email(),
      sysPassword: password(),
      url: url({required: false}),
      description: description({required: false}),
      sysImageType: sysImageType,
      sysGravatarType: sysGravatarType,
      sysPublic: sysPublic
    },
    additionalProperties: false
  }]
};

var postPreferences = {
  title: 'Post Preferences',
  type: 'object',
  properties: {
    '@context': jsonldContext(),
    type: jsonldType('IdentityPreferences'),
    publicKey: {
      required: false,
      type: [{
        // IRI only
        type: 'string'
      }, {
        // label+pem
        type: 'object',
        properties: {
          label: label(),
          publicKeyPem: publicKeyPem()
        }
      }]
    }
  },
  additionalProperties: false
};

var postEmailVerify = {
  title: 'Verify email',
  description: 'Verify an email address.',
  type: 'object',
  properties: {
    sysPasscode: passcode()
  },
  additionalProperties: false
};

module.exports.postIdentity = function() {
  return postIdentity;
};
module.exports.getIdentitiesQuery = function() {
  return getIdentitiesQuery;
};
module.exports.postIdentitiesQuery = function() {
  return postIdentitiesQuery;
};
module.exports.postIdentities = function() {
  return postIdentities;
};
module.exports.postPreferences = function() {
  return postPreferences;
};
module.exports.postEmailVerify = function() {
  return postEmailVerify;
};
