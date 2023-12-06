// FILEPATH: /home/kayyum/cashier/api/tests/productAPITest.js
const request = require('supertest');
const express = require('express');
const chai = require('chai');
const expect = chai.expect;

// Import your router
const productRouter = require('/home/kayyum/cashier/api/routes/productAPI.js');

// Create an instance of an Express app
const app = express();
app.use('/api/products', productRouter);

describe('Product API', function () {
    it('should return "Product API" on /api/products GET', function (done) {
        request(app)
            .get('/api/products')
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('Product API');
                done();
            });
    });

    describe('/getProductsList', function () {
        it('should return a list of products', function (done) {
            request(app)
                .get('/api/products/getProductsList')
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('/getProduct', function () {
        it('should return a product given a barcode', function (done) {
            const barcode = 123456789012;
            request(app)
                .get("/api/products/getProduct?barcode=" + barcode)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.barcode).to.equal(barcode);
                    done();
                })
        });
    });
});