import ChimeraXAppState from '../../redux/ChimeraXAppState';
import { connect } from 'react-redux';
import UserLogo from '../../widgets/Authorization/UserLogo';

const mapStateToProps = (state: ChimeraXAppState) => {
    return {
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserLogo);
