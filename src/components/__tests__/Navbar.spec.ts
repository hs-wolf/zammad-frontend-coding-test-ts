import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../Navbar.vue'

describe('Navbar', () => {
  test('Renders Properly', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Pokémons')
  })
})
