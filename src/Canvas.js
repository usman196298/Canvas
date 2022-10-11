import React from 'react'
import { useEffect, useState } from 'react';
import cvs from './cvs.jpg'
import { fabric } from 'fabric'
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


function Canvas() {
  
  const  [canvas, setCanvas] = useState(null);
  
  useEffect(() => {
    setCanvas(initCanvas());
  },[])

  useEffect(()=>{
    if(canvas){
      fabric.Object.prototype.selectable = true
      fabric.util.requestAnimFrame(function render() {
        //canvas.renderAll();
        fabric.util.requestAnimFrame(render);
      });
      canvas.requestRenderAll()
    }
  },[canvas])
  

  const initCanvas = () => { 
    const canvas1 = new fabric.Canvas("canvas", {
    width: 800,
    height: 600,
    backgroundImage:(cvs),
    selection: true,
  })
  // fabric.Object.prototype.selectable = true
  return canvas1
};
    
// fabric.Canvas(canvasElement, {
//   selection: true
// });

  function addtext(){
    var textEditable = new fabric.Textbox(
      'Editable Textbox', {
      width: 500,
      editable: true
    });
    canvas.add(textEditable);
  }

  function addcircle() {
    var circle = new fabric.Circle({
      top:100,
      left:100,
      radius: 50,
      fill: 'black',
      stroke: 'red',
      strokeWidth: 2
  });
    canvas.add(circle);
  }

  function addrectangle() {
  var rect = new fabric.Rect({
    left: 150,
    top: 100,
    fill: 'red' ,
    stroke: 'black',
    width: 200,
    height: 100
  });
    canvas.add(rect);
  }

  function addline() {
  var line = new fabric.Line([50, 10, 200, 150], {
    stroke: 'green'
  });
  canvas.add(line);
  }

  function addZoomin() {
    canvas.setZoom(canvas.getZoom() * 1.1 );
    // canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() * 1.1);
  }

  function addZoomout() {
    canvas.setZoom(canvas.getZoom() / 1.1 );
    // canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() / 1.1);
  }

  function addDelete() {
    alert("Canvas will be clear out !");
    setCanvas(canvas=> initCanvas());
  }

  function addDrawing() {
    canvas.isDrawingMode(true);
  }

  return (
    <div>
      <AppBar position="static" id="navbar">
        <Toolbar>
            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <ZoomInIcon onClick={addZoomin}/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <ZoomOutIcon onClick={addZoomout}/>
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
              <AbcIcon onClick={addtext}/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <HorizontalRuleIcon onClick={addline}/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <CircleOutlinedIcon onClick={addcircle}/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
              <RectangleOutlinedIcon onClick={addrectangle}/>
            </IconButton>

            <div id="divider">
            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}></IconButton>
            </div>


            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1, ml: 2 }}>
              <CreateIcon onClick={addDrawing}/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}>
              <LoyaltyIcon/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
              <DeleteOutlinedIcon onClick={addDelete}/>
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
      </AppBar>
   
      <canvas id="canvas" />

    </div>
  )
}

export default Canvas