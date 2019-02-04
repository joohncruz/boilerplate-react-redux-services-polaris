import moment from 'moment';

class FilterControlModel {
  constructor({
    label = '',
    value = '',
    childrenValues = [],
    selected = '',
    onFilter = () => {},
    type = 'select',
  }) {
    this.label = label;
    this.value = value;
    this.childrenValues = childrenValues;
    this.selected = selected;
    this.onFilter = onFilter;
    this.type = type;

    this.onFilter.bind(this);
  }

  getSelectedOption() {
    if (!this.selected) {
      return null;
    }

    if (this.type === 'select') {
      return this.childrenValues.find(option => option.value === this.selected) || null;
    }

    if (this.type === 'date') {
      return {
        label: `${moment(this.selected.start).format('DD/MM/YYYY')} a ${moment(
          this.selected.end,
        ).format('DD/MM/YYYY')}`,
      };
    }

    return null;
  }

  getSelectedLabel() {
    const selectecOption = this.getSelectedOption();
    return selectecOption ? selectecOption.label : '';
  }
}

export default FilterControlModel;
