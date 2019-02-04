import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Calendar.scss';

import { DatePicker, Popover } from '@shopify/polaris';

import Icon from '../Icon';

class Calendar extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.state = {
      today,
      active: false,
      selected: {
        start: today,
        end: today,
      },
      year: moment().year(),
      month: moment().month() + 1,
    };
  }

  togglePopover = () => {
    this.setState(({ active }) => ({ active: !active }));
  };

  handleChange = (value) => {
    const { onChange, id } = this.props;
    onChange(value.start, id);
    this.setState({ selected: value });
  };

  handleMonthChange = (month, year) => {
    this.setState({
      month: month + 1,
      year,
    });
  };

  getPropsWithCondition = () => {
    const { disableDatesBefore, disableDatesAfter } = this.props;

    const response = {
      ...(disableDatesBefore instanceof Date
        ? { disableDatesBefore }
        : {}),
      ...(disableDatesAfter instanceof Date
        ? { disableDatesAfter }
        : {}),
    };

    return response;
  };

  renderDisplay = () => {
    const { selected, today } = this.state;
    const { displayFormat, isDisplayToday, hint } = this.props;

    if (
      isDisplayToday
      && today.toDateString() === selected.start.toDateString()
    ) {
      return hint || 'Selecione uma data';
    }

    return moment(selected.start).format(displayFormat);
  };

  renderActivator = () => {
    const { active } = this.state;
    const { styleButton, styleText, iconsColor } = this.props;

    return (
      <div
        onClick={this.togglePopover}
        className="calendar-buttonDate"
        style={styleButton}
      >
        <div className="icon">
          <Icon path="calendar" size="21px" color={iconsColor} />
        </div>
        <div className="text" style={styleText}>
          {this.renderDisplay()}
          <Icon
            path={active ? 'chevronUp' : 'chevronDown'}
            color={iconsColor}
          />
        </div>
      </div>
    );
  };

  render() {
    const {
      month, year, selected, active,
    } = this.state;

    return (
      <Popover
        active={active}
        activator={this.renderActivator()}
        onClose={this.togglePopover}
        fullHeight
      >
        <div className="calendar-date-picker">
          <DatePicker
            month={month - 1}
            year={year}
            onChange={this.handleChange}
            onMonthChange={this.handleMonthChange}
            selected={selected}
            {...this.getPropsWithCondition()}
          />
        </div>
      </Popover>
    );
  }
}

Calendar.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disableDatesBefore: PropTypes.object,
  disableDatesAfter: PropTypes.object,
  styleButton: PropTypes.object,
  styleText: PropTypes.object,
  iconsColor: PropTypes.string,
  displayFormat: PropTypes.string,
  isDisplayToday: PropTypes.bool,
};

Calendar.defaultProps = {
  id: '',
  styleButton: {},
  styleText: {},
  iconsColor: 'white',
  disableDatesBefore: {},
  disableDatesAfter: {},
  displayFormat: 'DD/MM/YYYY',
  isDisplayToday: true,
};

export default Calendar;
