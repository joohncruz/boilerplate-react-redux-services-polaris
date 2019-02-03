import { connect } from 'react-redux';
import PrivatePages from './PrivatePages';

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    logged: auth ? auth.logged : false,
  };
};

export default connect(
  mapStateToProps,
  null,
)(PrivatePages);
