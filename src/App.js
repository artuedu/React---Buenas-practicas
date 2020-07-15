import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.css';

function Article (props){
  return(
    <section>
      <h2>{props.title}</h2>
      <p><em>Escrito por {props.autor}</em></p>
      <date>{props.date}</date>
      <article>
        {props.children}
      </article>
    </section>
  );
}
Article.propTypes = {
  title: PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  children: PropTypes.any
}

// class Button extends Component{
//   render(){
//     return(
//       <button style={{borderColor: this.props.borderColor, display: 'block'}}>
//         {this.props.label}
//       </button>
//     );
//   }
// }
// Button.defaultProps ={
//   borderColor: '#09f'
// }

const Button = ({borderColor = '#09f', label}) => (
  <button style={{borderColor, display: 'block'}}>
    {label}
  </button>
)
Button.propTypes = {
  borderColor: PropTypes.string,
  label: PropTypes.string.isRequired
}

class ButtonDanger extends Component{
  render(){
    return(
      <Button borderColor='red' label={this.props.label}/>
    );
  }
}

class ButtonWithLegend extends Component{
  render(){
    return(
      <div>
        <Button label={this.props.label} borderColor={this.props.borderColor}/>
        <small>{this.props.legend}</small>
      </div>
    );
  }
}

class BitCoinPriceContainer extends Component{

  state = {bpi: {}}

  componentDidMount(){
      fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => {
          const { bpi } = data;
          this.setState({ bpi });
      });
  }

  render(){
      return(
        <BitCoinPrice bpi={this.state.bpi}/>
      );
  }
}

const _renderCurrencies = (bpi) => (
  Object.keys(bpi).map(currency => (
     <div key={currency}>
      1 BTC is {bpi[currency].rate}
      <span> {bpi[currency].code}</span>
     </div>
  ))
)

const BitCoinPrice = ({bpi}) => (
  <div>
      <h4>Bitcoin Price Index</h4>
      {_renderCurrencies(bpi)}
  </div>
)

class App extends Component {
  render(){
    return (
      <div className="App">
        <h4>Composicion vs. Herencia</h4>
        <Button label="Click Aqui con composición!!"/>
        <br/>
        <ButtonDanger label="Cuidado con composción!!!" />
        <br/>
        <ButtonWithLegend
          label="Boton con explicación con composición"
          legend="Clickea el boton para hacer algo"
        />
        <Article 
          autor='Arturo'
          date={new Date().toLocaleDateString}
          title='Ariculo sobre la prop children'
        >
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, corrupti eaque perferendis harum soluta, quae voluptatem aperiam similique iure rem ipsam praesentium hic ea expedita officia, sunt libero asperiores optio?</p>
        </Article>
        <BitCoinPriceContainer />
      </div>
    );
  }
}

export default App;
