<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white header-fixed">
      <q-toolbar>
        <q-img src="src/assets/logo.png" style="width: 7.5rem; margin-left: 0.375rem" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view class="bg-grey-3" />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.header-fixed {
  z-index: 2002 !important;
}
</style>
