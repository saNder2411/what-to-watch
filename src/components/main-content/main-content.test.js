import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CardsService from '../../services/cards-service.js';
import {CardsServiceProvider} from '../cards-service-context/cards-service-context.js';
import MainContent from './main-content.jsx';
import WithPreviewCardsListState from '../../hocs/with-preview-cards-list-state/with-preview-cards-list-state.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import withData from '../../hocs/with-data/with-data.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import ShowMoreButton from '../show-more-button/show-more-button.jsx';
import Footer from '../footer/footer.jsx';
import {DataTypes} from '../../const.js';

const cardsService = new CardsService();

const mockStore = configureStore();

const mockPromoCardData = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: 2014,
  poster: `the-grand-budapest-hotel-poster`,
};

const mockCardsData = [
  {
    id: 1,
    promoPoster: `bg-the-grand-budapest-hotel`,
    poster: `the-grand-budapest-hotel-poster`,
    previewPoster: `img/bohemian-rhapsody.jpg`,
    title: `Bohemian Rhapsody`,
    descriptions: [
      `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
      `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`
    ],
    rating: `10`,
    amountVoice: 100,
    previewVideoSrc: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    director: `Steven Spielberg`,
    actors: [
      `Judi Dench`, `Robert De Niro`, `Leonardo DiCaprio`, `Morgan Freeman`, `Tom Hanks`,
    ],
    runtime: `1h 58m`,
    genre: `Drama`,
    release: 1989,
    reviewsId: [5, 6, 7, 8],
  },
];

const store = mockStore({
  genre: `All Genre`,
  cardsData: mockCardsData,
  filteredCardsLength: 0,
  showingCardsAmount: 8,
  reviews: [],
  newReviews: [],
  promoCardData: mockPromoCardData,
});


const WrappedGenreList = withData(withActiveItem(GenresList), DataTypes.CARDS_DATA);
const WrappedPreviewCardsList = withActiveItem(WithPreviewCardsListState);


it(`Should MainContent render correctly`, () => {
  const markup = renderer.create(
      <Provider store={store}>
        <CardsServiceProvider value={cardsService}>
          <BrowserRouter>
            <Switch>
              <Route
                path='/'
                exact
              >
                <MainContent>
                  <WrappedGenreList/>
                  <WrappedPreviewCardsList />
                  <ShowMoreButton />
                  <Footer />
                </MainContent>
              </Route>
            </Switch>
          </BrowserRouter>
        </CardsServiceProvider>
      </Provider>,
      {
        createNodeMock: () => {
          return {};
        }
      }
  )
  .toJSON();

  expect(markup).toMatchSnapshot();
});