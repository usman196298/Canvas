import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent,Typography } from '@mui/material';
import icons from "./components/icons"
import './style.css'

function PackagePopover(props) {


  console.log("props: ",props.property);

  // let dragged = null;

  // useEffect(()=>{
  //   const source = document.getElementsByClassName("draggable");
  //   debugger
  //   source.addEventListener("dragStart", (event) => {
  //     console.log("I am dragged");
  //     // dragged = event.target;
  //   });
  // },[])

  // const target = document.getElementById(props.canvas);
  // target.addEventListener("dragover", (event) => {
  //   event.preventDefault();
  // });

  // target.addEventListener("drop", (event) => {
  //   // prevent default action (open as link for some elements)
  //   event.preventDefault();
  //   // move dragged element to the selected drop target
  //   if (event.target.className === "dropzone") {
  //     dragged.parentNode.removeChild(dragged);
  //     event.target.appendChild(dragged);
  //   }
  // });


  function dragFunction() {
    ondragover = dropFunction();
  }

  function dropFunction() {
    console.log("I am in second");
    props.property.add(document.getElementsByClassName("images"));
    // document.addEventListener("dragleave", function(event) {
    //   if ( event.target == props.property ) {
    //     console.log("I am at dropped")
    //   }
    // });
  }

  return (
      <div id="packagePopover">
        <Card id="package-card" sx={{ minWidth: 220 }}>
          <CardContent>

              <Grid container>
                <Grid item xs={10}>
                  <Typography  sx={{ fontSize: 24 }} component="div">
                    <label for="favcolor">Packages</label>
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography  sx={{ fontSize: 24 }} component="div">
                    <icons.CloseIcon/>
                  </Typography>
                </Grid>
              </Grid>

            <Grid container>
              <Grid item xs={9}>
                <div>
                  <img className="images" draggable="true" onDrag={dragFunction} src="https://cdn.iconscout.com/icon/premium/png-256-thumb/online-class-time-2147395-1805456.png" alt="1"/>
                </div>                
              </Grid>
              <Grid item xs={3}>
                <div>
                  <h6>First</h6>
                </div>                
              </Grid>
            
              <Grid item xs={9}>
                <div>
                  <img className="images" draggable="true" onDrag={dragFunction} src="https://cdn-icons-png.flaticon.com/512/3352/3352938.png" alt="2"/>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <h6>Second</h6>
                </div>                
              </Grid>
              
              <Grid item xs={9}>
                <div>
                  <img className="images" draggable="true" onDrag={dragFunction} src="https://cdn4.iconfinder.com/data/icons/online-learning-97/64/online_class-512.png" alt="3"/>
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <h6>Third</h6>
                </div>                
              </Grid>

            </Grid>
            
          </CardContent>
        </Card>
    </div>
  )
}

export default PackagePopover
