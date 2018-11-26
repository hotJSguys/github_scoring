import React from 'react'
import Input from '../../Input'

describe('Input', () => {
  const input = shallow(<Input />)

  it('Snapshot', () => {
    expect(input).toMatchSnapshot()
  })

  it('check props', () => {
    console.log('props', input.props())
    expect(input.props().placeholder).toBe('Enter repo link')
  })
})