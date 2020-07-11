import FolderList from '../widgets/FolderList/FolderList';
import { connect } from 'react-redux';
import { SubFolder } from '../model/Folder';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import { fetchFolder, goToFolder } from '../redux/folder';

const mapStateToProps = (state: ChimeraXAppState) => {
    return {
        folder: state.folder.current,
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    onClick: (folder: SubFolder) => {
        dispatch(goToFolder(folder));
        dispatch(fetchFolder(folder.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderList);
