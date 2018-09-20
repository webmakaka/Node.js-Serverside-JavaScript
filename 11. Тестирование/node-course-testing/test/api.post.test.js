// Test the /POST route

describe('/POST users', () => {
  it.skip('it should POST a user', (done) => {
    const user = {
      firstName: 'testUser'
    };
    request
      .post('/api/v1.0/users')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('message').equal('User added');
        expect(res).to.have.header('Location');
        expect(res.headers.location).to.match(/^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/);
        done();
      });
  });
  it('it should not POST a user without required field', (done) => {
    const user = {};
    request
      .post('/api/v1.0/users')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.a('object');
        expect(res).to.not.have.header('Location');
        done();
      });
  });
});
