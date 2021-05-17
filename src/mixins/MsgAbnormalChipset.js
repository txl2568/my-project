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
          limit:30,
          // 列表
          list: [],
          // 页面总条数
          pageTotal: 1,
          // 加载数据
          isLoading: false,
          mcn:'',
          chipsetNoData:false,
          loading: false,
          // 结束
          finished: false
        }
      },
      methods: {
        onLoad() {
          // 开启加载
          this.isLoading = true
          var sysEventParam= null

          // 请求
          getData(this.limit,this.page,sysEventParam)
            .then(res => {
              const {
                data: { records = [], count }
              } = res
              // 列表赋值
              // this.list = [...this.list, ...records]
              // this.list = res.data.data.data
              this.list=[...this.list,...res.data.data.data]
              this.loading = false
              if (this.list.length >= res.data.data.count) {
                // 加载完数据
                this.finished = true
              } else {
                this.finished = false
                this.page += 1
              }
              console.log(this.list.length, res.data.data.count,this.page);
              // if (!res.data.data) {
              //   this.noData = true
              // }
            //   console.log('你又是个啥',res);
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
  