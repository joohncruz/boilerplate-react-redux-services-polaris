import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import './Menu.scss';

function Menu({ items }) {
  return (
    <div className="menu">
      {items
        ? items.map(item => (
          <div key={`menu-item-${item.id}`}>
            <NavLink to={item.path}>{item.name}</NavLink>
          </div>
        ))
        : null}
    </div>
  );
}

Menu.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Menu;
