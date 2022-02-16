import React from 'react';
import {Paper,Tab,Tabs as MUITabs} from '@mui/material';
// import useStyles from './style';

function Tabs({tabs}) {
    const [value, setValue] = React.useState(0);
    // const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
       <Paper elevation={0} variant='outlined'>
           <MUITabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant='fullWidth'
           >
               {tabs.map((tab,i)=> (
                   <Tab label={tab}/>
               ))}
           </MUITabs>
       </Paper>
    );
}

Tabs.defaultProps = {
    tabs:[]
}

export default Tabs;