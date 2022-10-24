import * as React from 'react';
import { Card ,ListGroup } from 'react-bootstrap';
import "react-color-palette/lib/css/styles.css";
import Slider from '@mui/material/Slider';

function Popper(props) {

  console.log("Show : ", props.property.type);

 var colorch=props.property.fill;
 var fill=colorch.substring(0,7);
 var opacityyy=colorch.substring(7,9);
 var k=parseInt(opacityyy,16);
 if (!k){
  k=254;
 }
  const [color, setColor] = React.useState(fill);
  const [stroke, setStroke] = React.useState(props.property.stroke);
  const [opacity, setOpacity] = React.useState(k);

  const convertHexToRGBA = (hexCode, opacity = 1) => {
    let hex = hexCode.replace('#', '');
    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    /* Backward compatibility for whole number based opacity values. */
    if (opacity >= 1 && opacity <= 255) {
      opacity = opacity / 255;
      // console.log("opacityyy",opacity);
    }
    return `rgba(${r},${g},${b},${opacity})`;
  };

  function trim(str) {
    return str.replace(/^\s+|\s+$/gm, '');
  }

  function rgbaToHex(rgba) {
    var inParts = rgba.substring(rgba.indexOf("(")).split(","),
      r = parseInt(trim(inParts[0].substring(1)), 10),
      g = parseInt(trim(inParts[1]), 10),
      b = parseInt(trim(inParts[2]), 10),
     a = parseFloat(trim(inParts[3].substring(0, inParts[3].length - 1))).toFixed(1);
     var n=a*100;
     var outParts = [
      r.toString(16),
      g.toString(16),
      b.toString(16),
      Math.round(a * 255).toString(16).substring(0, 2)
    ];
    // Pad single-digit output values
    outParts.forEach(function (part, i) {
      if (part.length === 1) {
        outParts[i] = '0' + part;
      }
    })
    return ('#' + outParts.join(''));
  }

  function setMethod(colorobj, opacityobj) {
    var tostring = colorobj.toString();
    var newcol = convertHexToRGBA(tostring, opacityobj)
    var ans= rgbaToHex(newcol)
    props.property.set({ "fill": (ans) });
  }
  React.useEffect(()=>{
    setMethod(color, (opacity));
    props.property.canvas.renderAll();
  },[color])
  function handleChangeColor(event) {
    setColor(event.target.value);
  }

  function handleChangeStroke(event) {
    setStroke(event.target.value);
    props.property.set({ "stroke": stroke });
    props.property.canvas.renderAll();
  }

  function handleChangeOpacity(event) {
    // console.log("props",props.property.fill);
    setColor(color);
    var a=((event.target.value));
    setOpacity(a);
    setMethod(color, (opacity/255));
    props.property.canvas.renderAll();
  }


  return (
    <Card className='pops' >
      <div>
        <div style={{
          backgroundColor: 'white', width: '14rem', top: props.property.top + "px",
          left: props.property.left + props.property.width + 70 + 'px', position: "absolute"}}
          variant="flush"> <br></br>

          { props.property.type!="line" &&
          <>
          <label>Color:</label> <br></br>
          <div><input style={{ width: 200 }} type="color"
            onChange={handleChangeColor}
            id="favcolor" name="favcolor" value={color} ></input></div> <br></br>
            Opacity:<br></br>
          <Slider sx={{ maxWidth: 200 }}
            aria-label="Opacity"
            // defaultValue={opacity}
            value={opacity}
            max={255}
            min={11}
            onChange={handleChangeOpacity}
            color="primary"
          />
          <br></br>
          </>
          }


          <label>Stroke:</label>
          <div> <input style={{ width: 200 }} type="color"
            onChange={handleChangeStroke}
            id="favcolor" name="favcolor" value={stroke} ></input></div>
            <br></br>
        </div>
        
      </div>
      <br></br>
    </Card>
  );
}
export default Popper;