const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const userThreeId = new ObjectID();

const users = [
  {
    _id: userOneId,
    username: 'student1',
    password: 'userOnePass',
    role: 'student'
  },
  {
    _id: userTwoId,
    username: 'student2',
    password: 'userTwoPass',
    role: 'student'
  },
  {
    _id: userThreeId,
    username: 'employee1',
    password: 'userThreePass',
    role: 'employee'
  }
];

const populateUsers = (done) => {
  console.log('populateUsers');
  let user = new User(users[0]);
  console.log('user', user);
  console.log(done);
  user.save().then(() => {
    console.log('saved');
    done();
  }).catch(err => done(err));
};

module.exports = { users, populateUsers };
