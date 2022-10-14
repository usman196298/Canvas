import { Button, Popover } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { fabric } from 'fabric'



import './style.css'


function MyPopover() {
    return (
      <div>
        <Card sx={{ minWidth: 220 }}>

          <CardContent>
            {/* <Typography sx={{ fontSize: 18 }} component="div"> */}
            <form>
              <label for="favcolor">Color:</label>
              <br></br>
              <input type="color" id="favcolor" name="favcolor" value="#ff0000"></input>
            </form>
            {/* </Typography> */}
            <br></br>

            <Typography sx={{ fontSize: 18 }} component="div">
              Transparency:
            </Typography>
            <br></br>
            <Typography sx={{ fontSize: 18 }} component="div">
              <label for="stroke">Stroke:</label>
              <br></br>
              <input type="color" id="stroke" name="favcolor" value="#ff0000"></input>
            </Typography>
            <br></br>

          </CardContent>
        </Card>
      </div>
    )
}

export default MyPopover
