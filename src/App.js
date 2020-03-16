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
            a : 0
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
  updateHex = e =>{
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
            console.log("11123");
          } else if(input.length === max) {
            value = input.substr(1).toUpperCase()
            console.log("2");
          } else if(max === 4 && i >= 0){
            console.log("yo");
            value = (input.substr(0,i) + input.substr(i+1)).toUpperCase();
          } else {
            value = (input.substr(0,i) + "0" + input.substr(i)).toUpperCase();
            console.log("yo");
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
              console.log(value);
              value = 255;
            }
          }
        } else {
          i = i-1;
          console.log(`laskdfjalsdf`);
          console.log(input.length)
          if(max === 4 && input.length <= 1){
            value = 0;
          }
        }
        console.log(colors.rgba.color)
        console.log(i)
        this.setToValue(colors,value,path);
        this.setState({colors}, () =>{
        this.refs.input.selectionStart = i;
        this.refs.input.selectionEnd = i;
      })
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="content-wrap">
            <div className="inputs-wrap">
              <div className="hex-wrap" >
                <h2>Hex Value</h2>
                <p className="hex-input">
                <label>Alpha-Numeric Value</label>
                <input type="text" name="hex" ref="input" className="hex-input-field" value={this.state.colors.hex.color} onChange={(event)=>{this.updateHex(event)}}/>
                </p>
              </div>
              <div className="rgba-wrap">
                <h2 className="rgba-head">RGB(A)</h2>
                <p className="red-input">
                <label>Red</label>
                <input placeholder="red" name="r" onChange={(event)=>{this.updateHex(event)}} value={this.state.colors.rgba.color.r}/>
                </p>
                <p className="green-input">
                <label>Green</label>
                <input placeholder="green" name="g" onChange={(event)=>{this.updateHex(event)}} value={this.state.colors.rgba.color.g}/>
                </p>
                <p className="blue-input">
                <label>Blue</label>
                <input placeholder="blue" name="b" onChange={(event)=>{this.updateHex(event)}} value={this.state.colors.rgba.color.b}/>
                </p>
                <p className="alpha-input">
                <label>Alpha</label>
                <input placeholder="alpha" name="a" readOnly="true" value={this.state.colors.rgba.color.a}/>
                </p>
              </div>
            </div>
            <div className="results-column">
              <div className="color-banner" style={{backgroundColor : '#'+this.state.colors.hex.color}}></div>
              <div className="numeric-results-wrap">
                <div className="hex-results">
                    <code>{'#' +this.state.colors.hex.color}</code>
                </div>
                <div className="rgba-results">
                  <code>{`rgba(${this.state.colors.rgba.color.r},${this.state.colors.rgba.color.g},${this.state.colors.rgba.color.b},${this.state.colors.rgba.color.a})`}</code>
                </div>
              </div>
            </div>
            </div>
        </header>
      </div>
    )
  }
}

export default App;
