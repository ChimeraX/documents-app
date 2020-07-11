import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DocumentDetails } from '../../model/Document';
import {
    Icon,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { toISOString, toSize } from '../FolderList/util';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            margin: '30px 0px 20px',
            backgroundColor: 'transparent',
        },
        head: {
            backgroundColor: theme.palette.primary.dark,
        },
        body: {
            backgroundColor: theme.palette.primary.light,
        },
        bodyRow: {
            color: theme.palette.common.black,
        },
        icon: {
            color: theme.palette.primary.dark,
        },
    }),
);

export interface FileTableProperties {
    documents: DocumentDetails[];
    onShare: (document: DocumentDetails) => void;
    onDelete: (document: DocumentDetails) => void;
    onDownload: (document: DocumentDetails) => void;
}

function renderIcon(type: string) {
    switch (true) {
        case /image\/(jpeg)|(png)|(jpg)/.test(type):
            return 'image';
        case 'application/pdf' === type:
            return 'picture_as_pdf';
        default :
            return 'description';
    }
}

const FileTable: React.FC<FileTableProperties> = (properties) => {
    const { onShare, onDelete, onDownload, documents } = properties;
    const classes = useStyles();

    const StyledTableCell = (properties: any) => (<TableCell className={classes.bodyRow} {...properties}/>);

    return (
        <>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="file-table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell padding="checkbox"/>
                            <TableCell>File</TableCell>
                            <TableCell align="center">Owner</TableCell>
                            <TableCell align="center">Created</TableCell>
                            <TableCell align="center">Size</TableCell>
                            <TableCell padding="checkbox"/>
                            <TableCell padding="checkbox"/>
                            <TableCell padding="checkbox"/>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.body}>
                        {documents.map((doc) => (
                            <TableRow key={doc.name}>
                                <StyledTableCell padding={'checkbox'}>
                                    <Icon>
                                        {renderIcon(doc.type)}
                                    </Icon>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">{doc.name}</StyledTableCell>
                                <StyledTableCell align="center">You</StyledTableCell>
                                <StyledTableCell align="center">{toISOString(doc.createdAt)}</StyledTableCell>
                                <StyledTableCell align="center">{toSize(doc.size)}</StyledTableCell>
                                <StyledTableCell padding={'checkbox'}>
                                    <IconButton onClick={() => {
                                        onShare(doc);
                                    }}>
                                        <Icon className={classes.icon}>share</Icon>
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell padding={'checkbox'}>
                                    <IconButton onClick={() => {
                                        onDownload(doc);
                                    }}>
                                        <Icon className={classes.icon}>cloud_download</Icon>
                                    </IconButton>
                                </StyledTableCell>
                                <StyledTableCell padding={'checkbox'}>
                                    <IconButton onClick={() => {
                                        onDelete(doc);
                                    }}>
                                        <Icon className={classes.icon}>delete</Icon>
                                    </IconButton>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default FileTable;
