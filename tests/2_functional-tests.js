const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    this.timeout(5000);
    test('Send {input: "10L"} ', function (done) {
        chai.request(server).get('/api/convert').query({ input: "10L" })
            .end((err, res) => {
                assert.equal(res.status, 200, "Response status should be 200");
                assert.equal(res.type, "application/json", "Response type should be 'application/json'");
                assert.equal(res.body.initNum, 10, "Response body.initNum should be 10");
                assert.equal(res.body.initUnit, "L", "Response body.initUnit should be 'L'");
                assert.equal(res.body.returnNum, 2.64172, "Response body.returnNum should be 2.64172");
                assert.equal(res.body.returnUnit, "gal", "Response body.returnUnit should be 'gal'");
                assert.equal(res.body.string, "10 liters converts to 2.64172 gallons", "Response body.string should be '10 liters converts to 2.64172 gallons'");

                done();
            })
    });

    test('Send {input: "32g"} ', function (done) {
        chai.request(server).get('/api/convert').query({ input: "32g" })
            .end((err, res) => {
                assert.equal(res.status, 200, "Response status should be 200");
                assert.equal(res.text, "invalid unit", "Response should be error'");
                done();
            })
    });

    test('Send {input: "3/7.2/4kg"} ', function (done) {
        chai.request(server).get('/api/convert').query({ input: "3/7.2/4kg" })
            .end((err, res) => {
                assert.equal(res.status, 200, "Response status should be 200");
                assert.equal(res.text, "invalid number", "Response should be error'");
                done();
            })
    });

    test('Send {input: "3/7.2/4kilomegagram"} ', function (done) {
        chai.request(server).get('/api/convert').query({ input: "3/7.2/4kilomegagram" })
            .end((err, res) => {
                assert.equal(res.status, 200, "Response status should be 200");
                assert.equal(res.text, "invalid number and unit", "Response should be error'");
                done();
            })
    });

    test('Send {input: "kg"} ', function (done) {
        chai.request(server).get('/api/convert').query({ input: "kg" })
            .end((err, res) => {
                assert.equal(res.status, 200, "Response status should be 200");
                assert.equal(res.type, "application/json", "Response type should be 'application/json'");
                assert.equal(res.body.initNum, 1, "Response body.initNum should be 10");
                assert.equal(res.body.initUnit, "kg", "Response body.initUnit should be 'kg'");
                assert.equal(res.body.returnNum, 2.20462, "Response body.returnNum should be 2.20462");
                assert.equal(res.body.returnUnit, "lbs", "Response body.returnUnit should be 'lbs'");
                assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds", "Response body.string should be '1 kilograms converts to 2.20462 pounds'");

                done();
            })
    });

});
