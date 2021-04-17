import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";

import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";

const VideoViewInfo = (props) => {
  const [open, setOpen] = useState(false);

  let handelClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Hidden only={["md", "lg", "xl"]}>
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
        >
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/_g7Oz51XmrM?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Dialog>
      </React.Fragment>
      <Grid container style={{ paddingBottom: "20px", position: "relative" }}>
        <Grid
          item
          xs={12}
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <Card>
            <div className="frameContainer" onClick={() => handelClick()}>
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/_g7Oz51XmrM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div
                style={{
                  background: "transperent",
                  zIndex: "5",
                  position: "absolute",
                  top: "0",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              ></div>
            </div>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{ paddingLeft: "5px", paddingRight: "5px" }}
              >
                <h5>
                  Open Mic Cafe with Aftab Iqbal | Episode 135 | 14 April 2021 |
                  GWAI
                </h5>
              </Grid>
            </Grid>
            <Grid
              container
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
                paddingBottom: "10px",
              }}
            >
              <Grid item xs={3}>
                <h6>Channel </h6>
                <h6>Gawai</h6>
              </Grid>
              <Grid item xs={3}>
                <h6>Start Date</h6>
                <h6>28-06-2021</h6>
              </Grid>
              <Grid item xs={2}>
                <h6>Days Old</h6>
                <h6>28</h6>
              </Grid>
              <Grid item xs={4}>
                <h6>Views over 24 Hours</h6>
                <h6>10000055</h6>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Tooltip
          title="Add"
          aria-label="add"
          style={{
            position: "absolute",
            top: "5px",
            right: "15px",
            width: "40px",
            height: "40px",
          }}
        >
          <Fab color="primary">
            <h3>#{props.top}</h3>
          </Fab>
        </Tooltip>
      </Grid>
    </Hidden>
  );
};

export default VideoViewInfo;
