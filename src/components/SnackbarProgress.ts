import ChimeraXAppState from '../redux/ChimeraXAppState';
import SnackbarProgress from '../widgets/SnackbarProgress';
import { connect } from 'react-redux';

const mapStateToProps = (state: ChimeraXAppState) => ({
    open: state.folder.loading,
});

export default connect(mapStateToProps)(SnackbarProgress);
