var SVGAProtoHelper = require('./index').SVGAProtoHelper

var fs = require("fs");
const sample = JSON.parse(fs.readFileSync('./tests/sample.json', { encoding: "utf-8" }));
fs.writeFileSync("./tests/movie.binary", new Buffer(SVGAProtoHelper.convertToProto(sample)))