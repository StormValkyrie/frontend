// NPM
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Label as SemanticLabel, Icon } from 'semantic-ui-react';
import Truncate from 'react-truncate';
import { Popup } from 'semantic-ui-react';

// COMPONENTS
import Rating from '../Rating';
import PriceTag from '../Currency/PriceTag';
import Thumb from './components/Thumb';
import Col from '../layout/Col';
import { PinIcon } from '../icons';

// ACTIONS/CONFIG

// STYLES
import { Cart } from './styles';
import { cardConfig } from 'libs/config';

const ContentWrap = styled.div`
  padding: 20px;
`;

// How did we come up with height: 104px?
// the max number of lines Title can render is 4
// rendered a title that long and saw how many pixels it takes 😜
const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 4px;
  height: ${cardConfig.titleHeight};

  a {
    color: inherit;
  }
`;

const Label = styled.span`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  color: #6e7885;
`;

const Location = styled.span`
  color: #6e7885;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  height: 44px;

  svg {
    display: inline-block;
    width: 17px;
    height: 17px;
    margin-right: 2px;
    fill: #d3d7dc;
    position: relative;
    left: -3px;
  }

  p {
    width: 100%;
  }
`;

const SemanticLabelFixed = styled(SemanticLabel)`
  position: absolute;
  top: 10px;
  z-index: 10;
  right: 4px;

  a {
    opacity: 1 !important;
  }
`;

const RelativeCard = styled(Cart)`
  position: relative;
`;

const stopEventPropogation = e => e.stopPropagation();

const wrapInRopstenLink = (text, reservation) => (
  <a
    href={`https://ropsten.etherscan.io/tx/${reservation.transactionHash}`}
    target="_blank"
    onClick={stopEventPropogation}
  >
    {text}
  </a>
);

function getSmartContractBookingStatus(reservation) {
  if (!reservation) return null;
  const { transactionHash, transactionStatus } = reservation;
  if (transactionHash != null) {
    if (transactionStatus === 1) {
      return wrapInRopstenLink(
        <SemanticLabelFixed color="green">
          Confirmed <Icon name="external" />
        </SemanticLabelFixed>,
        reservation
      );
    }
    if (transactionStatus === 0) {
      return wrapInRopstenLink(
        <SemanticLabelFixed color="red">
          Unconfirmed <Icon name="external" />
        </SemanticLabelFixed>,
        reservation
      );
    }
    if (!transactionStatus) {
      return wrapInRopstenLink(
        <SemanticLabelFixed color="blue">
          Processing <Icon name="external" />
        </SemanticLabelFixed>,
        reservation
      );
    }
  }
  return <SemanticLabelFixed color="green">Confirmed</SemanticLabelFixed>;
}

const CardLocation = (item, withShadow, smartContractBookingStatus) => {
  return (
    <RelativeCard withShadow={withShadow} column>
      {smartContractBookingStatus && smartContractBookingStatus}
      <Thumb url={item.image} />
      <ContentWrap>
        <Title>
          <Truncate lines={cardConfig.titleLines}>{item.title}</Truncate>
        </Title>
        <Location>
          <PinIcon />
          <p>
            <Truncate lines={cardConfig.locationLines}>{item.location}</Truncate>
          </p>
        </Location>
        <Rating marginBottom="10px" rating={item.rating} count={item.reviewCount} />
        <Label>Starting from</Label>
        <PriceTag price={item.price} />
      </ContentWrap>
    </RelativeCard>
  );
};

// MODULE
export default function LocationCart({ item, href, withShadow, smBasis, xsBasis, mdBasis }) {
  const smartContractBookingStatus = getSmartContractBookingStatus(item.reservation);
  const cart =
    item.title.length > cardConfig.truncateThreshold ? (
      <Popup trigger={CardLocation(item, withShadow, smartContractBookingStatus)} content={item.title} />
    ) : (
      CardLocation(item, withShadow, smartContractBookingStatus)
    );
  return (
    <Col xsBasis={xsBasis} mdBasis={mdBasis} smBasis={smBasis}>
      <div>
        {href && <Link to={href}>{cart}</Link>}
        {!href && cart}
      </div>
    </Col>
  );
}

// Props Validation
LocationCart.propTypes = {
  item: PropTypes.object,
};
