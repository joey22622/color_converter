import React  from 'react';
import './App.scss';

class App extends React.Component {
  state={
    colors : {
      hex : {
        color : '123456',
      },
        rgba : {
          color : {
            r : `0`,
            g : `0`,
            b : `0`,
            a : 1
        }
      }
    }
  }
  input = React.createRef();
  errorMessage = () => {

  }
  
  setToValue = (obj, value, path) => {
      var i;
      path = path.split('.');
      for (i = 0; i < path.length - 1; i++)
          obj = obj[path[i]];

      obj[path[i]] = value;
  }
  copy(classStr) {
    // var copyText = document.querySelector(classStr);
    // console.log(copyText)
    // copyText.innerHTML.select();
  var aux = document.createElement("input");

  aux.setAttribute("value", document.querySelector(classStr).innerHTML);
  document.body.appendChild(aux);

  // Highlight the content
  aux.select();

  // Execute the copy command
  document.execCommand("copy");

  // Remove the input from the body
  document.body.removeChild(aux);

    // copyText.setSelectionRange(0, 99999)
    // document.execCommand("copy");
    // alert("Copied the text: " + copyText.value);
  }
  syncColors = changed => {
    const colors = this.state.colors;
    let r = colors.rgba.color.r;
    let g = colors.rgba.color.g;
    let b = colors.rgba.color.b;
    if(changed === "hex"){
      let rgb = [];
      let hex = colors.hex.color.split('');
      hex.forEach((char, i) => {
        let code = char.charCodeAt(0);
        char = code >= 65 ? code - 55 : char;
        if(i%2 < 1){
          rgb.push(char*16+ parseFloat((hex[i+1].charCodeAt(0) >= 65 ? hex[i+1].charCodeAt(0) - 55 : hex[i+1]))); 
        }        
      });
      colors.rgba.color.r=rgb[0];
      colors.rgba.color.g=rgb[1];
      colors.rgba.color.b=rgb[2];      
    } else {
      let rgb = [];
      let hex = [];
      rgb.push(r,g,b);
      rgb.forEach(char => {
        const char1 = String(Math.floor(char/16) > 9 ? String.fromCharCode(Math.floor(char/16)+55) : Math.floor(char/16));
        const char2 = String(char%16 > 9 ? String.fromCharCode((char%16)+55) : char%16);
        hex.push(char1 + char2);
      });
      colors.hex.color = hex.join('');
    }
    this.setState({colors});
  }
  handleColorInput = e =>{
      const colors= this.state.colors;
      let i = e.target.selectionStart;
      let input = e.currentTarget.value;
      const name = e.currentTarget.name;
      var path;
      var regex;
      var max;
      var value = 0;
      if(name === "hex"){
        regex = RegExp('^[0-9a-f]+$', "i");
        path = "hex.color";
        max = 7;
      } else {
        regex = RegExp('^[0-9]+$', "i");
        path = `rgba.color.${name}`;
        max = 4;
      }
      if(regex.test(input)){
      //   console.log(input.length)
      //   console.log(max)
      //   console.log(i)
        if(i < input.length && input.length === max){
            value = (input.substr(0,i) + input.substr(i+1)).toUpperCase();
            // console.log("if 1");
          } else if(input.length === max) {
            value = input.substr(1).toUpperCase()
            // console.log("if 2");
          } else if(max === 4 && i >= 0){
            // console.log("if 3");
            value = (input.substr(0,i) + input.substr(i+1)).toUpperCase();
          } else {
            value = (input.substr(0,i) + "0" + input.substr(i)).toUpperCase();
            // console.log("else");
          }
          if(max===4){
            if(parseFloat(value) <= 256){
              var zeroes;
              for(var j = 0; j < value.length; j++){
                if(parseFloat(value[j]) === 0){
                  zeroes = j+1;
                } else {
                  break;
                }
              }
              if(zeroes && zeroes < 3){
                value = value.substring(zeroes);
              }
            } else {
              // console.log(value);
              value = "255";
            }
          }
        } else {
          i = i-1;
          // console.log(`else else`);
          // console.log(input.length)
          if(max === 4 && input.length <= 1){
            // console.log(`else if`);
            value = "0";
          }
        }
        // console.log(colors.rgba.color)
        // console.log(value)
        if(value){
          this.setToValue(colors,value,path);
        }
        this.setState({colors}, () =>{
        this.refs[name].selectionStart = i;
        this.refs[name].selectionEnd = i;
        this.syncColors(name)
      })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        </header>
          <div className="content-wrap">
            <div className="inputs-wrap">
              <div className="hex-wrap" >
                <h2>Hex Value</h2>
                <div className="hex-content-wrap">
                  <p className="hex-input">
                    <label>Alpha-Numeric Value</label>
                    <input type="text" name="hex" ref="hex" className="hex-input-field" value={this.state.colors.hex.color} onChange={(event)=>{this.handleColorInput(event)}}/>
                  </p>
                  <p className="opacity-input">
                    <label>Opacity</label>
                    <input type="text" name="opacity" ref="opacity" className="opacity-input-field"/>
                  </p>
                </div>
              </div>
              <div className="rgba-wrap">
                <h2 className="rgba-head">RGB(A)</h2>
                <div className="rgba-content-wrap">

                <p className="red-input">
                  <label>(R)ed</label>
                  <input placeholder="red" name="r" ref="r" onChange={(event)=>{this.handleColorInput(event)}} value={this.state.colors.rgba.color.r}/>
                  </p>
                  <p className="green-input">
                  <label>(G)reen</label>
                  <input placeholder="green" name="g" ref="g" onChange={(event)=>{this.handleColorInput(event)}} value={this.state.colors.rgba.color.g}/>
                  </p>
                  <p className="blue-input">
                  <label>(B)lue</label>
                  <input placeholder="blue" name="b" ref="b" onChange={(event)=>{this.handleColorInput(event)}} value={this.state.colors.rgba.color.b}/>
                  </p>
                  <p className="alpha-input">
                  <label>(A)lpha</label>
                  <input placeholder="alpha" name="a" ref="a" readOnly="true" value={this.state.colors.rgba.color.a}/>
                  </p>
                </div>
              </div>
            </div>
            <div className="results-column">
              <div className="color-banner" style={{backgroundColor : '#'+this.state.colors.hex.color}}></div>
              <div className="numeric-results-wrap">
                <div className="hex-results">
                  <button className="copy-button copy-rgba" onClick={()=>{this.copy(".hex-code")}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 674.01 672.6"><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M543,38.88V0L149.4,0A149.56,149.56,0,0,0,0,149.43V543H38.88V149.43A110.67,110.67,0,0,1,149.43,38.88Z"/><path d="M585.42,98.67H188.73a88.69,88.69,0,0,0-88.65,88.65V584a88.68,88.68,0,0,0,88.65,88.59H585.42A88.69,88.69,0,0,0,674,584V187.32A88.68,88.68,0,0,0,585.42,98.67Zm0,535.05H188.73A49.79,49.79,0,0,1,139,584V187.32a49.79,49.79,0,0,1,49.73-49.8H585.42a49.79,49.79,0,0,1,49.71,49.8V584A49.79,49.79,0,0,1,585.42,633.72Z"/></g></g></svg>
                    {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><title>Artboard 1</title><path d="M304.69,144.94A103.86,103.86,0,0,0,200.94,248.69V522h27V248.69a76.86,76.86,0,0,1,76.77-76.77H578v-27Z"/><path d="M607.48,213.44H332A61.59,61.59,0,0,0,270.44,275V550.48A61.58,61.58,0,0,0,332,612H607.48A61.58,61.58,0,0,0,669,550.48V275A61.58,61.58,0,0,0,607.48,213.44Zm34.53,337A34.57,34.57,0,0,1,607.48,585H332a34.57,34.57,0,0,1-34.53-34.53V275A34.57,34.57,0,0,1,332,240.42H607.48A34.57,34.57,0,0,1,642,275Z"/></svg> */}
                  </button>
                  <code className="hex-code"> {'#' +this.state.colors.hex.color}</code>
                </div>
                <div className="rgba-results">
                  <button onClick={()=>{this.copy(".rgba-code")}} className="copy-button copy-rgba">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 674.01 672.6"><title>Asset 2</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M543,38.88V0L149.4,0A149.56,149.56,0,0,0,0,149.43V543H38.88V149.43A110.67,110.67,0,0,1,149.43,38.88Z"/><path d="M585.42,98.67H188.73a88.69,88.69,0,0,0-88.65,88.65V584a88.68,88.68,0,0,0,88.65,88.59H585.42A88.69,88.69,0,0,0,674,584V187.32A88.68,88.68,0,0,0,585.42,98.67Zm0,535.05H188.73A49.79,49.79,0,0,1,139,584V187.32a49.79,49.79,0,0,1,49.73-49.8H585.42a49.79,49.79,0,0,1,49.71,49.8V584A49.79,49.79,0,0,1,585.42,633.72Z"/></g></g></svg>
                    {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><title>Artboard 1</title><path d="M304.69,144.94A103.86,103.86,0,0,0,200.94,248.69V522h27V248.69a76.86,76.86,0,0,1,76.77-76.77H578v-27Z"/><path d="M607.48,213.44H332A61.59,61.59,0,0,0,270.44,275V550.48A61.58,61.58,0,0,0,332,612H607.48A61.58,61.58,0,0,0,669,550.48V275A61.58,61.58,0,0,0,607.48,213.44Zm34.53,337A34.57,34.57,0,0,1,607.48,585H332a34.57,34.57,0,0,1-34.53-34.53V275A34.57,34.57,0,0,1,332,240.42H607.48A34.57,34.57,0,0,1,642,275Z"/></svg> */}
                  </button>
                  <code className="rgba-code">{`rgba(${this.state.colors.rgba.color.r},${this.state.colors.rgba.color.g},${this.state.colors.rgba.color.b},${this.state.colors.rgba.color.a})`}</code>
                </div>
              </div>
            </div>
            </div>
      </div>
    )
  }
}

export default App;
