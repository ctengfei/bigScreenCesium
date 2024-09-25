<template>
  <div class="planEpc">
    <el-table
        ref="table"
        :data="tableList"
        size="mini"
        style="width: 100%"
        height="100%"
        :header-cell-style="{background:'rgba(27, 101, 128, 0.5)',color:'#8BC2F2'}"
    >
      <el-table-column
          label="时间"
          align="center"
          prop="time"
      >
      </el-table-column>
      <el-table-column label="水位(m)" align="center" prop="rz">
      </el-table-column>
      <el-table-column
          label="库容(万m³)"
          align="center"
          prop="w"
      >
      </el-table-column>
      <el-table-column
          label="流量(m³/s)"
          align="center"
          prop="q"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script >
export default {
  data(){
    return {
      index:-1,
      timer:null,
      tableList:[]
    }
  },
  props: {
    'ifShowPlayDetail': {
      type: Boolean
    }
  },
  watch: {
    ifShowPlayDetail: function (val){
      if (!val) {
        this.tableList = [];
        clearTimeout(this.timer)
        this.index = -1
      }
    }
  },
  mounted(){
    this.$bus.on('getCurrentRow',(row)=>{
      let params ={
        glid:row.id,
        stcd:row.type == 0?'61608212':'61608180'
      }
      this.$api.fxxs.getFXXS_DDFAYB(params).then(res=>{
        const  result = res.data;
        if(result && result.length > 0){
          let dates = [];
          this.timer = setInterval(()=>{
            this.index++;
            if (this.index > result.length - 1) {
              this.index = -1;
              clearInterval(this.timer);
              return;
            }
            dates.push(result[this.index]);
            this.tableList = dates;
            this.$nextTick(()=>{
              this.$refs.table.bodyWrapper.scrollTop = this.$refs.table.bodyWrapper.scrollHeight
            })
          },1000)

        }

      })
    })

  },
  methods:{

  }
}
</script>

<style scoped lang="less">
::v-deep .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
  border-bottom: 0;
  color: #fff;
}
::v-deep  .el-table th.el-table__cell.is-leaf{
  border-bottom: 0;
  color: #fff;
}
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
  background: transparent;
}
::v-deep .el-table th.el-table__cell{
  background: transparent;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{
  background: transparent;
}
::v-deep el-table__cell gutter{
  background:rgba(27, 101, 128, 0.5)!important;
}
::v-deep .el-table::before{
  content: '';
  background: transparent;
}
::v-deep .el-table tr{
  background: transparent;
}
::v-deep .el-table, .el-table__expanded-cell{
  background:rgba(27, 101, 128, 0.5)!important;
}
.planEpc{
  width: 400px;
  height: 513px;
  position: relative;
  overflow: hidden;
}

</style>