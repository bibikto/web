import React from 'react';
import { Button, withStyles } from "@material-ui/core"
import { Link } from "react-router-dom"

const proxyStyles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
                    <Button variant="contained" className="buttonMain">Redirect</Button>
                </Link>
                ) : (
                    <Button variant="contained" href='/admin' className={["buttonMain",classes.link]}>Redirect</Button>
                )
                } 
            </div>
        )
    }
}

const ProxyRedirect = withStyles(proxyStyles)(proxyRedirectClass)

export default ProxyRedirect