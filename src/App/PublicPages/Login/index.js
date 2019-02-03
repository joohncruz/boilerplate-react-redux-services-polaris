import { connect } from 'react-redux';

import { loadAuth } from 'Infrastructure/Ducks/Auth';
import Login from './Login';

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth,
  };
};

const mapDispatchToProps = dispatch => ({
  loadAuth: (data) => {
    dispatch(loadAuth(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
