const jwt = require('jsonwebtoken');

const secret = 'jwtsdlfk';
let user = { username: 'sultan', role: 'admin' };

let token1 = jwt.sign(user, secret, { expiresIn: 5 });

setTimeout(() => {
  let token2 = jwt.sign(user, secret, { expiresIn: 120 });
  console.log('1:  ', token1);
  console.log('2:  ', token2);
  console.log('Same:  ', token1 === token2);

  jwt.verify(token1, secret, (err, decoded) => {
    console.log(decoded);
  });
}, 1000);

setTimeout(() => {
  jwt.verify(token1, secret, (err, decoded) => {
    if (err) {
      console.log(err);
    }
    console.log(decoded);
  });
}, 6000)
