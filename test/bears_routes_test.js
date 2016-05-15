const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/bears_app_test';
// const server = require(__dirname + '/test_server');
const Comment = require(__dirname + '/../models/comment');

describe('the bear chat api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our bear comments', (done) => {
    chai.request('localhost:3000')
      .get('/api/comments')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a bear comment with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/comments')
      .send({bear: 'test bear', message: 'salmons running big on Skagit, yo'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.bear).to.eql('test bear');
        expect(res.body.message).to.eql('salmons running big on Skagit, yo');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a comment already in db', () => {
    beforeEach((done) => {
      Comment.create({bear: 'test bear', message: 'salmons running big on Skagit, yo'}, (err, data) => {
        this.testComment = data;
        done();
      });
    });

    it('should be able to update a bears comment', (done) => {
      chai.request('localhost:3000')
        .put('/api/comments/' + this.testComment._id)
        .send({message: 'new bear comment'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a bear comment', (done) => {
      chai.request('localhost:3000')
        .delete('/api/comments/' + this.testComment._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });
});
