import React,{ useEffect } from 'react';
import { AppBar, Toolbar, Button, withStyles } from '@material-ui/core'
import { Link } from "react-router-dom"
import { verifyTokenAsync } from '../asyncActions/authAsyncActions';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = (theme) => ({
    Link: {
        textDecoration: 'none',
        color: 'white'
    }
})

function AppBarCompClass(props) {
    const authObj = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { authLoading, isAuthenticated } = authObj;

    useEffect(() => {
        dispatch(verifyTokenAsync());
    }, []);

    const { classes } = props
    return (
        <AppBar className="appBarColor" position="static">
            <Toolbar className='toolBarRight'>


                {isAuthenticated ? (
                    <div></div>
                ) : (
                        <Link to='/login' className={classes.Link}>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )
                }


            </Toolbar>
        </AppBar>
    )

}

const AppBarComp = withStyles(useStyles)(AppBarCompClass)

export default AppBarComp