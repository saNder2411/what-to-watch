import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import ActionCreator from '../../actions/action-creator.js';

import {getAppRoute} from '../../utils/utils.js';


const Logo = ({toMain, isFooterLogo, setDefaultCardListState}) => {

  const onClick = toMain ? () => setDefaultCardListState() : (evt) => evt.preventDefault();
  const footerLogoClass = isFooterLogo ? `logo__link--light` : ``;

  return (
    <div className="logo">
      <Link
        to={getAppRoute().ROOT}
        className={`logo__link ${footerLogoClass}`}
        onClick={onClick}
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  toMain: PropTypes.bool,
  isFooterLogo: PropTypes.bool,
  setDefaultCardListState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setDefaultCardListState: () => dispatch(ActionCreator.setDefaultCardListState()),
});


export default connect(void 0, mapDispatchToProps)(Logo);
