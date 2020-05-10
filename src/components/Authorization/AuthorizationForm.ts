import ChimeraXAppState from '../../redux/ChimeraXAppState';
import { connect } from 'react-redux';
import AuthorizationForm from '../../widgets/Authorization';
import Authorization from '../../model/Authorization';
import { doAuthorize, doRedirect } from '../../redux/authorize';

const mapStateToProps = (state: ChimeraXAppState) => ({
    client: state.client.client,
});

const mapDispatchToProps = (dispatch: any) => ({
    onSubmit: (authorization: Authorization) => {
        dispatch(doAuthorize(authorization)).then((code: any) => {
            dispatch(doRedirect());
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationForm);
