import React from 'react';
import { allowedRoles } from '../../hoc/allowedRoles';

const Admins = (props) => (
  <h3>Admins page</h3>
);

export default allowedRoles(['admin'])(Admins);
