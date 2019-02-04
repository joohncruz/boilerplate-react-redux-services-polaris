import React from 'react';
import PropTypes from 'prop-types';

import { Tag } from '@shopify/polaris';
import keygen from '../../../helpers/keygen';

import './FilterControlTags.scss';

function FilterControlTags({ appliedFilters, onFilterRemove }) {
  if (!appliedFilters.length) {
    return null;
  }

  const renderTag = (filter) => {
    const label = filter.getSelectedLabel();

    return (
      <Tag key={keygen('filterControlTag', label)} onRemove={() => onFilterRemove(filter)}>
        {label}
      </Tag>
    );
  };

  return <div className="filter-control-tags">{appliedFilters.map(renderTag)}</div>;
}

FilterControlTags.propTypes = {
  appliedFilters: PropTypes.array.isRequired,
  onFilterRemove: PropTypes.func.isRequired,
};

export default FilterControlTags;
