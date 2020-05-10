import ChimeraXAppState from '../../redux/ChimeraXAppState';
import { connect } from 'react-redux';
import ClientLogo from '../../widgets/Authorization/ClientLogo';

const mapStateToProps = (state: ChimeraXAppState) => {
    return {
        client: state.client.client
    };
};

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogo);
