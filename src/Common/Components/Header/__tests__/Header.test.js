import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Header from '../Header';

describe('Header', () => {
  let wrapper = null;
  const props = {};

  const mountComponent = (newProps = {}) => {
    wrapper = mount(<Header {...props} {...newProps} />);
  };

  beforeEach(() => {
    mountComponent();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<Header {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render the without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

})
