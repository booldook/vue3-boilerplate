import FormButton from '@/components/common/form/FormButton.vue'
import FormInput from '@/components/common/form/FormInput.vue'
import PagerCp from '@/components/common/PagerCp.vue'

export default {
  install(app, options) {

    //% Global Components Init
    app.component('PagerCp', PagerCp)
    app.component('FormButton', FormButton)
    app.component('FormInput', FormInput)
  },
}
