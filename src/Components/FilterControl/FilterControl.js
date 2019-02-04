import React from 'react';
import PropTypes from 'prop-types';

import FilterControlForm from './FilterControlForm';
import FilterControlTags from './FilterControlTags';

import './FilterControl.scss';

function FilterControl({
  filters,
  appliedFilters,
  onFilterChange,
  onFilterRemove,
  searchValue,
  onSearchChange,
  placeholderInput,
  disabledConnectedLeft,
}) {
  return (
    <div className="filter-control">
      <FilterControlForm
        filters={filters}
        onFilterChange={onFilterChange}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        placeholderInput={placeholderInput}
        disabledConnectedLeft={disabledConnectedLeft}
      />
      <FilterControlTags appliedFilters={appliedFilters} onFilterRemove={onFilterRemove} />
    </div>
  );
}

FilterControl.propTypes = {
  filters: PropTypes.array,
  appliedFilters: PropTypes.array,
  onFilterChange: PropTypes.func,
  onFilterRemove: PropTypes.func,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholderInput: PropTypes.string,
  disabledConnectedLeft: PropTypes.bool,
};

FilterControl.defaultProps = {
  filters: [],
  appliedFilters: [],
  onFilterChange: () => {},
  onFilterRemove: () => {},
  placeholderInput: 'Escreva um termo para pesquisar...',
  disabledConnectedLeft: false,
};

export default FilterControl;
