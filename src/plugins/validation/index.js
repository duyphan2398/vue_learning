import { extend } from 'vee-validate'
import { ValidationProvider } from 'vee-validate'
import { ValidationObserver } from 'vee-validate'
import Vue from 'vue'
import * as rules from 'vee-validate/dist/rules'


Object.keys(rules).forEach(rule => {
  switch (rule) {
    case 'required':
      extend(rule, {
        ...rules[rule],
        message: "{_field_} is required"
      });
      break
    case 'required_if':
      extend(rule, {
        ...rules[rule],
        message: "{_field_} is required"
      });
      break
    default:
      extend(rule, rules[rule])
      break

  }
});


extend('half_alphabet', {
  validate (value) {
    return /(^[a-zA-Z0-9!-/:-@¥[-`{-~]*$)/.test(value)
  }
})


Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)