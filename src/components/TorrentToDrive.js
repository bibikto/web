import React, { Component } from "react";
import { Paper, withStyles, Button, TextField } from "@material-ui/core";
import {
  AddCircleRounded,
  DeleteForeverRounded,
  Save,
} from "@material-ui/icons/";
import {withRouter} from 'react-router-dom';
import "./TorrentToDrive.css";
const axios = require('axios')

const TorrentToDriveStyle = {
  root: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  con: {
    marginTop: "5vh",
    padding: "20px 30px",
  },
  addButton: {
    height: "37px",
    width: "37px",
  },
  buttonSave: {
    marginTop: "2vh",
  },
  "@media screen and (max-width: 600px)": {
    con: {
      padding: "10px 15px",
      width: "100%",
      marginTop: "0vh",
    },
  },
};
class TorrentToDriveClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: [],
      validation: [false, false, false],
      inputValue: ["", "", ""],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateMagnet = this.validateMagnet.bind(this);
  }

  handleClick() {
    let tempar = this.state.inputFields;
    let tempindex = this.state.inputFields.length;
    tempar.push(
      <div class="buttonCon">
        <TextField
          onChange={(e) => {
            this.validateMagnet(e, tempindex+1);
          }}
          className="inputField"
          label="Magnet Link"
          variant="filled"
          error={this.state.validation[tempindex+1]}
          helperText={
            this.state.validation[tempindex+1] ? "Invalid Magnet Link" : ""
          }
          required
        />
        <Button
          color="secondary"
          onClick={() => {
            this.handleDelete(tempindex);
          }}
        >
          <DeleteForeverRounded />
        </Button>
      </div>
    );
    this.setState({
      inputFields: tempar,
    });
  }

  handleDelete(number) {
    let tempar = this.state.inputFields;
    tempar.splice(number - 1, 1);
    this.setState({
      inputFields: tempar,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let self = this;
    if (this.state.validation.indexOf(true) == -1) {
        let data = {}
        for(let i =0;i <3;i++){
            if(this.state.inputValue[i] != "")
                data["url"+i] = this.state.inputValue[i]
        }
        axios.post('/api/torrent/add', data)
          .then(function (response) {
            self.props.history.push({pathname: '/progress',
            state: { data: response.data}})
          })
    } else {

    }
  }

  validateMagnet(e, index) {
    let temp = this.state.inputValue;
    temp[index] = e.target.value;
    this.setState({
      inputValue: temp,
    });
    if (
      e.target.value.match(/magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32}/i) ==
        null &&
      e.target.value != ""
    ) {
      let temp = this.state.validation;
      temp[index] = true;
      this.setState({
        validation: temp,
      });
    } else {
      let temp = this.state.validation;
      temp[index] = false;
      this.setState({
        validation: temp,
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.con}>
          <Button
            color="secondary"
            onClick={this.handleClick}
            disabled={this.state.inputFields.length == 2}
          >
            <AddCircleRounded className={classes.addButton} />
          </Button>
          <form className="formField" onSubmit={this.handleSubmit}>
            <div class="buttonCon">
              <TextField
                onChange={(e) => {
                  this.validateMagnet(e, 0);
                }}
                className="inputField"
                label="Magnet Link"
                variant="filled"
                error={this.state.validation[0]}
                helperText={
                  this.state.validation[0] ? "Invalid Magnet Link" : ""
                }
                required
              />
            </div>
            {this.state.inputFields.map((d) => d)}

            <Button
              variant="contained"
              color="secondary"
              size="large"
              className={classes.buttonSave}
              startIcon={<Save />}
              type="submit"
            >
              Save
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}
const TorrentToDriveTemp = withRouter(TorrentToDriveClass)
const TorrentToDrive = withStyles(TorrentToDriveStyle)(TorrentToDriveTemp);

export default TorrentToDrive;
