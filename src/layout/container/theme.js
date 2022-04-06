import {createTheme,} from '@mui/material';
export default createTheme({
	typography:{
		htmlFontSize: 20
	},
	palette:{
		mode:'light',
		background:{
			default:'#EAECEE'
		},
		kerryOrange:{
			main:'#FF6400'
		}
	},
	components:{
		MuiAppBar:{
			variants:[
				{
					props:{ variant:'kerry'},
					style:{
						background:'#FFFFFF',
						color:'#FF6400'
					}
				}
			]
		},
		MuiButton:{
			styleOverrides:{
				root:{
					marginLeft:2,
					marginRight:2
				}
			},
			variants:[
				{
					props:{variant:'kerry'},
					style:{
						background:'#FF6400',
						'&:hover':{
							background:'#AA4200'
						},
						color:'white',
					}
				},
				{
					props:{variant:'pdf'},
					style:{
						background:'#B92222',
						'&:hover':{
							background:'#800000'
						},
						color:'white',
					}
				},
				{
					props:{variant:'spreadsheet'},
					style:{
						background:'#099000',
						'&:hover':{
							background:'#006000'
						},
						color:'white',
					}
				}
			]
		},
		MuiPaper:{
			variants:[
				{
					props:{variant:'container'},
					style:{
						padding:10
					}

				}
			]
		},
		MuiListItem:{
			variants:[
				{
					props: {variant: 'drawerItem'},
					style:{
						'&:hover':{
							color:'#FF6400'
						},
					}
				},
				{
					props: {variant: 'drawerSubItem'},
					style:{
						'&:hover':{
							color:'#FF6400'
						},
					}
				}
			]
		}
	}
})
