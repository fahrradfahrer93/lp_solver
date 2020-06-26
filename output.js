module.exports.analyse_result = (data, variables) => {
    // get the finaly values for each variable and write a table to stdout
    let result_analysed = {}
    
    function keys (result) {
        this.result = result
    }
    for(var i = variables; i < data[0].length; i++){
        if(i !== data[0].length - 1){
            result_analysed[`x${i-variables}`] = new keys(Math.abs(Math.round(data[data.length - 1][i] *100) / 100))
        }
            else { result_analysed.obj = new keys(Math.abs(Math.round(data[data.length - 1][i] * 100) / 100))
        }
    }
    console.table(result_analysed)
}  