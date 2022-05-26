import React from 'react';
import {Paper,CssBaseline,TextField,Grid, Button, Typography,Box} from '@mui/material';
import {createTheme,ThemeProvider} from '@mui/material/styles';
import {blueGrey} from '@mui/material/colors';
import {signIn} from '../../store/authentication/authentication.thunk';
import {Spinner} from '../../components';
import {SystemSelect} from '../../components/select';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify'

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
	const {loading} = useSelector(state => state.auth)
	const [state,setState] = React.useState({
		user_email:'',
		user_password:''
	})

	const [system,selectedSystem] = React.useState('')

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}

	const handleSystemChange = (e) => {
		selectedSystem(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		if(system === ''){
			return toast.error('Select System first!')
		}
		else{
			dispatch(signIn({
				user_email:state.user_email, 
				user_password:state.user_password,
				system
			}))
		}
	}

	return(
		<ThemeProvider theme={theme}>
		<CssBaseline />
		<Spinner loading={loading}/>
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

					<Typography component="h1" variant="h5" sx={{
						marginBottom:2
					}}>
						Sign in
					</Typography>
					<form noValidate onSubmit={handleSubmit}>
						<SystemSelect
							value={system}
							handleChange={handleSystemChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="user_email"
							label="Email Address"
							name="user_email"
							autoComplete="user_email"
							autoFocus
							onChange={handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="user_password"
							label="Password"
							type="password"
							id="user_password"
							autoComplete="current-password"
							onChange={handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
						>Sign In
						</Button>
				</form>
				</Box>
			</Grid>
		</Grid>
		</ThemeProvider>
	);
}

export default Login;