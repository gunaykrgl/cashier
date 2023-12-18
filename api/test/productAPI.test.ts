import express from 'express';

// @ts-ignore
import request from 'supertest';

// @ts-ignore
import chai from 'chai';

const { expect } = chai;
import productAPI from '../src/routes/productAPI.ts';

const app = express();
app.use("/test/products", productAPI);

describe('GET /getProductsList', function () {
    it('should return all products', (done : any) => {
        request(app)
        .get('/test/products/getProductsList')
        .end((err : any, res : any) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            done();
        })
    });
});

// Test for getting a single product
describe('GET /products/:id', () => {
    it('should return a single product', (done: any) => {
        // Get the product with barcode 123456789012
        request(app)
        .get('/test/products/getProduct?barcode=123456789012')
        .end((err: any, res: any) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.barcode).to.equal(123456789012);
            done();
        })
    });
});

// END: Mocha Tests