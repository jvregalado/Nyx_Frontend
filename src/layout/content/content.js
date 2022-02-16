import React from 'react';
import {Grid,Typography} from '@mui/material';
import {useLocation,Route,Routes} from 'react-router-dom'
import {mainRoutes} from '../../helpers/routes';
import {default as modules} from '../../helpers/modules';
import {Default} from '../../views'

function Content() {

    let location = useLocation();

    const [state,setState] = React.useState({
        header:'',
        subHeader:''
    })

    const [routes,setRoutes] = React.useState([])

    React.useEffect(()=>{
        const getHeaders = () => {
            let path = location.pathname
            let parentPath = path.substring(0,path.indexOf('/',1)) === '' ? path.substring(0,path.length) : path.substring(0,path.indexOf('/',1))
            let mods = modules.filter(item => item.route === parentPath)
            if(mods.length > 0 ){
                setState({
                    ...state,
                    header:mods[0].label,
                    subHeader: path.substring(1,path.length)
                })
            }
        }

        getHeaders()
    },[location,state])

    React.useEffect(()=>{
        let subModules = [];

        for(let module of modules){
            const sub = module.subModules
            subModules = subModules.concat(sub)
        }

        const data = mainRoutes.filter(item => subModules.map(i => i.route).includes(item.path))
        setRoutes(data)
    },[])

    return (
        <Grid container sx={{flexGrow: 1,padding:2}}>
            <Grid item xs={12}>
                <Typography variant='h5'>{state.header}</Typography>
                <Typography variant='body1' gutterBottom >{state.subHeader}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Routes>
                    <Route exact path='/' element={<Default/>}/>
                    {
                        routes.map((route,i) => (
                            <Route key={i} element={<RouteWithSubRoutes key={i} {...route}/>}/>
                        ))
                    }
                </Routes>
            </Grid>
        </Grid>
    );
}

const RouteWithSubRoutes = (route) =>{
    return (
        <Route
            path={route.path}
            render = {props => (
                <route.component {...props} routes={route.routes}/>
            )}
        />
    )
}

export default Content;