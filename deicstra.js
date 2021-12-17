let fs = require('fs');
let arg = process.argv;
let input = fs.readFileSync(arg[2]).toString();
let array=new Array();
let out = "";
function f(x) {
    if (x=='(') return 0;
    if (x==')') return 1;
    if (x=='+') return 2;
    if (x=='-') return 2;
    if (x=='*') return 3;
    if (x=='/') return 3;
    if (x=='^') return 4;
    return -1;
}
for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) != ' ') {
        if ((input.charAt(i) >= '0' && input.charAt(i) <= '9')) {
            out += " ";
            while ((input.charAt(i) >= '0' && input.charAt(i) <= '9') || (input.charAt(i) == '.') || (input.charAt(i) == ',')) {
                out += input.charAt(i);
                i++;
            }
            i--;
            out += " ";
        }
        else
        if (input.charAt(i) == '(')  array.push('(');
        else if (input.charAt(i) == ')') {
            while (array[array.length - 1] != '('){
                if (array.length == 0){
                    console.log('err')
                    return 0;
                }
                out += array.pop();
            }
            if (array[array.length - 1] == '(') array.pop();
        }
        else if (f(input.charAt(i)) > f(array[array.length-1])) array.push(input.charAt(i));
        else {
            while (f(input.charAt(i)) <= f(array[array.length-1]))
                out += array.pop();
            array.push(input.charAt(i));
        }
    }
}
while (array.length>0){
    if (array[array.length - 1] == '('){
        console.log('err');
        return 0;
    }
    out += array.pop();
}
array = new Array();
for (let i = 0; i < out.length; i++) {
    if (out.charAt(i) == " ") {
        i++;
        let temp = '';
        while ((out.charAt(i) != " ")) {
            temp += out.charAt(i);
            i++;
        }
        array.push(temp);
    }
    else {
        let num2 = array.pop();
        let num1 = array.pop();
        if (out.charAt(i) == '/' && num2 == 0){
            console.log('err,деление на 0');
            return 0;
        }
        if (out.charAt(i) != '^') var  result =num1+ out.charAt(i) + num2;
        else  result =Math.pow(num1,num2);
        array.push(eval(result));
    }
}
out=out.replace(' ','');
for (let i=0; i < input.length;i++) input=input.replace('^','**');
console.log(eval(input)==array);
console.log(out);
console.log(array.pop())