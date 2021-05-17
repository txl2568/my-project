/**
 * @ Description:列表加载mixins
 */

export default (getId,getData, type) => {
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
          limit:7,
          // 列表
          data: [],
          // 页面总条数
          pageTotal: 1,
          // 加载数据
          isLoading: false,
          mcn:'',
          noData:false,
          amount:''
        }
      },
      created() {
        this.initData()
      },
      methods: {
        // 到达底部事件
        reachBottom() {
          if (this.data.length >= this.pageTotal) {
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
          // 请求
          getId().then(res =>{
            this.amount = res.data.data.amount
            getData(res.data.data.accountId,this.limit,this.page)
            .then(res => {
              const {
                data: { records = [], count }
              } = res
              // 列表赋值
              // this.data = [...this.data, ...records]
              // this.data = res.data.data.data
              this.data=[...this.data,...res.data.data.cashrecord.data]

              // 赋值总条数
              this.pageTotal = res.data.data.cashrecord.count
              this.closeLoading()
            })
            .catch(() => {
              this.data = []
              this.closeLoading()
            })

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
  