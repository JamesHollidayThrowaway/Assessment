<template>
    <v-list lines="three">
      <v-list-item v-for="room in roomsList" v-bind:key="room.path" :title="room">{{ room.title }} Capacity: {{ room.capacity }}
      <v-spacer/>
      <room-form :room="room"/>
      </v-list-item>
    </v-list>
  </template>
  
  <script>
  import {mapState} from 'vuex';
  import RoomForm from '@/components/RoomForm.vue';
  
  export default {
    name: 'roomsList',
    components: {RoomForm},
    computed: {
      ...mapState('rooms', ['rooms']),
      roomsList() {
        return this.rooms;
      },
    },
    methods: {
      editRoom() {
        send({
          type: 'set-document',
          ref: {path: 'rooms'},
          document: this.room
        });
        send({
          type: 'get-documents',
          ref: {
            path: 'bookings'
          }
        });
        this.open = false;
      }
      
    }
  };
  </script>
  
  <style scoped></style>
  