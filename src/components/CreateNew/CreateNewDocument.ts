import { connect } from 'react-redux';
import ChimeraXAppState from '../../redux/ChimeraXAppState';
import { saveDocument, toggleCreateMode } from '../../redux/folder';
import Document from '../../model/Document';
import CreateNewDocument from '../../widgets/CreateNew/CreateNewDocument';

const mapStateToProps = (state: ChimeraXAppState) => {
    return {
        open: state.folder.createMode === 'document',
        folder: state.folder.current!!,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSave: (document: Document) => {
            dispatch(saveDocument(document));
            dispatch(toggleCreateMode(undefined));
        },
        onClose: () => {
            dispatch(toggleCreateMode(undefined));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewDocument);
