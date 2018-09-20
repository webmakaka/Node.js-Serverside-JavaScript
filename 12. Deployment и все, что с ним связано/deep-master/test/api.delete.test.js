// Test the /DELETE route

describe('DELETE /users/:id', () => {
  it.skip('it should delete the user by id', (done) => {
    const user = db.get('users').last().value();
    const userId = db.get('users').value().indexOf(user);
    request
      .delete('/api/v1.0/users/' + userId)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(user);
        done();
      });
  });

  it('it should return status 404 when user id is not found', (done) => {
    const userId = 'fake id';
    request
      .delete('/api/v1.0/users/' + userId)
      .end((err, res) => {
        if (err || !res.ok) {
          expect(err).to.have.status(404);
          done();
        } else {
          done(new Error('the user id is found'));
        }
      });
  });
});
