var mongoose = require('./database');
var locus    = require('locus')

var Fish = require('../models/fish');
var User = require('../models/user');

eval(locus)

mongoose.disconnect();
