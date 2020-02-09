import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

export default class App extends Component {
  render() {
    const {promoCardData, previewCardTitles} = this.props;

    return <Main promoCardData={promoCardData} previewCardTitles={previewCardTitles} />;
  }
}

App.propTypes = {
  promoCardData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  previewCardTitles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};