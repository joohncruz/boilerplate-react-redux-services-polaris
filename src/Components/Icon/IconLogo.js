import React from 'react';
import PropTypes from 'prop-types';

function IconLogo({ color }) {
  return (
    <div>
      {color === 'mono' ? (
        <svg width="47px" height="24px" viewBox="0 0 47 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g id="Sprint-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="02.-Solicitar-acesso---768-PX" transform="translate(-361.000000, -56.000000)" fill="#C4CDD5">
              <g id="Group" transform="translate(361.000000, 56.000000)">
                <path d="M39.9842299,20.6112676 C39.9842299,18.9106479 41.3683686,17.532507 43.075292,17.532507 C44.7825547,17.532507 46.1666934,18.9106479 46.1666934,20.6112676 C46.1666934,22.3112113 44.7825547,23.6893521 43.075292,23.6893521 C41.3683686,23.6893521 39.9842299,22.3112113 39.9842299,20.6112676 Z" id="Fill-3" />
                <polygon id="Fill-4" points="40.3090511 0.148394366 45.8425511 0.148394366 45.8425511 15.683493 40.3090511 15.683493" />
                <path d="M14.439438,20.723493 C13.8827956,22.2064225 12.4518175,23.2705352 10.775781,23.2705352 C9.04340146,23.2705352 7.55913504,22.1212394 7.09074088,20.5663099 L0.069580292,0.148394366 L5.92484672,0.148394366 C6.80834672,2.99053521 10.4577482,14.7545915 10.6675073,15.8717746 L10.9064562,15.8717746 C11.0965292,14.7299155 14.7598467,2.98749296 15.6480985,0.148394366 L21.5054015,0.148394366 L14.439438,20.723493 Z" id="Fill-5" />
                <path d="M30.2823613,0.148394366 L30.2823613,17.9861408 L37.9246533,17.9861408 L37.9246533,23.2705352 L27.000208,23.2705352 C25.524427,23.2705352 24.3252701,22.0786479 24.3252701,20.6112676 L24.3252701,0.148394366 L30.2823613,0.148394366 Z" id="Fill-6" />
              </g>
            </g>
          </g>
        </svg>
      )
        : (
          <svg width="47px" height="24px" viewBox="0 0 47 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="05-Sidenav-/-_Resources-/-Logo" transform="translate(0.000000, -3.000000)">
                <g id="Group" transform="translate(0.000000, 3.000000)">
                  <path d="M39.9842299,20.6112676 C39.9842299,18.9106479 41.3683686,17.532507 43.075292,17.532507 C44.7825547,17.532507 46.1666934,18.9106479 46.1666934,20.6112676 C46.1666934,22.3112113 44.7825547,23.6893521 43.075292,23.6893521 C41.3683686,23.6893521 39.9842299,22.3112113 39.9842299,20.6112676 Z" id="Fill-3" fill="#DE6C27" />
                  <polygon id="Fill-4" fill="#FFFFFF" points="40.3090511 0.148394366 45.8425511 0.148394366 45.8425511 15.683493 40.3090511 15.683493" />
                  <path d="M14.439438,20.723493 C13.8827956,22.2064225 12.4518175,23.2705352 10.775781,23.2705352 C9.04340146,23.2705352 7.55913504,22.1212394 7.09074088,20.5663099 L0.069580292,0.148394366 L5.92484672,0.148394366 C6.80834672,2.99053521 10.4577482,14.7545915 10.6675073,15.8717746 L10.9064562,15.8717746 C11.0965292,14.7299155 14.7598467,2.98749296 15.6480985,0.148394366 L21.5054015,0.148394366 L14.439438,20.723493 Z" id="Fill-5" fill="#FFFFFF" />
                  <path d="M30.2823613,0.148394366 L30.2823613,17.9861408 L37.9246533,17.9861408 L37.9246533,23.2705352 L27.000208,23.2705352 C25.524427,23.2705352 24.3252701,22.0786479 24.3252701,20.6112676 L24.3252701,0.148394366 L30.2823613,0.148394366 Z" id="Fill-6" fill="#FFFFFF" />
                </g>
              </g>
            </g>
          </svg>
        )
      }
    </div>
  );
}
IconLogo.propTypes = {
  color: PropTypes.string,
};
export default IconLogo;
