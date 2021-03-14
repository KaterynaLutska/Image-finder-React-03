import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <div className="Button-wraper">
        <button className="Button" type="button" onClick={onClick}>
          Load more...
        </button>
      </div>
    );
  }
}
export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};
