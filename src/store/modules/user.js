const user = {
    state: {
      token: '',
      info: {},
      localIds2:'',
      code:'',
      code2:'',
      tab:'',
      isReportTab:'',
      dataQueryMcn:'',
      chipcode:''
    },
    mutations: {
      SET_TOKEN: (state, token) => {
        state.token = token
      },
      CODE: (state, code) => {
        state.code = code
      },
      CODE2: (state, code2) => {
        state.code2 = code2
      },
      TAB: (state, tab) => {
        state.tab = tab
      },
      ISREPORTTAB: (state, isReportTab) => {
        state.isReportTab = isReportTab
      },
      DATAQUERY_MCN: (state, dataQueryMcn ) => {
        state.dataQueryMcn = dataQueryMcn
      },
      CHIPCODE:(state, chipcode) =>{
        state.chipcode = chipcode
      }

    },
  
    actions: {

    }
  }
  export default user