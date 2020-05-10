import { connect } from 'react-redux';
import Login, { LoginProperties } from '../widgets/Login';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import Credentials from '../model/Credentials';
import { doLogin } from '../redux/login';

const mapStateToProps = (state: ChimeraXAppState, properties: Partial<LoginProperties>) => {
	return {
		error: state.login.error,
	};
};

const mapDispatchToProps = (dispatch: any, properties: Partial<LoginProperties>) => {
	return {
		onSubmit: (credentials: Credentials) => dispatch(doLogin(credentials)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
