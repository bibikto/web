import React from 'react';
import { AppBar, Toolbar, Button, withStyles} from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';

const useStyles = (theme) => ({
    Link: {
        textDecoration: 'none',
        color: 'white'
    }
})

class AppBarCompClass extends React.Component {
    componentDidMount = () => {
        /*const user = {
          name: "Bibikto"
        }
        this.props.setUser(user)*/
    }
    render() {
        const { classes } = this.props
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
}

const AppBarComp = withStyles(useStyles)(AppBarCompClass)

export default AppBarComp