const transform = require('./transform');
const parser = require('./parser');
const output = require('./output');

get_slack_values = (s_number, c_number, data) => {
    for(var i = 0; i < c_number - 1; i++){
        if(i == s_number) {
            data.splice(data.length -1, 0, 1)
        }
        else {
            data.splice(data.length - 1, 0, 0)}
    }
    return data
}

get_pivot_column_index = (data) => {
    return data.indexOf(Math.max(...data))
}

get_pivot_row_index = (data, index) => {
    let temp = []
    let col_i = data[0].length - 1
    let rows = data.length - 1
    // divide each value 
    for(var i = 0; i < rows; i++){
        if(data[i][col_i] > 0 || data[i][index] > 0) {
            temp.push(data[i][col_i] / data[i][index])
        }
        else temp.push(0)
    }
    let r_index
    // check which value is the smallest and larger 0
    temp.map(val => {
        if(r_index === undefined && val > 0) r_index = val
        if(val <= r_index && val > 0) r_index = val
    })
    return temp.indexOf(r_index)
}

calculate = (data) => {
    let bool = true;
    for (var i = 0; bool === true; i++){
        let pivot_c = get_pivot_column_index(data[data.length - 1])
        let pivot_r = get_pivot_row_index(data, pivot_c)
        // save the number of columns
        let columns = data[0].length
        // get the pivot element with the coords from above
        let pivot_e = data[pivot_r][pivot_c]

        // divide the pivot row
        for(var i = 0; i < columns; i++){
            data[pivot_r][i] = (data[pivot_r][i] / pivot_e)
        }
        // process the rest -> get the factor for row[j] and divide each value in each row 
        for(var j = 0; j < data.length; j++){
            if(j !== pivot_r){
                let factor = data[j][pivot_c] * 1
                for(var k = 0; k < columns; k++){
                    data[j][k] = (data[j][k] - (data[pivot_r][k] * factor))
                }
            }
        }
        //check if every value in the objective function row is smaller then 0
        if(!Math.max(...data[data.length - 1]) > 0){
            bool = false
            break
        }
        
    }
    return data
}

module.exports.process_input = async (file) => {
    //start timer
    console.time(`${file.split('.')[0]} processed in`)

    // parse the requested file
    let table = await parser.parse_input_file(file)

    //transpose the table
    let transposed_table = transform.to_max(table)

    // save the amomunt of variables before adding slack variables 
    const colums_before_transposition = transposed_table[0].length - 1
    
    //add slack variables to transposed table
    for(line in transposed_table){
        transposed_table[line] = get_slack_values(line, transposed_table.length, transposed_table[line])
    }
    
    // run the calculation
    let result = calculate(transposed_table)
    //stop timer
    console.timeEnd(`${file.split('.')[0]} processed in`)
    
    output.analyse_result(result, colums_before_transposition)
    
}