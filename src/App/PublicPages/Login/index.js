import Login from './Login';
import { connect } from 'react-redux';

import { loadAuth } from 'Ducks/Auth';

const mapStateToProps = state => {
  const { auth } = state

  return {
    auth,
  }
};

const mapDispatchToProps = (dispatch) => ({
  loadAuth: (data) => { dispatch(loadAuth(data)) },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);



