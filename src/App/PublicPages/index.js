import { connect } from 'react-redux';
import PublicPages from './PublicPages';

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    logged: auth ? auth.logged : false,
  };
};

export default connect(
  mapStateToProps,
  null,
)(PublicPages);
