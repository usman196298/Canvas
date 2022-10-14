import React from 'react'
import { useEffect, useState, useRef } from 'react';
import './style.css'

import cvs from './cvs.jpg'
import { fabric } from 'fabric'
import {useMount} from "./custom-hooks"
import MyPopover from './MyPopover';

import { AppBar,Toolbar, IconButton, Button, Popover } from '@mui/material';
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
import html2canvas from "html2canvas";
import jsPdf from "jspdf";

import Typography from '@mui/material/Typography';

import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

// import { PanoramaPhotosphereRounded } from '@mui/icons-material';
// import Popper, { PopperPlacementType } from '@mui/material/Popper';
// import Typography from '@mui/material/Typography';
// import Popover from '@mui/material/Popover';

  

function Canvas() {
  
  const  [canvas, setCanvas] = useState('');

  // var redo =[];
  // var undo =[];

  var array= [];
  var currentIndex= -1;
  var count=0;
  var json ='';

  console.log("Initial Index: ", currentIndex);

  // useEffect(() => {
  //     setCanvas(initCanvas);
  // },[])
  

  // To stop double rendering
  useMount(()=>{
    setCanvas(initCanvas);
  })

  const initCanvas = () => new fabric.Canvas("canvas", {
      width: 800,
      height: 600,
      backgroundImage:(cvs)
    });

    
  function addtext(){
    canvas.isDrawingMode=false;
    var textEditable = new fabric.Textbox(
      'Editable Textbox', {
      width: 500,
      editable: true
    });
    canvas.add(textEditable);

    textEditable.on('mousedown', function(options) {
      console.log("Text Selected: ", options.target);
    });
    maintainState();
  }

  function addcircle() {
    canvas.isDrawingMode=false;
    var circle = new fabric.Circle({
      top:100,
      left:100,
      radius: 50,
      fill: 'black',
      stroke: 'red',
      strokeWidth: 2
  });
    canvas.add(circle);
    circle.on('mousedown', function(options) {
      // adjustColor(circle.fill, circle.stroke);
      showPopover();
      console.log("Circle Selected: ", options.target);
    });

    maintainState();
  }

  function addrectangle() {
    canvas.isDrawingMode=false;
    var rect = new fabric.Rect({
      left: 150,
      top: 100,
      fill: 'red' ,
      stroke: 'black',
      width: 200,
      height: 100
    });
    canvas.add(rect);
    // console.log("color: ",rect.fill)
    // console.log("stroke: ",rect.stroke)

    rect.on('mousedown', function(options) {
      console.log("Rectangle Selected: ", options.target);   
    });

    // adjustColor();

    maintainState();
  }

  function addline() {
    canvas.isDrawingMode=false;
    var line = new fabric.Line([50, 10, 200, 150], {
      stroke: 'green'
    });
    canvas.add(line);

    line.on('mousedown', function(options) {

      console.log("Line Selected: ", options.target);
    });

    maintainState();
  }

  function addZoomin() {
    canvas.isDrawingMode=false;
    canvas.setZoom(canvas.getZoom() * 1.1 );
    // canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() * 1.1);
  }

  function addZoomout() {
    canvas.isDrawingMode=false;
    canvas.setZoom(canvas.getZoom() / 1.1 );
    // canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() / 1.1);
  }

  function addDelete() {
    canvas.isDrawingMode=false;
    alert("Canvas will be clear out !");
    
    canvas.remove.apply(canvas, canvas.getObjects().concat());

    // setCanvas(initCanvas);
    // var json = canvas.toJSON();
    // canvas.clear();
    // canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
  }

  function addSpecificDelete() {
    canvas.isDrawingMode=false;
    alert("Selected item will be deleted");
    console.log("Delete Active on: ",canvas.getActiveObject());
    canvas.remove(canvas.getActiveObject());
  }


  function addDrawing() {
    canvas.isDrawingMode=true;

    canvas.on('mouse:up', function(options) {
      console.log("Drawing Mode: On");
      maintainState();  
    });
  }

  function addPdf() {
    alert('Exporting to print/pdf');
    const domElement = document.getElementById("canvas");
    html2canvas(domElement, {
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`${new Date().toISOString()}.pdf`);
    });
  }

  
  function maintainState()
  {
    json = canvas.toJSON();
    array.push(json.objects[(json.objects.length)-1]);
    currentIndex++;
    console.log("Array after Addition: ",array);
    console.log("Current Index: ", currentIndex);
  }

  // if(canvas)
  // {
  //   var isObjectMove = false;
  //   canvas.on('object:moving',function(event) {
  //     isObjectMove= true;
  //   });

  // canvas.on('mouse:up', function(event){
  //   if(isObjectMove) {
  //     isObjectMove = false;
  //     maintainState();
  //   }
  // });
  // }

  const showPopover = () => (<MyPopover/>);
  

  function doRedo() {
    if(count>0) {
      console.log("Initial Value of Redo: ",currentIndex);

        var printarray=[];
        printarray.push(array[currentIndex+1]);
       
       console.log("Printing: ",printarray)
       console.log("Array",array);

     fabric.util.enlivenObjects(printarray, function(objects) {
       var origRenderOnAddRemove = canvas.renderOnAddRemove;
       canvas.renderOnAddRemove = false;
   
       objects.forEach(function(o) {
       canvas.add(o);
       });
       currentIndex++;
   
      canvas.renderOnAddRemove = origRenderOnAddRemove;
      canvas.renderAll();

      count--;
      console.log("Count:",count)

    });
  }
    else {
        alert("You are not allowed to do Redo!")
      }
}



  function doUndo() {
    if(count < 3 && count<array.length) {
     canvas.remove.apply(canvas, canvas.getObjects().concat());
     
     var printarray=[];
     for(var i=0;i<currentIndex;i++)
     {
        printarray.push(array[i]);
      }
      console.log("Printing: ",printarray)
      console.log("Array",array);

     fabric.util.enlivenObjects(printarray, function(objects) {
      var origRenderOnAddRemove = canvas.renderOnAddRemove;
      canvas.renderOnAddRemove = false;

      console.log("objs",objects)
      
      objects.forEach(function(o) {
         canvas.add(o);    
      });
      currentIndex--;
   
      canvas.renderOnAddRemove = origRenderOnAddRemove;
      canvas.renderAll();
      
   });
      count++;
      console.log("Count:",count)
    }
    else {
      alert("You are not allowed to do Undo now!")
    }
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
              <UndoIcon onClick={doUndo}/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
              <RedoIcon onClick={doRedo}/>
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
              <LoyaltyIcon onClick={addSpecificDelete}/>
            </IconButton>

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 2 }}>
              <DeleteOutlinedIcon onClick={addDelete}/>
            </IconButton>

            <div id="divider">
            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1 }}></IconButton>
            </div>


            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 1, ml: 2 }}>
              <OpenInNewIcon onClick={addPdf}/>
            </IconButton>            

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 110 }}>
              <PrintIcon onClick={addPdf}/>
            </IconButton>   

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 0.5 }}>
              <Button variant="contained" color="success"> Save </Button>
            </IconButton>   

            <IconButton size="small" edge="start" color="inherit" sx={{ mr: 0}}>
              <Button variant="contained"> Packages </Button>
            </IconButton>
          

        </Toolbar>
      </AppBar>
      
      <canvas id={"canvas"} />

      <div id="mypopover">
        {showPopover()}
      </div>

    </div>
  )
}

export default Canvas