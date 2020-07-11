import React from 'react';
import Page from '@chimerax/common-web/lib/widgets/Page';
import FolderPath from '../components/FolderPath';
import { fetchFolder } from '../redux/folder';
import { connect } from 'react-redux';
import FolderList from '../components/FolderList';
import CreateNew from '../components/CreateNew/CreateNew';
import CreateNewFolder from '../components/CreateNew/CreateNewFolder';
import CreateNewDocument from '../components/CreateNew/CreateNewDocument';
import FileTable from '../components/FileTable';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import SnackbarProgress from '../components/SnackbarProgress';

export interface HomePageProperties {
    initialize: () => void;
}

const HomePage: React.FC<HomePageProperties> = (properties) => {
    const { initialize } = properties;
    initialize();
    return (
        <Page>
            <FolderPath/>
            <CreateNew/>
            <FolderList/>
            <FileTable/>
            <CreateNewFolder/>
            <CreateNewDocument/>
            <SnackbarProgress/>
        </Page>
    );
};

const mapStateToProps = (state: ChimeraXAppState) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    initialize: () => {
        dispatch(fetchFolder());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
