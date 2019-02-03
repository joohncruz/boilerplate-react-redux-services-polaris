import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@shopify/polaris';

import './PageHeader.scss';

function PageHeader({ loadLogout }) {
  return (
    <div className="page-header">
      <div className="action-contant">
        <Button plain onClick={loadLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  loadLogout: PropTypes.func.isRequired,
};

export default PageHeader;
