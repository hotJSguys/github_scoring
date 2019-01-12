import React from 'react'
import Avatar from '../index'

describe('Avatar render', () => {
  const mockCallBack = jest.fn();
  const avatar = shallow(<Avatar onClick={mockCallBack} />)

  it('Avatar click', () => {
    avatar.simulate('click')
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})