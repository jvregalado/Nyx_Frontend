import React from 'react';
import {Grid} from '@mui/material';
import {Toolbar} from '../../../components/Toolbar';
import {CreateUser} from '../../../views/user-management';

function Users(props) {
    const [createModal,setCreateModal] = React.useState(false);

    const toggle = () => {
        setCreateModal(!createModal);
    }

    return (
        <Grid container>
            <Grid item md={12}>
                <Toolbar isCreate onCreate={toggle}/>
            </Grid>
            <CreateUser toggle={toggle} isOpen={createModal}/>
        </Grid>
    );
}

export default Users;