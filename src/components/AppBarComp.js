import React,{ useEffect } from 'react';
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'
import { Link } from "react-router-dom"

const useStyles = (theme) => ({
    Link: {
        textDecoration: 'none',
        color: 'white'
    }
})

function AppBarCompClass(props) {
    

    const { classes } = props
    return (
        <AppBar className="appBarColor" position="static">
            <Toolbar className='toolBarRight'>

                        <Link to='/login' className={classes.Link}>
                            <Button color="inherit">Login</Button>
                        </Link>

            </Toolbar>
        </AppBar>
    )

}

const AppBarComp = withStyles(useStyles)(AppBarCompClass)

export default AppBarComp