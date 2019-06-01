<template>
    <Modal :show="isOpen" @close="$emit('update:show', false)">
        <template v-slot:header>
            {{ title }}
        </template>            
        
        <base-input class="mb-4">
            <textarea 
                v-model="comment"
                class="form-control form-control-alternative" 
                name="name" 
                rows="12"
                cols="80"
                placeholder="..."></textarea>
        </base-input>
        <base-button 
            @click="makeComment"
            type="default" round block size="lg">
            Comentar
        </base-button>

    </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
    name: 'modal-comment',
    components: {
        Modal,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: 'Nota de revisão'
        }
    },
    data() {
        return {
            comment: ''
        }
    },
    computed: {
        isOpen() {
            return this.show
        }
    },
    methods: {
        makeComment() {
            this.$emit('comment', this.comment)
        }
    }
}
</script>

<style>

</style>
