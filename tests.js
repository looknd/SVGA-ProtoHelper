var SVGAProtoHelper_1_5_0 = require('./index').SVGAProtoHelper_1_5_0
var SVGAProtoHelper_2_0_0 = require('./index').SVGAProtoHelper_2_0_0

var fs = require("fs");
var zlib = require("zlib");

(function () {
    const sample = JSON.parse(fs.readFileSync('./tests/1.5.0/movie.spec', { encoding: "utf-8" }));
    fs.writeFileSync("./tests/1.5.0/movie.binary", new Buffer(SVGAProtoHelper_1_5_0.convertToProto(sample)))
})();

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

(function () {
    let fileMapping = {};
    const sample = JSON.parse(fs.readFileSync('./tests/2.0.0/movie.spec', { encoding: "utf-8" }));
    for (var imageKey in sample.images) {
        fileMapping[imageKey] = toArrayBuffer(fs.readFileSync('./tests/2.0.0/' + imageKey + '.png'));
        const stream = new Buffer(SVGAProtoHelper_2_0_0.convertToProto(sample, fileMapping));
        fs.writeFileSync("./tests/2.0.0/rose.svga", zlib.deflateSync(stream))
    }
})();