const readline = require('readline');
const input_files = './input_files';
const fs = require('fs');
const calc = require('./simplex')


prompt_table_of_files = () => {
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    
    var string;
    // read directory and create string of variables
    fs.readdir(input_files, async (err, files) => {
        files.forEach(file => {
            if(string === undefined) string = file.split('.')[0] + '\n'
            else string += ' ' + file.split('.')[0] + '\n'
        })
        // write string to stdout and run the main programm with the given file name
        rl.question(`Choose set to run: \n ${string}`, (answer, callback) => {
            string = answer + '.txt'
            rl.close()
            calc.process_input(string)
        })
        
    })


}

prompt_table_of_files()