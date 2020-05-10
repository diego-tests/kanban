<template>
    <div class="create-card">
        <button 
            v-show="!isCreating"
            data-testid="create"
            @click="isCreating = true"
        >
            Create card
        </button>
        <ValidationObserver v-slot="{ handleSubmit, valid }">
            <form 
                v-if="isCreating"
                data-testid="create"
                class="stage-card"
                :is-creating="isCreating"
                @submit.prevent="handleSubmit(onCreate)"
            >
                <div
                    class="color"
                    :style="{backgroundColor: newColor}"
                />
                <color-picker
                    ref="colorPicker"
                    :value="newColor"
                    @input="updateColor"
                />
                <ValidationProvider
                    v-slot="{errors}"
                    rules="required"
                >
                    <input 
                        v-model="newTitle"
                        class="title"
                        placeholder="*Title..."
                        required
                        data-testid="title"
                    >
                    <div
                        v-show="errors" 
                        class="error"
                    >
                        {{ errors[0] }}
                    </div>
                </ValidationProvider>
                <ValidationProvider
                    v-slot="{errors}"
                    rules="required|numeric"
                >
                    <input 
                        v-model="newRef"
                        class="reference"
                        placeholder="*Reference..."
                        data-testid="reference"
                    >
                    <div
                        v-show="errors" 
                        class="error"
                    >
                        {{ errors[0] }}
                    </div>
                </ValidationProvider>
                <div class="buttons">
                    <button
                        :disabled="!valid"
                    >
                        Create
                    </button>
                    <button
                        type="button"
                        @click="isCreating = false"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import { Compact } from 'vue-color' 
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';
import  { CREATE_CARD } from '../../../../../store/_actionTypes'

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('numeric', {
  ...required,
  ...numeric,
  message: 'Must be a number',
});

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    'color-picker': Compact,
  },
  props: {
    stageId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isCreating: false,
      newTitle: '',
      newRef: '',
      newColor: '#40BDBF',
    }
  },
  computed: {
    newCard() {
      return {
        title: this.newTitle,
        reference: this.newRef,
        color: this.newColor,
      }
    },
  },
  methods: {
    onCreate() {
      this.$store.dispatch(CREATE_CARD, { stageId: this.stageId, card: this.newCard })
      this.isCreating = false
      this.newTitle = ''
      this.newRef = ''
    },
    updateColor({ hex }) {
      this.newColor = hex
    },
  },
}
</script>
<style lang="scss" src="../styles/_card.scss"/>