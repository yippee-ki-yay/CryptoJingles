import React, { Component } from 'react';

class ScrollableContainer extends Component {
  _doScroll() {
    const scrollTaget = event.target;
    scrollTaget.scrollTop += 200; //Or You can add animations here
  }

  render() {
    const props = {
     onScrollOver: this._doScroll,
    };

    return(
      <div style={{overflow:'auto'}}>
        { React.cloneElement(this.props.children, props) }
      </div>
    )}
}

export default ScrollableContainer;