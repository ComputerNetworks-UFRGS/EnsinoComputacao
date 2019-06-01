<template>
    <Modal :show="isOpen" @close="$emit('update:show', false)">
        <template v-slot:header>
            {{ title }}
        </template>            
        
        <div class="mb-4">
            <textarea 
                v-model="comment"
                class="form-control form-control-alternative" 
                name="name" 
                rows="12"
                cols="80"
                placeholder="..."></textarea>
        </div>
        <button 
            @click="makeComment"
            type="default" round block size="lg">
            Comentar
        </button>

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
