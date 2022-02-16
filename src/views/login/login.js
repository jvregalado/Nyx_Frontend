import React from 'react';
import {Paper,CssBaseline,Link,TextField,Grid, Button, Typography,Box} from '@mui/material';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import {blueGrey} from '@mui/material/colors';
import {signIn} from '../../store/authentication/authentication.thunk';
import {useDispatch} from 'react-redux';

import kli_bg from '../../assets/kli_bg.png'

function Login() {

	const theme = React.useMemo(
		() =>
		createTheme({
			palette: {
				mode: 'dark'
			}
		}),
		[]
	);
	const dispatch = useDispatch();

	const [state,setState] = React.useState({
		email:'',
		password:''
	})

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signIn({email:state.email, password:state.password}))
	}

	return(
		<ThemeProvider theme={theme}>
		<CssBaseline />
		<Grid container sx={{
			height:'100vh',
			backgroundColor:blueGrey['900']
		}}>
			<Grid item sm={4} md={7} sx={{
				// backgroundImage: 'url(https://www.kerrylogistikus.com/_next/image?url=%2Fslide_image%2Fslide_2.png&w=1200&q=75)',
				backgroundImage: `url(${kli_bg})`,
				backgroundRepeat: 'no-repeat',
				backgroundColor: blueGrey['900'],
				backgroundSize: 'cover',
			}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box sx={{
					margin: theme.spacing(8, 4),
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
				<form noValidate onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
					>Sign In
					</Button>
					<Grid container>
					<Grid item xs>
						<Link href="#" variant="body2">
							Forgot password?
						</Link>
					</Grid>
					</Grid>
				</form>
				</Box>
			</Grid>
		</Grid>
		</ThemeProvider>
	);
}

export default Login;