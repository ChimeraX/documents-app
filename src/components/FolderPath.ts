import { backToFolder, backToHome, fetchFolder } from '../redux/folder';
import { SubFolder } from '../model/Folder';
import FolderPath from '../widgets/FolderPath';
import { connect } from 'react-redux';
import ChimeraXAppState from '../redux/ChimeraXAppState';

const mapStateToProps = (state: ChimeraXAppState) => ({
    folders: state.folder.path,
});

const mapDispatchToProps = (dispatch: any) => ({
    onClick: (folder: SubFolder) => {
        dispatch(backToFolder(folder));
        dispatch(fetchFolder(folder.id))
    },
    onClear: () => {
        dispatch(backToHome());
        dispatch(fetchFolder(1))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderPath);
