import React from 'react';
import { AppBar, Toolbar, Paper, withStyles, InputBase, Divider, IconButton, } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';


const axios = require('axios');

const ProxyPageStyles = ({
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: '#5a5a5a',
        height: '6.5vh',
        display: 'flex',
        alignItems: 'center'
    },
    iFrame: {
        height: '93.5vh',
        width: '100%',
        backgroundColor: 'transparent',
        border: '0'
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80vw',
    },
    input: {
        marginLeft: 10,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
})

class ProxyPageClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.facebook.com',
            value: 'https://www.facebook.com',
            srcdoc: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.redirect = this.redirect.bind(this)
        this.enter = this.enter.bind(this)
        this.call = this.call.bind(this)
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    redirect() {
        this.setState({
            url: this.state.value
        }, () => { this.call() })
    }

    enter(event) {
        if (event.keyCode == 13)
            this.redirect()
    }

    call() {

        let self = this
        let url = this.state.url
        if (!/^https?:\/\//i.test(url)) {
            this.setState({ value: 'https://' + url })
            url = 'https://' + url
        }
        let url1 = '/api/cors' + url
        axios.get(url1)
            .then(function (data) {
                self.setState({ srcdoc: data.data })
                console.log(data)
            })
            .catch(
                error => { console.log(error) }
            )
    }


    componentDidMount = () => {
        this.call()
    }

    render() {
        const { classes } = this.props
        return (
            <Paper>
                <iframe className={classes.iFrame} srcDoc={this.state.srcdoc} />

                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Paper className={classes.root}>

                            <InputBase
                                className={classes.input}
                                placeholder="Enter Url"
                                value={this.state.value}
                                onChange={this.handleChange}
                                onKeyUp={this.enter}
                            />
                            <Divider className={classes.divider} orientation="vertical" />
                            <IconButton color="secondary" className={classes.iconButton} onClick={this.redirect} aria-label="search">
                                <SearchIcon className={classes.searchIcon} />
                            </IconButton>
                        </Paper>
                    </Toolbar>
                </AppBar>
            </Paper >
        )
    }
}

const ProxyPage = withStyles(ProxyPageStyles)(ProxyPageClass)

export default ProxyPage