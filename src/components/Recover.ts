import { connect } from 'react-redux';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import Recover, { RecoverProperties } from '../widgets/Recover';

const mapStateToProps = (state: ChimeraXAppState, properties: Partial<RecoverProperties>) => {
    return {};
};

const mapDispatchToProps = (dispatch: any, properties: Partial<RecoverProperties>) => {
    return {
	    onSubmit: () => {}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Recover);
