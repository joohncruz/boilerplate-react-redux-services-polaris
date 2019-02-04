import React from 'react';
import PropTypes from 'prop-types';
import { icons } from 'Common/Helpers/IconHelper';
import { colors } from 'Config/Palette';

import './Icon.scss';

function Icon({
  path, size, color, transform,
}) {
  const cor = colors[color] === undefined ? color : colors[color];
  const sizeDefault = size === undefined ? '21px' : size;
  const pointsPolygon = [
    ' 40.3090511 0.148394366 45.8425511 0.148394366 ',
    ' 45.8425511 15.683493 40.3090511 15.683493 ',
  ];
  return (
    <svg
      fill={cor}
      width={sizeDefault}
      height={sizeDefault}
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        alignSelf: 'center',
        transform: transform || null,
      }}
    >
      <g id={path} stroke="none" strokeWidth="1" fillRule="evenodd">
        <path d={icons[path]} id="Icon" />
        {path === 'logo1' ? (
          <polygon id="Fill-4" points={`${pointsPolygon[0]} ${pointsPolygon[1]}`} />
        ) : (
          false
        )}
      </g>
    </svg>
  );
}

Icon.propTypes = {
  path: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  transform: PropTypes.string,
};

Icon.defaultProps = {
  size: '24px',
  color: 'red',
  transform: '',
  path: '',
};

export default Icon;
