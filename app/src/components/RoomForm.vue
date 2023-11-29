<template>
    <v-dialog max-width="800" v-model="open">
        <template #activator="{ on }">
            <v-btn rounded color="primary" v-on="on"><v-icon>mdi-pencil</v-icon></v-btn>
        </template>
        <v-form @submit.prevent="updateRoom">
            <v-card>
                <v-card-title>Edit {{ this.room.title }}</v-card-title>
                <v-card-text>
                    <div class="d-flex">
                        <v-text-field v-model="newRoom.title" label="Room Name" class="pr-4" />
                        <v-text-field v-model="newRoom.capacity" label="Capacity" />
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn text @click="open = false">Cancel</v-btn>
                    <v-btn color="primary" type="submit">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-dialog>
</template>
  
<script>
import { send } from '@/api';

export default {
    name: 'RoomForm',
    props: {
        room: Object
    },
    data() {
        return {
            newRoom: { ...this.room },
            open: false
        };
    },
    methods: {
        updateRoom() {
            send({
                type: 'set-document',
                ref: { path: this.newRoom.path },
                document: { title: this.newRoom.title, capacity: this.newRoom.capacity }
            });
            send({
                type: 'get-documents',
                ref: {
                    path: 'rooms'
                }
            });
            this.open = false;
        }
    }
};
</script>
  
<style scoped></style>