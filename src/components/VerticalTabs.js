import React from 'react';
import { Tabs, Tab, Paper, Typography, withStyles, Box } from "@material-ui/core";
import VerticalLinearStepper from "./VerticalLineStepper"
import ProxyRedirect from "./proxyRedirect"

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = (theme) => ({
    root: {
        marginTop: '5vh',
        display: 'flex',
    },
    tabs: {
        width: '15%',
        borderRight: `1px solid ${theme.palette.divider}`,

    },
    tabPanel: {
        width: '85%',
        margin: 'auto 0'
    },
    "@media screen and (max-width: 600px)": {
        tabs: {
            width: '30%',
            borderRight: `1px solid ${theme.palette.divider}`,

        },
        tabPanel: {
            width: '70%'
        }
    }
});

class VerticalTabsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    };
    render() {
        const { classes } = this.props
        const { value } = this.state

        return (

            <Paper className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Pi-Hole Control Panel" {...a11yProps(0)} />
                    <Tab label="VPN Config Generation" {...a11yProps(1)} />
                    <Tab label="Online Proxy" {...a11yProps(2)} />
                </Tabs>
                <TabPanel className={classes.tabPanel} value={value} index={0}>
                    <ProxyRedirect name="Pi-Hole Admin Panel" />
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={1}>
                    <VerticalLinearStepper />
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={2}>
                    <ProxyRedirect name="Online Proxy" link="/proxy" />
                </TabPanel>

            </Paper>

        );
    }
}

const VerticalTabs = withStyles(useStyles)(VerticalTabsClass)

export default VerticalTabs