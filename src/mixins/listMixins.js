/**
 * @ Description:列表加载mixins
 */

export default (getData, type) => {
  return {
    data() {
      return {
        // 分页
        pages: {
          pageNo: 1,
          pageSize: 10,
          task_search_type: type
        },
        page:1,
        limit:3,
        // 列表
        list: [],
        // 页面总条数
        pageTotal: 1,
        // 加载数据
        isLoading: false,
        mcn:'',
        noData:false
      }
    },
    created() {
      this.initData()
    },
    methods: {
      // 到达底部事件
      reachBottom() {
        if (this.list.length >= this.pageTotal) {
          // this.$toast('没有更多了呦~')
          this.noData = true
          return
        }
        // this.page.pageNo++
        this.page++
        this.initData()
      },
      // 初始化数据
      initData() {
        // 开启加载
        this.isLoading = true
        var userReport ={
          "coverMcn": this.mcn?this.mcn:'',
          "reportState": '',
          "reportTypeCause": '',
        }
        // 请求
        getData(this.limit,this.page,userReport)
          .then(res => {
            
            const {
              data: { records = [], count }
            } = res
            // 列表赋值
            // this.list = [...this.list, ...records]
            // this.list = res.data.data.data
            this.list=[...this.list,...res.data.data.data]
            console.log('你又是个啥',res);
            // 赋值总条数
            this.pageTotal = res.data.data.count
            this.closeLoading()
          })
          .catch(() => {
            this.list = []
            this.closeLoading()
          })
      },
      // 延迟关闭loading
      closeLoading() {
        setTimeout(() => {
          this.isLoading = false
        }, 200)
      }
    }
  }
}
