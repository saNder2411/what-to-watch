import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import compose from '../compose/compose.js';
import {getCardsData} from '../../reducers/card-list/selectors.js';
import CardListActions from '../../actions/card-list-actions/card-list-actions.js';

import {ShowingCardsAmount} from '../../const.js';
import {getAppRoute} from '../../utils/utils.js';


const withActiveItem = (Component) => {

  class WithActiveItem extends PureComponent {

    constructor(props) {
      super(props);
      this._handleActiveItemClick = this._handleActiveItemClick.bind(this);
    }

    _handleActiveItemClick(evt) {
      evt.preventDefault();
      const {currentTarget: {id}} = evt;
      const {cardsData, history, filtersCards} = this.props;

      if (id) {
        const {genre} = cardsData.find((card) => card.id === +id);

        filtersCards(genre, ShowingCardsAmount.ON_START, +id);
        history.push(getAppRoute(id).CARDS);

        return;
      }

      const {target: {textContent: genre}} = evt;

      filtersCards(genre, ShowingCardsAmount.ON_START);
    }

    render() {
      const {screen, userCardsData} = this.props;

      return <Component screen={screen} userCardsData={userCardsData} onActiveItemClick={this._handleActiveItemClick} />;
    }
  }

  WithActiveItem.propTypes = {
    screen: PropTypes.string,
    userCardsData: PropTypes.arrayOf(PropTypes.object.isRequired),
    filtersCards: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    cardsData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };

  const mapStateToProps = (state) => ({
    cardsData: getCardsData(state),
  });

  const mapDispatchToProps = (dispatch) => ({filtersCards: CardListActions.filtersCards(dispatch)});

  return compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(WithActiveItem);
};

export default withActiveItem;
