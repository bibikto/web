import {
  withStyles,
  Paper,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ImportExport } from "@material-ui/icons/";

const axios = require("axios");

const ProgressPageStyle = {
  root: {
    padding: "5vh 20px 20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  con: {
    width: "40vw",
    padding: "20px 30px",
    marginBottom: "5vh",
  },
  flexSpcBt: {
    display: "flex",
    justifyContent: "space-between",
  },
  torName: {
    maxWidth: "27vw",
    overflowX: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "no-wrap",
  },
  progressBar: {
    flex: 0.95,
  },
  progressBarBox: {
    width: "100%",
    alignItems: "center !important",
    margin: "10px 0",
  },
  flexAlCt: {
    alignItems: "center !important",
  },
  flexStart: {
    alignItems: "flex-start !important",
  },
  flexEnd: {
    alignItems: "flex-end !important",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  "@media screen and (max-width: 600px)": {
    con: {
      padding: "10px 15px",
      width: "100%",
      marginTop: "0vh",
    },
    torName: {
      maxWidth: "50vw",
    },
  },
};

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

class ProgressPageClass extends Component {
  constructor(props) {
    super(props);
    let tempob = {};
    for (let i = 0; i < props.location.state.data.length; i++) {
      tempob["url" + i] = props.location.state.data[i];
    }
    this.state = {
      idsob: tempob,
      data: [
        {
          name: "",
          dRate: "",
          uRate: "",
          eta: "",
          status: "",
          progress: "",
          intervalId: "",
        },
        {
          name: "",
          dRate: "",
          uRate: "",
          eta: "",
          status: "",
          progress: "",
          intervalId: "",
        },
        {
          name: "",
          dRate: "",
          uRate: "",
          eta: "",
          status: "",
          progress: "",
          intervalId: "",
        },
      ],
    };
    this.getInfo = this.getInfo.bind(this);
  }

  getInfo() {
    let self = this;
    axios
      .post("/api/torrent/info", this.state.idsob)
      .then(function (response) {
        self.setState({
          data: response.data,
        });
      });
  }

  componentDidMount() {
    var intervalId = setInterval(this.getInfo, 3000);
    this.setState({ intervalId: intervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  readableBytes(bytes) {
    if (bytes == 0) return 0;
    else {
      var i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = [
          "KBPS",
          "MBPS",
          "GBPS",
          "TBPS",
          "PBPS",
          "EBPS",
          "ZBPS",
          "YBPS",
        ];

      return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + " " + sizes[i];
    }
  }

  render() {
    let datax = this.props.location.state.data;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {datax.map((d) => {
          return (
            <Paper className={classes.con}>
              <div className={classes.dataBox}>
                <div
                  className={[classes.flexSpcBt, classes.flexEnd].join("   ")}
                >
                  <Typography className={classes.torName} variant="body2">
                    {this.state.data[datax.indexOf(d)].name}
                  </Typography>
                  <Typography variant="body2">
                    Remaining:{" "}
                    {this.state.data[datax.indexOf(d)].eta < 0
                      ? "Unknown"
                      : this.state.data[datax.indexOf(d)].eta
                          .toString()
                          .toHHMMSS()}
                  </Typography>
                </div>

                <div
                  className={[classes.progressBarBox, classes.flexSpcBt].join(
                    "  "
                  )}
                >
                  <LinearProgress
                    variant="determinate"
                    value={this.state.data[datax.indexOf(d)].progress}
                    className={classes.progressBar}
                  />
                  <Typography className={classes.torName} variant="body2">
                    {Math.round(this.state.data[datax.indexOf(d)].progress)}%
                  </Typography>
                </div>

                <div
                  className={[classes.flexSpcBt, classes.flexStart].join("   ")}
                >
                  <Typography variant="body2">
                    {this.state.data[datax.indexOf(d)].status}
                  </Typography>
                  <span
                    className={[classes.flexSpcBt, classes.flexAlCt].join(
                      "   "
                    )}
                  >
                    <ImportExport />
                    <span className={classes.flexColumn}>
                      <Typography variant="caption">
                        {this.readableBytes(
                          this.state.data[datax.indexOf(d)].uRate
                        )}
                      </Typography>
                      <Typography variant="caption">
                        {this.readableBytes(
                          this.state.data[datax.indexOf(d)].dRate
                        )}
                      </Typography>
                    </span>
                  </span>
                </div>
              </div>
            </Paper>
          );
        })}
      </div>
    );
  }
}

const ProgressPageTemp = withRouter(ProgressPageClass);

const ProgressPage = withStyles(ProgressPageStyle)(ProgressPageTemp);

export default ProgressPage;
