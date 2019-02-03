import { connect } from 'react-redux';

import { loadLogout } from 'Infrastructure/Ducks/Auth';
import PageHeader from './PageHeader';

const mapDispatchToProps = dispatch => ({
  loadLogout: () => {
    dispatch(loadLogout());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(PageHeader);
