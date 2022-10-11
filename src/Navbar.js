import React from 'react'
import { AppBar,Toolbar, IconButton, Button } from '@mui/material';

import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AbcIcon from '@mui/icons-material/Abc';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CreateIcon from '@mui/icons-material/Create';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PrintIcon from '@mui/icons-material/Print';

import './style.css'

function Navbar() {
  return (
    <div>
      {/* <AppBar position="static" id="navbar">
        <Toolbar>
            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <ZoomInIcon/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <ZoomOutIcon/>
            </IconButton>

            <div id="divider">
            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}></IconButton>
            </div>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1, ml: 2  }}>
              <UndoIcon/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
              <RedoIcon/>
            </IconButton>

            <div id="divider">
            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}></IconButton>
            </div>


            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1, ml: 2 }}>
              <AbcIcon onClick={abc}/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <HorizontalRuleIcon/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <CircleOutlinedIcon/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
              <RectangleOutlinedIcon/>
            </IconButton>

            <div id="divider">
            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}></IconButton>
            </div>


            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1, ml: 2 }}>
              <CreateIcon/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <LoyaltyIcon/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
              <DeleteOutlinedIcon/>
            </IconButton>

            <div id="divider">
            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}></IconButton>
            </div>


            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1, ml: 2 }}>
              <OpenInNewIcon/>
            </IconButton>            

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 110 }}>
              <PrintIcon/>
            </IconButton>       


            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 0.5 }}>
              <Button variant="contained" color="success"> Save </Button>
            </IconButton>   

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 0}}>
              <Button variant="contained"> Packages </Button>
            </IconButton>

        </Toolbar>
      </AppBar> */}
    </div>
  )
}

export default Navbar