/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { VueNode } from '@vue/test-utils/dist/types'
import Pagination from '../Pagination.vue'

describe('Pagination', () => {
  test('Change Page', async () => {
    const wrapper = mount(Pagination, {
      props: {
        selectedLimit: 16,
        selectedPage: 2,
        limits: [16, 32, 64, 128],
        pages: [0, 1, 2, 3, 4],
        queryText: 'Testing',
      },
    })

    wrapper.find('button[name="next"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().changePage[0]).toEqual([3])

    wrapper.find('button[name="previous"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().changePage[1]).toEqual([1])

    const selector = wrapper.find('select[name="select-page"]')
    const options = selector.findAll('option')
    const option = options.at(3)?.element
    if (option) {
      option.selected = true
      selector.trigger('change')
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().changePage[2]).toEqual([3])
  })
  test('Change Limit', async () => {
    const wrapper = mount(Pagination, {
      props: {
        selectedLimit: 16,
        selectedPage: 0,
        limits: [16, 32, 64, 128],
        pages: [0, 1, 2, 3, 4],
        queryText: 'Testing',
      },
    })
    const selector = wrapper.find('select[name="select-limit"]')
    const options = selector.findAll('option')
    const option = options.at(2)?.element
    if (option) {
      option.selected = true
      selector.trigger('change')
    }
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().changeLimit[0]).toEqual([64])
  })

  test('Change Text', async () => {
    const wrapper = mount(Pagination, {
      props: {
        selectedLimit: 16,
        selectedPage: 0,
        limits: [16, 32, 64, 128],
        pages: [0, 1, 2, 3, 4],
        queryText: 'Testing',
      },
    })
    const input = wrapper.find('input[name="search"]')
    const element = input.element as VueNode<HTMLInputElement>
    expect(element.value === 'Testing')
    element.value = 'Testing$%$@.-/2'
    input.trigger('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().changeText[0]).toEqual(['Testing2'])
  })
})
