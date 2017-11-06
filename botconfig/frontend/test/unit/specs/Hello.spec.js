import Vue from 'vue'
import Navigation from '@/components/Navigation'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Navigation)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.TemplatesButton').textContent)
      .to.equal('Templates')
  })
})
