<template>
    <div class="create-card">
        <button 
            v-show="!isCreating"
            data-testid="create"
            @click="isCreating = true"
        >
            <CreateSVG class="svg" />
        </button>
        <ValidationObserver
            v-slot="{ handleSubmit, valid }"
            slim
        >
            <form 
                v-if="isCreating"
                data-testid="create"
                class="stage-card"
                :is-creating="isCreating"
                @submit.prevent="handleSubmit(onCreate)"
            >
                <div class="form-content">
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
                        class="input-wrapper"
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
                        class="input-wrapper"
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
                            class="form-button -create"
                            :disabled="!valid"
                        >
                            Create
                        </button>
                        <button
                            class="form-button"
                            type="button"
                            @click="isCreating = false"
                        >
                            Cancel
                        </button>
                    </div>
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
import CreateSVG from '../../../../../svg/create.svg'

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
    CreateSVG,
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
<style lang="scss" scoped>
@use '../../../../../scss/color';

.create-card {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    position: relative;
}

.svg {
    fill: color.$orange;
    height: 2.4rem;
    width: 2.4rem;
}

form {
    align-items: center;
    background: rgba(white, 0.5);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
}

.form-content {
    background: white;
    box-shadow: 0 0 5px color.$black;
    padding: 3.5rem 1rem 1.2rem;
    position: relative;
    width: 95vw;
}

.color {
    left: 0;
    min-height: 3rem;
    position: absolute;
    right: 0;
    top: 0;
    transform-origin: center bottom;
    transition: transform 150ms ease-out, height 150ms ease-out;
    width: 100%;
}

.create-card ::v-deep .input-wrapper {
    display: flex;
    flex-direction: column;
    padding: 2rem 0 2.1rem;
    position: relative;
}

input {
    display: block;
    height: 4rem;
    padding: 1rem;
    width: 100%;
}

.error {
    bottom: 0;
    color: color.$red-1;
    position: absolute;
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin: 3rem auto;
    width: 90%;
}

.form-button {
    border: solid 1px color.$black;
    padding: 0.5rem 1rem;

    &.-create {
        background: color.$orange;
        border-color: color.$orange;
        color: white;
    }
}
</style>