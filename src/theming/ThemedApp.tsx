import ChimeraXAppTheme from './ChimeraXAppTheme';
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ChimeraXAppState from '../redux/ChimeraXAppState';
import redTheme from './redTheme';
import { connect } from 'react-redux';

interface ThemedAppProperties {
    theme: ChimeraXAppTheme
}

const ThemedApp: React.FC<ThemedAppProperties> = (properties) => {
    const { theme, children } = properties;
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

const mapStateToProps = (state: ChimeraXAppState) => {
    return {
        theme: redTheme,
    };
};

export default connect(mapStateToProps)(ThemedApp);
