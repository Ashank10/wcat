#!/usr/bin/env node

const fs = require("fs");
const { stringify } = require("querystring");
let arguments = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArguments = [];

for(let i of arguments)
{
    if(i[0] == "-")
    {
        flags.push(i);
    }
    else if(i[0] == "$")
    {
        secondaryArguments.push(i.slice(1));
    }
    else
    {
        filenames.push(i);
    } 
}
for(let file of filenames)
{
    let filedata = fs.readFileSync(file,"utf-8");
    for(let flag of flags)
    {
        // remove space
        if(flag == "-rs")
        {
           filedata = filedata.split(" ").join("");
        }
        // remove new line
        if(flag == "-rn")
        {
            filedata = filedata.split("\r\n").join("");
        }
        // remove special character
        if(flag == "-rsc")
        {
            let tempString = "";
            for(let character of filedata)
            {
                if((character.charCodeAt(0) >=65 && character.charCodeAt(0) <=90) || (character.charCodeAt(0) >=97 && character.charCodeAt(0) <=122))
                {
                    tempString +=character;
                }
            }
            filedata = tempString;
        }
        if(flag == "-rc")
        {
            // if character like & is not removed then 
            for(let secondaryArgument of secondaryArguments)
            {
                filedata = filedata.split(secondaryArgument).join("");
            }
        }
    }
    console.log(filedata);
}
// function removeAll(stringify,removaldata)
// {
//     return stringify.split(removaldata).join("");
// }

