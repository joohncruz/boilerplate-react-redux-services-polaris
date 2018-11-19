import React from 'react';
import { mount } from 'enzyme';

import PageHeader from '../PageHeader';

describe('PageHeader', () => {
  let wrapper = null;
  const props = {};

  const mountComponent = (newProps = {}) => {
    wrapper = mount(<PageHeader {...props} {...newProps} />);
  };

  beforeEach(() => {
    mountComponent();
  });

  it('should render the without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

})
