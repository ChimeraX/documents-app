import { connect } from 'react-redux';
import ChimeraXAppState from '../../redux/ChimeraXAppState';
import CreateNew from '../../widgets/CreateNew';
import { toggleCreateMode } from '../../redux/folder';

const mapStateToProps = (state: ChimeraXAppState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onNewFolder: () => {
            dispatch(toggleCreateMode('folder'))
        },
        onNewDocument: () => {
            dispatch(toggleCreateMode('document'))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNew);
