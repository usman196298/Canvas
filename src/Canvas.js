import React from 'react'
import { useState } from 'react';
import './style.css'

import cvs from './cvs.jpg'
import { fabric } from 'fabric'
import {useMount} from "./custom-hooks"
import MyPopover from './MyPopover';

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
import html2canvas from "html2canvas";
import jsPdf from "jspdf";


function Canvas() {
  
  const  [canvas, setCanvas] = useState('');
  const  [myoptions, setOptions] = useState('');
  const  [popperstate, setpopperstate] = useState(false);

  const  [drawstate, setdrawstate] = useState(false);
  React.useEffect(()=>{
    if(canvas) {
      console.log("DrawState: ", drawstate);
      const drawfunction =  function(options) {
        maintainState();  
      }
      if(drawstate) {
        canvas.isDrawingMode=true;
        canvas.on('mouse:up',drawfunction)
        console.log("Drawing Mode: On");
      }
      else {
        canvas.isDrawingMode=false;
        canvas.off('mouse:up')
        console.log("Drawing Mode: Off");
      }
    }
  },[drawstate]);


  // React.useEffect(()=>{
  //   if(canvas) {
  //     const drawfunction =  function(options) {
  //       maintainState();  
  //     }
  //     if(drawstate) {
  //     canvas.on('mouse:up',drawfunction)
  //     }
  //     else {
  //       canvas.off('mouse:up')
  //     }
  // }
  // },[drawstate]);


  const  [deletestate, setdeletestate] = useState(false);
  React.useEffect(()=>{
    if(canvas) {
      console.log("DeleteState: ", deletestate);

      const deletefunction =  function(options) {
        console.log("Delete Active on: ",canvas.getActiveObject());
        setpopperstate(popper=>false);
        canvas.remove(canvas.getActiveObject());  
      }

      if(deletestate) {
        canvas.isDrawingMode=false;
        alert("Selected items will be deleted");
        canvas.on('mouse:up',deletefunction)
      }
      else {
        canvas.isDrawingMode=false;
        console.log("Delete Activation: Off");
        canvas.off('mouse:up')
      }
    }
  },[deletestate]);

  // React.useEffect(()=>{
  //   if(canvas) {
  //     const deletefunction =  function(options) {
  //       console.log("Delete Active on: ",canvas.getActiveObject());
  //       canvas.remove(canvas.getActiveObject());  
  //     }
  //     if(deletestate) {
  //       console.log("I am if-delete useeffect")
  //       canvas.on('mouse:up',deletefunction)
  //     }
  //     else {
  //       console.log("I am else-delete useeffect")
  //       canvas.off('mouse:up')
  //     }
  // }
  // },[deletestate]);


  // const  [deletestate, setdeletestate] = useState(false);
  // React.useEffect(()=>{
  //   if(canvas) {
  //     if(deletestate) {
  //       canvas.isDrawingMode=false;
  //       alert("Selected items will be deleted");
  //       canvas.on('mouse:up', function(options) {
  //       console.log("Delete Active on: ",canvas.getActiveObject());
  //       canvas.remove(canvas.getActiveObject());
  //       });
  //     }
  //     else {
  //       canvas.isDrawingMode=false;
  //       console.log("Delete Active Off");
  //     }
  //   }
  // },[deletestate]);


  // var redo =[];
  // var undo =[];

  // const  [array, setarray] = useState([]);

  var array= [];
  // const  [array, setarray] = useState([]);
  
  var currentIndex = -1;
  var count=0;
  var json ='';

  console.log("Initial Index: ", currentIndex); 
  console.log("Array: ", array); 

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
    setdrawstate(false);
    setdeletestate(false);

    textEditable.on('mousedown', function(options) {
      console.log("Text Selected: ", options.target);

      setOptions(myoptions=>options.target);
      setpopperstate(popper=>!popper);
    });
    console.log("check");
    maintainState();
  }

  function addcircle() {
    canvas.isDrawingMode=false;
    var circle = new fabric.Circle({
      top:100,
      left:100,
      radius: 50,
      fill: '#000000',
      stroke: '#ff0000',
      strokeWidth: 2
  });
    canvas.add(circle);
    setdrawstate(false);
    setdeletestate(false);

    circle.on('mousedown', function(options) {
      setOptions(myoptions=>options.target);
      setpopperstate(popper=>!popper);
      console.log("Property Selected: ", options.target.fill);
      console.log("Circle Selected: ", options.target);
    });
    maintainState();
  }


  function addrectangle() {
    canvas.isDrawingMode=false;
    var rect = new fabric.Rect({
      left: 150,
      top: 100,
      fill: '#ff0000' ,
      stroke: '#000000',
      width: 200,
      height: 100,
      strokeWidth: 2
    });
    canvas.add(rect);
    setdrawstate(false);
    setdeletestate(false);

    rect.on('mousedown', function(options) {
      setpopperstate(popper=>!popper);
      setOptions(myoptions=>options.target);
      console.log("Rectangle Selected: ", options.target);   
      console.log("Rectangle Check: ", options.target.fill);   
    });

    // adjustColor();

    maintainState();
  }

  function addline() {
    canvas.isDrawingMode=false;
    var line = new fabric.Line([50, 10, 200, 150], {
    stroke: '#000000'
    });
    canvas.add(line);
    setdrawstate(false);
    setdeletestate(false);

    line.on('mousedown', function(options) {
      setpopperstate(popper=>!popper);
      setOptions(myoptions=>options.target);
    });

    maintainState();
  }

  function addZoomin() {
    canvas.isDrawingMode=false;
    canvas.setZoom(canvas.getZoom() * 1.1 );
    // canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() * 1.1);
    setdrawstate(false);
    setdeletestate(false);
  }

  function addZoomout() {
    canvas.isDrawingMode=false;
    canvas.setZoom(canvas.getZoom() / 1.1 );
    // canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), canvas.getZoom() / 1.1);
    setdrawstate(false);
    setdeletestate(false);
  }

  function addDelete() {
    canvas.isDrawingMode=false;
    alert("Canvas will be clear out !");
    
    canvas.remove.apply(canvas, canvas.getObjects().concat());

    setdrawstate(false);
    setdeletestate(false);

    // setCanvas(initCanvas);
    // var json = canvas.toJSON();
    // canvas.clear();
    // canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
  }

  function addSpecificDelete() {
    setdrawstate(false);

    setdeletestate(deletestate=>!deletestate);
  }


  function addDrawing() {
    setdeletestate(false);
    
    setdrawstate(drawstate=>!drawstate);
}

  function addPdf() {
    setdrawstate(false);
    setdeletestate(false);
    
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
    if (count!==0){
      while (count!==0){
        array.pop();
        count--;
      }
    }
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

  const showPopover = () => (<MyPopover property={myoptions}/>);

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

    {popperstate &&
    <>
      <div>
        {showPopover()}
      </div>
    </>
    }

    </div>
  )
}

export default Canvas