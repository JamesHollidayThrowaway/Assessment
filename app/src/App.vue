<template>
  <v-app class="app-root">
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Vanti Lead Dev Assessment</v-app-bar-title>
      <v-spacer/>
      <v-btn @click="roomToggle = !roomToggle;">Show {{roomToggle ? 'bookings' : 'rooms'}}</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-card>
          <rooms-table v-if="roomToggle === true"/>
          <bookings-table v-else/>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import BookingsTable from '@/components/BookingsTable.vue';
import RoomsTable from '@/components/RoomsTable.vue';
</script>

<script>
export default {
  data() {
    return {
      roomToggle: false,
      btnValue: 'show rooms',
    };
  },
}
</script>
