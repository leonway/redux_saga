import React, { Component } from 'react';
import s from './App.module.less';
// import './App.less';
import { connect } from 'react-redux';
import { increment, incrementAsync } from './actions/counter';
import { get_user } from './actions/user';



function Enhancer(WrappedComponent){
  return class extends Component {
    render(){
      return <WrappedComponent {...this.props} />
    }
  }
}
@Enhancer
class App extends Component {
  render() {
    const { isFetching, error, user } = this.props.user;
    let data;
    if(error){
      data = error&&error.message;
    }else if (isFetching){
      data= 'Loading......'
    }else{
      data = user&&user[0].name
    }
    console.log(data,isFetching,this.props.user)
    return (
      <div className={s.App}>
       {/* <div className="App"> */}
        <p className="App-intro">
          { this.props.counter }
        </p>
        <p>
          <button onClick={ this.props.increment }>+</button>
          <br/>
          <button onClick={ this.props.incrementAsync }>async</button>
          <br />
          <button onClick={ this.props.get_user }>Get User</button>
        </p>
        <h1>{data}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    user: state.users
  };
};

export default connect(mapStateToProps, { increment, incrementAsync, get_user })(App);