import { connect } from 'react-redux';

import { loadList } from 'Infrastructure/Ducks/List';
import Listagem from './Listagem';

const mapStateToProps = (state) => {
  const { list } = state;

  return {
    list,
  };
};

const mapDispatchToProps = dispatch => ({
  loadList: (data) => {
    dispatch(loadList(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listagem);
