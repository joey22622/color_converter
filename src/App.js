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
            r : 0,
            g : 0,
            b : 0,
            a : 0
        }
      }
    }
  }
  input = React.createRef();
  errorMessage = () => {

  }

  updateHex = e =>{
      const colors=this.state.colors
      let i = e.target.selectionStart;
      let input = e.currentTarget.value;
      const regex = RegExp('^[0-9a-f]+$', "i");
      console.log(regex.test(input))
      console.log(regex.test(input))
      if(regex.test(input)){
        console.log(input);
        console.log(regex.test(input))
        if(i < input.length && input.length === 7){
          colors.hex.color = (input.substr(0,i) + input.substr(i+1)).toUpperCase();
        } else if(input.length === 7) {
          colors.hex.color = input.substr(1).toUpperCase();
        } else {
          colors.hex.color = (input.substr(0,i) + "0" + input.substr(i)).toUpperCase();
        }
      } else {
        i = i-1;
      }
      colors.rgba.color.r = colors.hex[e.currentTarget.name].substr(0,2);
      this.setState({colors}, () =>{
        this.refs.input.selectionStart = i;
        this.refs.input.selectionEnd = i;
      })
        // console.log("youoyoy")
        // console.log(this.refs.input)
        // console.log(i)
        // this.refs.input.selectionStart = i;
        // this.refs.input.selectionEnd = i;
  
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
                <input type="text" name="color" ref="input" className="hex-input-field" value={this.state.colors.hex.color} onChange={(event)=>{this.updateHex(event)}}/>
                </p>
              </div>
              <div className="rgba-wrap">
                <h2 className="rgba-head">RGB(A)</h2>
                <p className="red-input">
                <label>Red</label>
                <input placeholder="red" name="rgba" onChange={(event)=>{}} value={this.state.colors.rgba.color.r}/>
                </p>
                <p className="green-input">
                <label>Green</label>
                <input placeholder="green" name="rgba" onChange={(event)=>{}} value={this.state.colors.rgba.color.g}/>
                </p>
                <p className="blue-input">
                <label>Blue</label>
                <input placeholder="blue" name="rgba" onChange={(event)=>{}} value={this.state.colors.rgba.color.b}/>
                </p>
                <p className="aplha-input">
                <label>Alpha</label>
                <input placeholder="alpha" name="rgba" readOnly="true" onChange={(event)=>{}} value={this.state.colors.rgba.color.a}/>
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
                  <code>{`rgba(${this.state.colors.rgba.r},${this.state.colors.rgba.g},${this.state.colors.rgba.b},${this.state.colors.rgba.a})`}</code>
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
