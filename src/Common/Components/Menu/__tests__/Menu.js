import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from '../Menu';

describe('Menu', () => {
  let wrapper = null;
  const props = {
    items: [
      { id: "home", isMenu: true, name: "Home", path: "/home" },
      { id: "listagem", isMenu: true, name: "Listagem", path: "/listagem" }
    ]
  };

  const mountComponent = (newProps = {}) => {
    wrapper = mount(
      <Router>
        <Menu {...props} {...newProps} />
      </Router>
    );
  };

  beforeEach(() => {
    mountComponent();
  });

  it('should render the without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

})
