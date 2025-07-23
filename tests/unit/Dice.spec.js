import { shallowMount } from '@vue/test-utils'
import Dice from '@/components/Dice.vue'

describe('Dice.vue', () => {
  let wrapper

  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = shallowMount(Dice)
  })

  afterEach(() => {
    jest.useRealTimers()
    wrapper.destroy()
  })

  it('renders correctly with default props', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes()).toContain('dice')
    expect(wrapper.find('.face').exists()).toBe(true)
  })

  it('initializes with provided value', () => {
    const initialValue = 4
    wrapper = shallowMount(Dice, {
      propsData: { initialValue }
    })
    expect(wrapper.vm.currentNumber).toBe(initialValue)
    expect(wrapper.findAll('.dot').length).toBe(4)
  })

  it('starts rolling animation on click', async () => {
    expect(wrapper.vm.isRolling).toBe(false)
    
    wrapper.find('.dice').trigger('click')
    expect(wrapper.vm.isRolling).toBe(true)
    
    // Fast-forward animation
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.isRolling).toBe(false)
  }, 10000)

  it('emits numberChanged event after rolling', async () => {
    wrapper.find('.dice').trigger('click')
    
    // Fast-forward animation
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    
    const emitted = wrapper.emitted().numberChanged
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBeGreaterThanOrEqual(1)
    expect(emitted[0][0]).toBeLessThanOrEqual(6)
  }, 10000)

  it('prevents multiple rolls while rolling', () => {
    wrapper.find('.dice').trigger('click')
    expect(wrapper.vm.isRolling).toBe(true)
    
    // Try to roll again while already rolling
    wrapper.find('.dice').trigger('click')
    expect(wrapper.emitted().numberChanged).toBeFalsy()
  })

  it('displays correct number of dots', async () => {
    for (let i = 1; i <= 6; i++) {
      await wrapper.setData({ currentNumber: i })
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('.dot').length).toBe(i)
    }
  })
})