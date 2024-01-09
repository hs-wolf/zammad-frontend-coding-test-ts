import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonLiteCard from '../PokemonLiteCard.vue'
import { POKEMON_SPRITE_FRONT_DEFAULT_URL } from '../../utils'

describe('PokemonLiteCard', () => {
  test('Select Pokemon', async () => {
    const wrapper = mount(PokemonLiteCard, {
      props: {
        pokemonLite: {
          id: 0,
          name: 'Bulbasaur',
          sprite: POKEMON_SPRITE_FRONT_DEFAULT_URL(0),
        },
      },
    })

    wrapper.find('button[name="select-pokemon"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().select[0]).toEqual([wrapper.props().pokemonLite])
  })
})
