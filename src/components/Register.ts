import { connect } from 'react-redux';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import Register  from '../widgets/Register';
import Credentials from '../model/Credentials';
import { doRegister } from '../redux/register';

const mapStateToProps = (state: ChimeraXAppState) => {
	return {
		error: state.register.error
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		onSubmit: (credentials: Credentials) => {
			dispatch(doRegister(credentials));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
