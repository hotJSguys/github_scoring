import Input from '../../Input'

function test(a, b){
  return a+b
}

it('test', () => {
  expect(test(1, 1)).toBe(2)
})