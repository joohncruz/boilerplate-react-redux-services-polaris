import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Icon from '..';

describe('Icon Test', () => {
  const props = {
    path: 'home',
  };
  const wrapper = shallow(<Icon {...props} />);

  it('renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with svg element', () => {
    expect(wrapper.find('svg')).toHaveLength(1);
  });

  it('should mount svg element fill, width, and height default attributes', () => {
    expect(wrapper.find('svg[fill="red"]')).toHaveLength(1);
    expect(wrapper.find('svg[width="24px"]')).toHaveLength(1);
    expect(wrapper.find('svg[height="24px"]')).toHaveLength(1);
  });

  it('should mount svg element fill, width, and height passed attributes', () => {
    const newWrapper = shallow(<Icon {...props} size="40px" color="darkGray" />);
    expect(newWrapper.find('svg[fill="#212B36"]')).toHaveLength(1);
    expect(newWrapper.find('svg[width="40px"]')).toHaveLength(1);
    expect(newWrapper.find('svg[height="40px"]')).toHaveLength(1);
  });
});
