import { connect } from 'react-redux';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import Register, { RegisterProperties } from '../widgets/Register';
import Credentials from '../model/Credentials';

const mapStateToProps = (state: ChimeraXAppState, properties: Partial<RegisterProperties>) => {
	return {
	};
};

const mapDispatchToProps = (dispatch: any, properties: Partial<RegisterProperties>) => {
	return {
		onSubmit: (credentials: Credentials) => {}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
