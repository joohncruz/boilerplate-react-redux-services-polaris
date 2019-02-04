import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  DatePicker,
} from '@shopify/polaris';

import Icon from '../../Icon';

import './CalendarWithRange.scss';

class CalendarWithRange extends Component {
  constructor(props) {
    super(props);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { text } = this.props;

    this.state = {
      placeHolder: text,
      active: false,
      selected: {
        start: today,
        end: today,
      },
      year: moment().year(),
      month: moment().month() + 1,
    };

    this.showDatePicker = this.showDatePicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    const { start, end } = value;
    const placeHolderComeco = `${moment(start).format('D MMM')}`;
    const placeHolderFim = `${moment(end).format('D MMM')}`;
    const placeHolder = `${placeHolderComeco} - ${placeHolderFim}`.toLocaleUpperCase();
    this.setState({
      selected: value,
      placeHolder,
    });
    onChange(value);
  };

  handleMonthChange = (month, year) => {
    this.setState({
      month: month + 1,
      year,
    });
  };

  // TODO
  // caso não seja possível alterar o idioma no componente do Polaris, implementar funções que
  // lêem os elementos da página e substituem pelo termo traduzido
  // componentDidMount() {
  //   translateMonth()
  //   translateDays()
  // }

  showDatePicker() {
    this.setState(({ active }) => ({ active: !active }));
  }

  render() {
    const {
      active,
      month,
      year,
      selected,
      placeHolder,
    } = this.state;

    const {
      styleContent,
      button,
    } = this.props;

    const hiddenCalendarStyle = {
      visibility: 'hidden',
      height: '0px',
      padding: '0px',
    };

    return (
      <div>
        {/* botão */}
        {button
          ? (
            <div
              onClick={this.showDatePicker}
              className="calendar-with-range"
              style={styleContent}
            >
              <div className="icon">
                <Icon
                  path="calendar"
                  size="21px"
                  color="black"
                />
              </div>
              <div className="text">
                {placeHolder}
                <Icon
                  path={active ? 'chevronUp' : 'chevronDown'}
                  color="black"
                />
              </div>
            </div>
          )
          : null
        }

        <div
          className="calendar-range-date-picker"
          style={
            active || !button ? {} : hiddenCalendarStyle
          }
        >

          <DatePicker
            allowRange
            month={month - 1}
            year={year}
            onChange={this.handleChange}
            onMonthChange={this.handleMonthChange}
            selected={selected}
          />
        </div>
      </div>
    );
  }
}

// function translateMonth() {
//   // TODO implementar
// }
// function translateDays() {
//   // TODO implementar
// }

CalendarWithRange.propTypes = {
  button: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  styleContent: PropTypes.object,
  text: PropTypes.string,
};

CalendarWithRange.defaultProps = {
  styleContent: {},
  text: 'Período',
};

export default CalendarWithRange;
