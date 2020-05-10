import { createMuiTheme } from '@material-ui/core';
import ChimeraXAppTheme from './ChimeraXAppTheme';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#d1cdcf',
			main: '#839ca4',
			dark: '#181b22',
			contrastText: 'white',
		},
		secondary: {
			light: '#cd3c39',
			main: '#f00',
			dark: '#400',
			contrastText: 'white',
		},
		type: 'dark',
	},
});

const redTheme: ChimeraXAppTheme = {
	...theme,
	gradientImage: `linear-gradient(315deg, ${theme.palette.secondary.light} 0%, ${theme.palette.primary.dark} 74%)`,
	backgroundImage: `url('./images/red_car.jpg')`,
	name: 'RED_THEME',
};

export default redTheme;
