import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Icon } from 'semantic-ui-react';
import styled, { css } from 'styled-components';
import CircularProfilePic from './CircularProfilePic';
import dateFormat from 'date-fns/format';

const BodyText = styled.p`
  font-weight: 500;
`;
const AttributeTitle = styled.h6`
  font-size: 9px;
  color: #a3a9b2;
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  text-align: center;
  margin-top: 80px;
`;

const NameDiv = styled.div`
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  font-size: 24px;
  font-weight: 600;
`;

const formatDate = date => dateFormat(date, 'MMMM YYYY');

const UserBasicInfo = ({ user = {} }) => {
  const name = user.fullName || user.username;
  const dpUrl = (user.profilePicture && user.profilePicture.url) || 'http://emblemsbf.com/img/77148.jpg';
  return (
    <Wrapper>
      <CenteredDiv>
        <CircularProfilePic src={dpUrl} />
        {name && <NameDiv>{name}</NameDiv>}
      </CenteredDiv>

      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <div>
              <AttributeTitle>MEMBER SINCE</AttributeTitle>
              {user.createdAt && <BodyText>{formatDate(user.createdAt)}</BodyText>}
            </div>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <div>
              <AttributeTitle>USER LEVEL</AttributeTitle>
              <BodyText>
                <Icon fitted name="star" style={{ color: '#4fb798' }} /> SuperHero
              </BodyText>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
};

UserBasicInfo.propTypes = {
  user: PropTypes.object,
};

export default UserBasicInfo;
