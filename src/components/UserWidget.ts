import { connect } from 'react-redux';
import UserWidget, { UserWidgetProperties } from '@chimerax/common-web/lib/widgets/UserWidget';
import ChimeraXAppState from '../redux/ChimeraXAppState';

const mapStateToProps = (state: ChimeraXAppState, properties: Partial<UserWidgetProperties>) => {
	return {
		user: state.user.user!!
	};
};

const mapDispatchToProps = (dispatch: any, properties: Partial<UserWidgetProperties>) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserWidget);
