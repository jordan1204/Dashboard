const Const={
    GridLayoutCols:Object.freeze({ lg: 6, md: 6, sm: 4, xs: 2, xxs: 2 }),
    ChartBackgroundColor:Object.freeze([
        'rgba(0, 143, 251, 0.85)',
        'rgba(0, 227, 150, 0.85)',
        'rgba(254, 176, 25, 0.85)',
      ]),
    ConditionType:{
      CertificateList:1,
      YearMonth:2
    },
    InitialCondition:{
      year:new Date().getFullYear(),
      month:new Date().getMonth()+1,
      certificateVal:-1
    }
}

export default Const;