import React from 'react';
import {Grid,Card,CardActions,CardContent,Button,Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

import {modules} from '../../helpers';

function Default(props) {

	const navigate = useNavigate();

	return (
		<Grid container>
			{
			modules.map((item,index) => {
				return (
				<Grid key={index} item container xs={12}>
					<Grid item xs={12}>
						<Typography variant='button'>{item.label.toUpperCase()}</Typography>
					</Grid>
					{
						item.subModules.map((sub,index,) => (
							<Cards key={index} label={sub.label} description={sub.label} path={sub.route} navigate={navigate}/>
						))
					}
				</Grid>
				)
			})
			}
		</Grid>
	);
}

const Cards = ({
	label,
	description,
	path,
	navigate
}) => {
	return (
	<Grid component='div' item xs={3} style={{padding:'10px'}}>
		<Card variant='outlined'>
			<CardContent>
				<Typography variant='h5' gutterBottom>
					{label}
				</Typography>
				<Typography variant='body2' gutterBottom>
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant='kerry' onClick={() => navigate(path)}>VISIT</Button>
			</CardActions>
		</Card>
	</Grid>
	)
}

export default Default;