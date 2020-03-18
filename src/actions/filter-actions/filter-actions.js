import ActionCreator from '../action-creator.js';

const FilterActions = {
  filtersCards: (dispatch) => (genre, showingCardsAmount, selectedCardId) => {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.changeShowingCardsAmount(showingCardsAmount));
    if (selectedCardId) {
      dispatch(ActionCreator.changeSelectedCard(selectedCardId));
    }
  },
};

export default FilterActions;