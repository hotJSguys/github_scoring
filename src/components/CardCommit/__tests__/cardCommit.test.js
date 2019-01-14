import React from 'react';
import CardCommit from '../index';

describe('CardCommit ', () => {
  const description = 'update deps';
  const url_avatar = 'https://cdn.dribbble.com/users/3460/screenshots/5578703/m-avatar-ryan.png';
  const name = 'Abramov';
  const date = '3 days ago';

  const card = shallow(
    <CardCommit
      description={description}
      url_avatar={url_avatar}
      name={name}
      date={date}
      onClick={mockCallBack}
    />
  );

  const mockCallBack = jest.fn();
  it('Snapshot', () => {
    expect(card).toMatchSnapshot();
  });

  it('check prop data', () => {
    console.log('PROPS', card.props().data);
    expect(card.props().data).toBe(data);
  });

  it('Clickable button', () => {
    card.find('.browse').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
