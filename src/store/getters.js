const getters = {
    token: state => state.user.token, 
    code: state => state.user.code, 
    code2: state => state.user.code2, 
    tab: state => state.user.tab,
    isReportTab: state => state.user.isReportTab,
    dataQueryMcn: state => state.user.dataQueryMcn,
    chipcode: state => state.user.chipcode,
  }
  
  export default getters