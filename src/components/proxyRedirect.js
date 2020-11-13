import React from 'react';
import { Button, withStyles } from "@material-ui/core"
import { Link } from "react-router-dom"

const proxyStyles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: '3.5vh'
    },
    link: {
        marginTop: '2vh',
        textDecoration: 'none'
    }
})

class proxyRedirectClass extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <div>Click Below To Redirect To The {this.props.name}!</div>
                {
                this.props.name == "Online Proxy" ? 
                (
                <Link to={this.props.link} className={classes.link}>
                    <Button variant="contained" className={classes.button}>Redirect</Button>
                </Link>
                ) : (
                    <Button variant="contained" href='/admin' className={[classes.button,classes.link]}>Redirect</Button>
                )
                } 
            </div>
        )
    }
}

const ProxyRedirect = withStyles(proxyStyles)(proxyRedirectClass)

export default ProxyRedirect