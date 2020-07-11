import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Title from '../components/Title';
import UserWidget from '../components/UserWidget';
import FlexGrow from '@chimerax/common-web/lib/widgets/FlexGrow';
import ChimeraXAppTheme from '../theming/ChimeraXAppTheme';

const useStyles = makeStyles((theme: ChimeraXAppTheme) => {
	return createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			backgroundColor: theme.palette.primary.dark,
		},
		menuButton: {
			marginRight: 36,
		},
		hide: {
			display: 'none',
		},
		content: {
			flexGrow: 1,
			paddingTop: theme.spacing(8),
			paddingRight: theme.spacing(3),
			paddingLeft: theme.spacing(3),
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			backgroundAttachment: 'fixed',
			backgroundSize: 'cover',
			backgroundColor: theme.palette.primary.light,
		},
	});
});

const Main: React.FC = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline/>
			<AppBar
				position="fixed"
				className={classes.appBar}
			>
				<Toolbar>
					<Title/>
					<FlexGrow/>
					<UserWidget/>
				</Toolbar>
			</AppBar>
			<main className={classes.content}>{props.children}</main>
		</div>
	);
};

export default Main;
