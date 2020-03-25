import React  from 'react';
import './App.scss';
import {Helmet} from "react-helmet";


class App extends React.Component {
  state={
    colors : {
      hex : {
        color : '000000',
      },
        rgba : {
          color : {
            r : `0`,
            g : `0`,
            b : `0`,
            a : 1
        }
      }
    },
    swatches : [],
    swatchButtons : {
      style : {}
    }
  }
  input = React.createRef();
  errorMessage = () => {
  }
  toggleLock(e){
    // console.log(e.target.getAttribute("data-locked"))
    if(e.target.getAttribute("data-locked") === "true"){
      e.target.setAttribute("data-locked", "false");
      document.querySelector(".clear-swatches").setAttribute("data-locked", "false")
    } else {
      e.target.setAttribute("data-locked", "true");
      document.querySelector(".clear-swatches").setAttribute("data-locked", "true")

      // console.log(e.target)
    }
  }
  componentDidMount = () => {
    let state = this.state;
    if (localStorage.getItem("swatches") === null) {
      state.swatches = [];
    } else {
      state.swatches = JSON.parse(localStorage.swatches);
    }
    this.setState({state})
  }
  loadSwatch = (key) => {
    let state = this.state;
    // console.log(hex);
    state.colors.hex.color = this.state.swatches[key];
    // console.log(hex)
    this.setState(state,()=>{
      console.log(this.state.colors.hex)
      this.syncColors("hex")
    })
  }
  addSwatch = () => {    
    console.log(`addSwatch`);
    let swatches = this.state.swatches;
    for(let i = 0; i < swatches.length; i++){
      if(swatches[i] === this.state.colors.hex.color){
        return;
      }
    }
    swatches.push(this.state.colors.hex.color);
    localStorage.setItem("swatches", JSON.stringify(swatches));
    let localSwatches = JSON.parse(localStorage.swatches);
    console.log(localSwatches);
    this.setState(swatches);
  }
  clearSwatches = () => {
    console.log(`clearSwatches`);
    let state = this.state;
    state.swatches = [];
    this.setState(state, ()=>{
      localStorage.setItem("swatches", JSON.stringify(state.swatches))
    })
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
        <Helmet>
                <meta charSet="utf-8" />
                <title>Color Converter - Hex and RGB</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
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
              <div className="color-banner" style={{backgroundColor : '#'+this.state.colors.hex.color}}>
                <div className="info-row">
                  <div className="numeric-results-wrap">
                    <div className="hex-results">
                      <button className="copy-button copy-rgba" onClick={()=>{this.copy(".hex-code")}}>
                      <i className="icon-copy_icon"></i>
                      </button>
                      <code className="hex-code"> {'#' +this.state.colors.hex.color}</code>
                    </div>
                    <div className="rgba-results">
                      <button onClick={()=>{this.copy(".rgba-code")}} className="copy-button copy-rgba">
                      <i className="icon-copy_icon"/>
                      </button>
                      <code className="rgba-code">{`rgba(${this.state.colors.rgba.color.r},${this.state.colors.rgba.color.g},${this.state.colors.rgba.color.b},${this.state.colors.rgba.color.a})`}</code>
                    </div>
                  </div>
                  <div className="add-swatch-button-wrap">
                    <button className="add-swatch-button" onClick={this.addSwatch}>+</button>
                  </div>
                </div>
              </div>
              <div className="swatch-grid">
              {this.state.swatches.map((swatch, i ) => {
                        return(
                          <div className="swatch" style={{background : `#`+swatch}}>
                            <div>
                              <button key={i} className="load-swatch-button"  onClick={()=> {this.loadSwatch(i)}}>
                                <i className="icon-info_icon"></i>
                              </button>
                            </div>
                          </div>
                        )
                })}
                <div className="empty-swatch swatch">
                    <div className="add-swatch-wrap">
                      <button className="add-swatch-button" onClick={this.addSwatch}>
                        <svg id="Layer_1" data-name="Layer 1" viewBox="0 0 801.68 800"><title>add-button</title><path d="M800.84,800H.84V0h800ZM449,351.82V158.54H352.65V351.82H159.38v96.36H352.65V641.46H449V448.18H642.3V351.82Z"/></svg>
                        <svg className="hovered" data-name="Layer 1" viewBox="0 0 801.68 800"><title>add-button</title><path style={{fill: `#`+this.state.colors.hex.color}} d="M800.84,800H.84V0h800ZM449,351.82V158.54H352.65V351.82H159.38v96.36H352.65V641.46H449V448.18H642.3V351.82Z"/></svg>
                      </button>
                    </div>
                </div>
              </div>
              <div className="clear-swatches-wrap">
                <button className="clear-swatches" onClick={this.clearSwatches}>Clear Swatches</button>
                <button className="clear-lock" data-locked="true" onClick={(event) =>{this.toggleLock(event)}}>
                  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 801.68 800"><title>lock-icon</title><rect x="169.23" y="329.98" width="463.22" height="355.84" rx="58.06"/><path id="lock" d="M527.28,277.53a126.45,126.45,0,0,0-252.89,0v56.54h56V277.53a70.45,70.45,0,0,1,140.89,0V624.07h56Z"/></svg>
                </button>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default App;
