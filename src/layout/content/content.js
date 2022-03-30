import React from 'react';
import {Grid,Typography} from '@mui/material';
import {useLocation,Route,Routes} from 'react-router-dom'
import {mainRoutes} from '../../helpers/routes';
import {Default} from '../../views'

function Content() {

	let location = useLocation();

	const [state,setState] = React.useState({
		header:'',
		subHeader:''
	})

	React.useEffect(()=>{
		const getHeaders = () => {
			let path = location.pathname
			let parentPath = path.substring(0,path.indexOf('/',1)) === '' ? path.substring(0,path.length) : path.substring(0,path.indexOf('/',1))
			let children = mainRoutes.filter(i => i.route === parentPath && path.includes(i.route))
			if(children.length > 0 ){
				setState({
					...state,
					header: children[0].module,
					subHeader: path.substring(1,path.length)
				})
			}
		}
		getHeaders()
	},[location,state])

	// console.log('mainRoutes', mainRoutes)

	return (
		<Grid container sx={{flexGrow: 1,padding:2}}>
			<Grid item xs={12}>
				<Typography variant='subtitle1'>{state.header}</Typography>
				<Typography variant='subtitle2'>{state.subHeader}</Typography>
			</Grid>
			<Grid item xs={12}>
				<Routes>
					<Route exact path='/' element={<Default/>}/>
					{
						mainRoutes.map((route,i) => (
							<Route path={route.route} key={i} element={<route.component/>}/>
						))
					}
				</Routes>
			</Grid>
		</Grid>
	);
}

export default Content;