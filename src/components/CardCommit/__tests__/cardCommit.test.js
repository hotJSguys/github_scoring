import React from 'react'
import CardCommit from '../index'

describe('CardCommit ', () => {

  const data = ['description', 'link', 'url_avatar', 'name', 'date', 'commit_number']
  const card = shallow(<CardCommit data={data} onClick={mockCallBack}/>)
  const mockCallBack = jest.fn();

  it('Snapshot',  () => {
    expect(card).toMatchSnapshot()
  })

  it('check prop data', () => {
    expect(card.props().data).toBe(data)
    card.find('button').simulate('click')
  })

  it('Clickable button', () => {
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})
