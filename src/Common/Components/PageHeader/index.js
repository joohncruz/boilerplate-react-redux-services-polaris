import PageHeader from './PageHeader';
import { connect } from 'react-redux';

import { loadLogout } from 'Ducks/Auth';

const mapDispatchToProps = (dispatch) => ({
  loadLogout: () => { dispatch(loadLogout()) },
})

export default connect(
  null,
  mapDispatchToProps,
)(PageHeader);



