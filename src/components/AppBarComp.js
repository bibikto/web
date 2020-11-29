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
function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: (userObj) => {
            dispatch({ type: "SET_USER", payload: userObj })
        }
    }
}

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
                    {this.props.currentUser.name == "" ? (
                        <Link to='/login' className={classes.Link}>
                            <Button color="inherit">Login</Button>
                        </Link>
                    ) : (
                            <Avatar>{this.props.currentUser.name.charAt(0)}</Avatar>
                        )
                    }

                </Toolbar>
            </AppBar>
        )
    }
}

const AppBarCompT = withStyles(useStyles)(AppBarCompClass)
const AppBarComp = connect(mapStateToProps, mapDispatchToProps)(AppBarCompT)

export default AppBarComp