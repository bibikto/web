import React from 'react';
import { Paper, Typography, withStyles, StepContent, StepLabel, Step, Stepper, Button } from "@material-ui/core"

const styles = (theme) => ({
    root: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
});

function getSteps() {
    return ['Enter Vpn Details', 'Verify User', 'Credentials'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`;
        case 1:
            return `:)`;
        case 2:
            return `:)`;
        default:
            return 'Unknown step';
    }
}

class VerticalLinearStepperClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            steps: getSteps()
        }
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleNext() {
        this.setState({
            activeStep: this.state.activeStep + 1
        })
    }

    handleBack() {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    }

    handleReset() {
        this.setState({
            activeStep: 0
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Stepper activeStep={this.state.activeStep} orientation="vertical">
                    {this.state.steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent className={classes.textCon}>
                                <Typography >{getStepContent(index)}</Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={this.state.activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.button}
                                        >
                                            Back
              </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleNext}
                                            className={classes.button}
                                        >
                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {this.state.activeStep === this.state.steps.length && (
                    <Paper square elevation={0} className={classes.resetContainer}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
      </Button>
                    </Paper>
                )}
            </Paper>
        );
    }
}

const VerticalLinearStepper = withStyles(styles)(VerticalLinearStepperClass)

export default VerticalLinearStepper