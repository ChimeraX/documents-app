import { connect } from 'react-redux';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import { DocumentDetails } from '../model/Document';
import FileTable from '../widgets/FileTable/FileTable';
import { deleteDocument, downloadDocument } from '../redux/folder';
import * as endpoints from '../rest/endpoints';

const mapStateToProps = (state: ChimeraXAppState) => {
    return {
        documents: state.folder.current?.documents || [],
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    onShare: (doc: DocumentDetails) => {
    },
    onDelete: (doc: DocumentDetails) => {
        dispatch(deleteDocument(doc));
    },
    onDownload: (doc: DocumentDetails) => {
        window.open(`${endpoints.documentsURL}/${doc.id}/download`);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FileTable);
