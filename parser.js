const fs = require('fs');
const readline = require('readline');

create_matrix_table = (data) => {
    let result = [];
    let get_values = false
    
    for (var i = 0; i < data.length; i++) {
        if(data[i].includes('// Objective function')){
            get_values = true
            continue
        }
        if(data[i].includes('// constraints')){
            get_values = true
            continue
        }
        if (data[i].includes("//") && read) break;
        if (get_values) {
          var string_array = data[i].match(/((!? \d+))/g);
          var int_array = [];
          string_array.forEach((element) => {
            int_array.push(parseInt(element));
          });
          result.push(int_array);
        }
      }
    let fct = result.shift()
    fct.push(0)
    result.push(fct)
    
    return result;
}

module.exports.parse_input_file = async (file) => {
    const fstream = fs.createReadStream('./input_files/' + file);
    const rl = readline.createInterface({
        input: fstream,
        crlfDelay: Infinity
    });

    const data = [];
    var i = 0;
    
    
    for await (const line of rl) {
        data[i] = line;
        i++;
    }

    var table = create_matrix_table(data)
    
    return table
}