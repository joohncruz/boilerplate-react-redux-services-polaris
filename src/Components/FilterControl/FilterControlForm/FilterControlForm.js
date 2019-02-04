import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Select, Popover, Button, TextField,
} from '@shopify/polaris';

import CalendarWithRange from '../../Calendar/CalendarWithRange';
import Icon from '../../Icon';

import './FilterControlForm.scss';

const getInitialSelectedToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    start: today,
    end: today,
  };
};

class FilterControlForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: getInitialSelectedToday(),
      isSelected: false,
      activeFilterPopover: false,
      primaryFilterSelected: '',
      secondFilterSelected: '',
    };
  }

  togglePopover = () => {
    const { activeFilterPopover } = this.state;
    this.setState({ activeFilterPopover: !activeFilterPopover });
  };

  handleChangePrimarySelect = (key, value) => {
    this.setState({
      [key]: value,
      secondFilterSelected: '',
      selected: getInitialSelectedToday(),
      isSelected: false,
    });
  }

  handleChangeDate = (value) => {
    this.setState({ selected: value, isSelected: true });
  };

  handleChange = (key, value) => {
    this.setState({ [key]: value });
  }

  handleSaveFilter = (filter, value) => {
    const { selected } = this.state;
    const { onFilterChange } = this.props;

    if (filter.type === 'select') {
      onFilterChange(filter, value);
    } else if (filter.type === 'date') {
      onFilterChange(filter, selected);
    } else {
      throw new Error(`Filter not implemented ${filter.type}`, filter);
    }

    this.setState({
      activeFilterPopover: false,
      isSelected: false,
      primaryFilterSelected: '',
      secondFilterSelected: '',
      selected: getInitialSelectedToday(),
    });
  }

  renderActivator = () => (
    <div
      onClick={this.togglePopover}
      className="filter-control-button"
    >
      <div className="text">
        Filtrar
        <Icon path="drownDown" color="middleGray" />
      </div>
    </div>
  )

  renderSelects = () => {
    let { filters } = this.props;
    const { primaryFilterSelected } = this.state;

    const secondFilter = primaryFilterSelected
      ? filters.find(filter => filter.value === primaryFilterSelected)
      : null;

    if (!filters.length) {
      return (
        <div> Não foi possível localizar filtros disponíveis </div>
      );
    }

    if (filters[0].value !== '') {
      filters = [
        { label: 'Selecione uma opção', value: '' },
        ...filters,
      ];
    }

    return (
      <div className="popover-filter-form-initial">
        <div className="select">
          <Select
            options={filters}
            value={primaryFilterSelected}
            onChange={
              value => this.handleChangePrimarySelect('primaryFilterSelected', value)
            }
            label="Filtrar todos os veículos por:"
          />
        </div>

        {secondFilter !== null ? this.renderOptions(secondFilter) : null}
      </div>
    );
  }

  renderOptions = (filter) => {
    const {
      secondFilterSelected,
      selected: {
        start: startDate,
        end: endDate,
      },
      isSelected,
    } = this.state;

    let filters = null;

    if (filter.type === 'select' && filter.childrenValues[0].value !== '') {
      filters = [
        { label: 'Selecione uma opção', value: '' },
        ...filter.childrenValues,
      ];
    } else {
      filters = [...filter.childrenValues];
    }

    return (
      <div className="popover-filter-form-end">
        <div className="select">
          {
            filter.type === 'date'
              ? (
                <CalendarWithRange
                  onChange={this.handleChangeDate}
                  disableDatesBefore={startDate}
                  disableDatesAfter={endDate}
                  styleContent={{ height: '36px', paddingLeft: 0 }}
                  button={false}
                />

              ) : (
                <Select
                  options={filters}
                  value={secondFilterSelected}
                  onChange={value => this.handleChange('secondFilterSelected', value)}
                />
              )
          }

        </div>

        {(Boolean(secondFilterSelected) || isSelected) && (
          <div className="button-content">
            <div className="button">
              <Button
                onClick={() => this.handleSaveFilter(filter, secondFilterSelected)}
              >
                Adicionar Filtro
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    const {
      searchValue,
      onSearchChange,
      placeholderInput,
      disabledConnectedLeft,
    } = this.props;

    const { activeFilterPopover } = this.state;

    return (
      <div className="filter-control-form">
        <div className="form-search">
          <TextField
            placeholder={placeholderInput}
            prefix={<Icon path="search" size="20" color="middleGray" />}
            value={searchValue}
            onChange={onSearchChange}
            connectedLeft={
              disabledConnectedLeft
                ? null
                : (
                  <div className="form-button">
                    <Popover
                      active={activeFilterPopover}
                      activator={this.renderActivator()}
                      onClose={this.togglePopover}
                      preferredAlignment="left"
                    >
                      <div className="popover-filter-form">
                        {this.renderSelects()}
                      </div>
                    </Popover>
                  </div>
                )
            }
          />
        </div>
      </div>
    );
  }
}

FilterControlForm.propTypes = {
  filters: PropTypes.array,
  onFilterChange: PropTypes.func,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  placeholderInput: PropTypes.string,
  disabledConnectedLeft: PropTypes.bool,
};

FilterControlForm.defaultProps = {
  placeholderInput: 'Pesquisar',
  disabledConnectedLeft: true,
  filters: [],
  onFilterChange: () => {},
};

export default FilterControlForm;
