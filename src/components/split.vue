<template>
  <div class="split"></div>
</template>

<script>
  export default{}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "./../assets/less/common";
  .split {
    width: 100%;
    height: 0.8rem;
    background: #f3f5f7;
    .border-1px(rgba(7, 17, 27, 0.1),top,before);
    .border-1px(rgba(7, 17, 27, 0.1),bottom,after);
  }
</style>
