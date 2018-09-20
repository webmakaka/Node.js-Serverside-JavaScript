  // const chai = require('chai');
  // const expect = chai.expect;
  // const chaiHttp = require('chai-http');
  // const server = require('../server');
  
  // chai.use(chaiHttp);


  describe('initial test', function () {
    it('should true to be true', function () {
      expect(true).to.be.true;
    });
    it.skip('postpone your assertion', () => {
    });
    it.skip('postpone your assertion')
  });

// Test the /GET route

describe('/GET users', () => {
  // it('it should GET all the users', (done) => {
  //   chai.request(server)
  //     .get('/api/v1.0/users')
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       expect(res.body).to.be.a('array');
  //       expect(res.body.length).to.not.be.equal(0);
  //       done();
  //     });
  // });
  it('it should GET all the users', (done) => {
    request
      .get('/api/v1.0/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.not.be.equal(0);
        done();
      });
  });
  it('it should return a right error for the wrong GET request', (done) => {
    request
      .get('/api/v1.0/user')
      .end((err, res) => {
        if (err || !res.ok) {
          expect(err).to.have.status(404);
          done();
        } else {
          done(new Error('the route is not wrong'));
        }
      });
  });
});

describe('GET /users/:id', () => {
  it('it should return the user by id', (done) => {
    const user = db.get('users').first().value();
    const userId = db.get('users').value().indexOf(user);
    request
      .get('/api/v1.0/users/' + userId)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(user);
        done();
      });
  });

  it('it should return status 404 when user id is not found', (done) => {
    const userId = 'fake id';
    request
      .get('/api/v1.0/users/' + userId)
      .end((err, res) => {
        if (err || !res.ok) {
          expect(err).to.have.status(404);
          done();
        } else {
          done(new Error('the id is found'));
        }
      });
  });
});
