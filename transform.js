module.exports.to_max = (table) => {
    // transpose the input values 
    let new_table = [];
    for(i = 0; i <= table[0].length - 1; i++){
        let temp = [];
        for(j = 0; j < table.length; j++){
            temp.push(table[j][i])
        }
        new_table.push(temp)
    }
    return new_table
}