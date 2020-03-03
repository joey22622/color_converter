import React  from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends React.Component {
  state={
    hex : {
      color : '123456',
    },
    rgba : {
      r : 0,
      g : 0,
      b : 0,
      a : 0
    }
  }
  input = React.createRef();
  errorMessage = () => {

  }
  updateHex = event => {
    // console.log(event.keyCode);
    const input = event.target.value.toUpperCase();
    const regex = RegExp('^[A-F0-9]+$' , 'g');
    const i = event.target.selectionStart;
    console.log(input)
    // console.log(regex.test(input));
    if(regex.test(input)){
      console.log(i)
      let hex = this.state.hex.color;
      hex = input.substr(0,i) + input.substr(i+2);
      hex = input.substr(0,i) + input.substr(i+2);
      // console.log(input.substr(i+1))
      // console.log(input.substr(0,i))
      console.log(hex);

      this.setState({hex});
    } else {
      this.errorMessage();
      console.log("yikes");
    }
  
  }

  // hexToRgb = (hex) => {
  // }
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
                <input type="text" ref={this.input} value={this.state.hex.color} onChange={(event)=>{this.updateHex(event)}}/>
                </p>
              </div>
              <div className="rgba-wrap">
                <h2 className="rgba-head">RGB(A)</h2>
                <p className="red-input">
                <label>Red</label>
                <input placeholder="red" value="0"/>
                </p>
                <p className="green-input">
                <label>Green</label>
                <input placeholder="green" value="0"/>
                </p>
                <p className="blue-input">
                <label>Blue</label>
                <input placeholder="blue" value="0"/>
                </p>
                <p className="aplha-input">
                <label>Alpha</label>
                <input placeholder="alpha" value="0"/>
                </p>
              </div>
            </div>
            <div className="results-column">
              <div className="color-banner" style={{backgroundColor : '#'+this.state.hex}}></div>
              <div className="numeric-results-wrap">
                <div className="hex-results">
                    <code>{'#' +this.state.hex}</code>
                </div>
                <div className="rgba-results">
                  <code>{`rgba(${this.state.rgba.r},${this.state.rgba.g},${this.state.rgba.b},${this.state.rgba.a})`}</code>
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
