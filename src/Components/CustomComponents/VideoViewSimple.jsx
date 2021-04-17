import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { Hidden } from "@material-ui/core";

const VideoViewSimple = (props) => {
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
            src="https://www.youtube.com/embed/pRpeEdMmmQ0?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Dialog>
      </React.Fragment>
      <Grid container style={{ paddingBottom: "15px", position: "relative" }}>
        <Grid
          item
          xs={12}
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
          <div className="frameContainer" onClick={() => handelClick()}>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/pRpeEdMmmQ0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="iframeStyle"
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

export default VideoViewSimple;
