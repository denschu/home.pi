'use strict';

var _ = require('lodash');

var users = [
  {
    id: 1,
    username: 'guestadmin',
    password: 'guestadmin',
    role: 'ADMIN'
  },
  {
    id: 2,
    username: 'guest',
    password: 'guest',
    role: 'USER'
  },
  {
    id: 3,
    username: 'denschu',
    password: 'schuden',
    role: 'USER'
  },
  {
    id: 4,
    username: 'admin',
    password: 'admin',
    role: 'ADMIN'
  }
];

module.exports = {
  findById: function(id) {
    return _.clone(_.find(users, function(user) { return user.id === id }));
  },

  findByUsername: function(username) {
    return _.clone(_.find(users, function(user) { return user.username === username; }));
  }
};