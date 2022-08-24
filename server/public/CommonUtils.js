const CommonUtils = {
    GetFormat:function(extension,workbook){
        var format = null;
        switch(extension){
            case "xlsx":
                format = workbook.xlsx;
                break;
            case "csv":
                format = workbook.csv;
                break;
        }
        return format;
    }

}

module.exports = CommonUtils;