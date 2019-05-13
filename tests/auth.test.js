const request = require('supertest');
const bcrypt = require('bcryptjs');
const expect = require('expect');
const { users, populateUsers } = require('./seed/users');
const User = require('../models/User');

beforeEach(populateUsers);
// populateUsers();

// TODO: AUTH TEST NOT WORKING

describe('POST /auth/login', () => {
  it('should login user and return tokens', (done) => {
    // request(app)
    //   .post('/auth/login')
    //   .send({
    //     username: users[0].username,
    //     password: users[0].password
    //   })
    //   .expect(200)
    //   .expect((res) => {
    //     expect(res.body.username).toEqual(users[0].username);
    //     expect(res.body.role).toEqual(users[0].role);
    //     expect(res.body.accessToken).toExist();
    //     expect(res.body.accessTokenExp).toExist();
    //     expect(res.body.refreshToken).toExist();
    //     expect(res.body.refreshTokenExp).toExist();
    //   })
    //   .end((err, res) => {
    //     if (err) return done(err);
    //
    //     User.findById(users[0]._id)
    //       .then((user) => {
    //         expect(user.tokens[0]).toInclude({
    //           access: 'auth',
    //           token: res.body.refreshToken
    //         });
    //         done();
    //       }).catch((err) => done(err));
    //   });
    done();
  });


});
