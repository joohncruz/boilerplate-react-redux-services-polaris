import PublicPages from './PublicPages';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { auth } = state

  return {
    logged: auth ? auth.logged : false
  }
};

export default connect(
  mapStateToProps,
  null,
)(PublicPages);



