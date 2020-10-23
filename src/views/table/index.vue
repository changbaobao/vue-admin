<template>
  <div class="app-container">
   hahahahahahahaha
  </div>
</template>

<script>


export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    
  },
  methods: {
   
  }
}
</script>
