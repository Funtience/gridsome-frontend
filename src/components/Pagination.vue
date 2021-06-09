<template>
  <div style="text-align: center">
    <Pager :info="info" v-bind="$attrs" />
  </div>
</template>

<script>
import { Pager } from 'gridsome'
export default {
  name: 'Pagination',
  components: { Pager },
  props: {
    info: {
      type: Object,
    },
  },
  inheritAttrs: false,
}
</script>

</script>

<style scoped>
.pager {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
  padding: 0 4px;
  font-size: 13px;
  min-width: 35.5px;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  vertical-align: top;
  display: inline-block;
  font-weight: 700;
}
.pager:hover {
  text-decoration: none;
}

.active {
  background-color: #409eff;
  color: #fff;
}
</style>
