import React, { useState } from 'react'
import cvs from './cvs.jpg'
import { fabric } from 'fabric'
import { useMount } from "./custom-hooks"
import MyPopover from './MyPopover';
import PackagePopover from './PackagePopover';
import { AppBar,Toolbar, IconButton, Button, Grid } from '@mui/material';
import icons from "./components/icons"
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import './style.css'


function Canvas() {
  
  const  [canvas, setCanvas] = useState('');
  const  [myoptions, setOptions] = useState('');
  const  [popperstate, setPopperstate] = useState(false);


  const  [drawstate, setDrawstate] = useState(false);
  React.useEffect(()=>{
    if(canvas) {
      console.log("DrawState: ", drawstate);
      const drawFunction =  function(options) {
        maintainState();  
      }
      
      const selectDraw = function(options) {
      canvas.on('mouse:down', function(options) {
        if(options.type='path') {
          console.log("Draw: ", options.target);
          // setOptions(myoptions=>options.target);
          // setPopperstate(popper=>true);
        }
      });
      }
      
      if(drawstate) {
        canvas.isDrawingMode=true;
        canvas.on('mouse:up',drawFunction)
        canvas.on('mouse:down',selectDraw)
        console.log("Drawing Mode: On");
      }
      else {
        canvas.isDrawingMode=false;
        canvas.off('mouse:up')
        console.log("Drawing Mode: Off");
      }
    }
  },[drawstate]);

// Popper Off on canvas click 
  React.useEffect(()=>{
    if(canvas) { 
    canvas.on('mouse:down', function(options) {
      setPopperstate(popper=>false);
    });
    }
  },[canvas]);


  const  [deletestate, setDeletestate] = useState(false);
  React.useEffect(()=>{
    if(canvas) {
      console.log("DeleteState: ", deletestate);

      const deleteFunction =  function(options) {
        console.log("Delete Active on: ",canvas.getActiveObject());
        setPopperstate(popper=>false);
        canvas.remove(canvas.getActiveObject());  
      }

      if(deletestate) {
        canvas.isDrawingMode=false;
        alert("Selected items will be deleted");
        canvas.on('mouse:up',deleteFunction)
      }
      else {
        canvas.isDrawingMode=false;
        console.log("Delete Activation: Off");
        canvas.off('mouse:up')
      }
    }
  },[deletestate]);


  var array= [];
  // const  [array, setarray] = useState([]);
  
  var currentIndex = -1;
  var count=0;
  var json ='';

  console.log("Initial Index: ", currentIndex); 
  console.log("Array: ", array); 


  // To stop double rendering
  useMount(()=>{
    setCanvas(initCanvas);
  })

  const initCanvas = () => new fabric.Canvas("canvas", {
      width: 800,
      height: 600,
      backgroundImage:(cvs)
    });

    
  function addText(){
    canvas.isDrawingMode=false;
    var textEditable = new fabric.Textbox(
      'Editable Textbox', {
      width: 300,
      fill: "000000",
      opacity: "1",
      stroke: "#000000",
      editable: true
    });
    canvas.add(textEditable);
    setDrawstate(false);
    setDeletestate(false);

    textEditable.on('mousedown', function(options) {
      console.log("Text Selected: ", options.target);

      setOptions(myoptions=>options.target);
      setPopperstate(popper=>true);
    });
    console.log("check");
    maintainState();
  }

  function addCircle() {
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
    setDrawstate(false);
    setDeletestate(false);

    circle.on('mousedown', function(options) {
      setOptions(myoptions=>options.target);
      setPopperstate(popper=>true);
      console.log("Property Selected: ", options.target.fill);
      console.log("Circle Selected: ", options.target);
    });
    maintainState();
  }


  function addRectangle() {
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
    setDrawstate(false);
    setDeletestate(false);

    rect.on('mousedown', function(options) {
      setPopperstate(popper=>true);
      setOptions(myoptions=>options.target);
      console.log("Rectangle Selected: ", options.target);   
      console.log("Rectangle Check: ", options.target.fill);   
    });

    maintainState();
  }

  function addLine() {
    canvas.isDrawingMode=false;
    var line = new fabric.Line([50, 10, 200, 150], {
    stroke: '#000000'
    });
    canvas.add(line);
    setDrawstate(false);
    setDeletestate(false);

    line.on('mousedown', function(options) {
      setPopperstate(popper=>true);
      setOptions(myoptions=>options.target);
    });

    maintainState();
  }

  function addZoom(params){
    if(params == 1) {
      canvas.isDrawingMode=false;
      if (canvas.getZoom().toFixed(5) > 2) {
        alert("Zoom in: Limit Reached")
        return;
      }
      canvas.setZoom(canvas.getZoom() * 1.1 );
      setDrawstate(false);
      setDeletestate(false);
    }
    else{
      canvas.isDrawingMode=false;
      if (canvas.getZoom().toFixed(5) <= 0.5) {
        alert("Zoom out: limit reached")
        return;
      }
      canvas.setZoom(canvas.getZoom() / 1.1 );
      setDrawstate(false);
      setDeletestate(false);
    }
  }

  function addDelete() {
    canvas.isDrawingMode=false;
    alert("Canvas will be clear out !");
    
    canvas.remove.apply(canvas, canvas.getObjects().concat());

    setDrawstate(false);
    setDeletestate(false);
  }

  function addSpecificDelete() {
    setDrawstate(false);
    setDeletestate(deletestate=>!deletestate);
  }


  function addDrawing() {
    setDeletestate(false);
    setDrawstate(drawstate=>!drawstate);
}


  function addPdf() {
    setDrawstate(false);
    setDeletestate(false);

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


  const  [Packagepopper, setPackagepopper] = useState(false);
  function addPackage() {
    setPackagepopper(Packagepopper=>!Packagepopper);
  }

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
      <Grid id="navbar">
        
        <Grid id="navbar-items">
          <icons.ZoomInIcon onClick={event=>addZoom(1)} className="icon-buttons"/>
          <icons.ZoomOutIcon onClick={event=>addZoom(0)} className="icon-buttons"/>
          <div id="divider"/>
          <icons.UndoIcon onClick={doUndo} className="icon-buttons"/>
          <icons.RedoIcon onClick={doRedo} className="icon-buttons"/>
          <div id="divider"/>
          <icons.AbcIcon onClick={addText} className="icon-buttons"/>
          <icons.HorizontalRuleIcon onClick={addLine} className="icon-buttons"/>
          <icons.CircleOutlinedIcon onClick={addCircle} className="icon-buttons"/>
          <icons.RectangleOutlinedIcon onClick={addRectangle} className="icon-buttons"/>
          <div id="divider"/>
          <icons.CreateIcon onClick={addDrawing} className="icon-buttons"/>
          <icons.LoyaltyIcon onClick={addSpecificDelete} className="icon-buttons"/>
          <icons.DeleteOutlinedIcon onClick={addDelete} className="icon-buttons"/>
          <div id="divider"/>
          <icons.OpenInNewIcon onClick={addPdf} className="icon-buttons"/>
          <icons.PrintIcon onClick={addPdf}/>
        </Grid>

        <Grid style={{display: "flex"}}>
          <Button variant="contained" color="success"> Save </Button>
          <Button id="button-packages" variant="contained" onClick={addPackage}> Packages </Button>
        </Grid>

      </Grid>
    
       <Grid style={{display:"flex"}}>
        <Grid style={{width:'100%', overflow:"auto"}} >
          <canvas id={"canvas"} />
        </Grid>

        {Packagepopper &&
          <Grid style={{marginRight:"10px", marginTop:"20px"}}> 
            {/* <PackagePopover property={setPackagepopper}/> */}
            <PackagePopover property={canvas}/>
          </Grid>
        }
      </Grid>

      {popperstate &&
      <>
        <div>
          <MyPopover property={myoptions}/>
        </div>
      </>
      } 

  </div>
  )
}

export default Canvas