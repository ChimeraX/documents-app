import { connect } from 'react-redux';
import ChimeraXAppState from '../../redux/ChimeraXAppState';
import { saveFolder, toggleCreateMode } from '../../redux/folder';
import CreateNewFolder from '../../widgets/CreateNew/CreateNewFolder';
import { CreateFolder } from '../../model/Folder';

const mapStateToProps = (state: ChimeraXAppState) => {
    return {
        open: state.folder.createMode === 'folder',
        parent: state.folder.current!!,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSave: (folder: CreateFolder) => {
            dispatch(saveFolder(folder));
            dispatch(toggleCreateMode(undefined));
        },
        onClose: () => {
            dispatch(toggleCreateMode(undefined));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewFolder);
