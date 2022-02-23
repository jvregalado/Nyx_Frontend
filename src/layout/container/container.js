import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {Header, Content} from '../../layout';
import theme from './theme';

function Container(props) {

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header/>
			<Content/>
		</ThemeProvider>
	);
}

export default Container;