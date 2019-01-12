import React from 'react'
import Button from '../index'

describe('Button tests', () => {

  const mockCallBack = jest.fn();
  const button = shallow(<Button text='test' type='mobile' onClick={mockCallBack}/>)

  it('Props data on button', () => {
    expect(button.props().text).toBe('test')
    expect(button.props().type).toBe('mobile')
  })

  it('Clicked button', () => {
    button.simulate('click')
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })
})