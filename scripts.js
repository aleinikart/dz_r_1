/*п. 1*/

const loop = (times = 0, callback = null) => {
    if (times > 0){
        for (let i = 0; i < times; i++){
            console.log(callback);
        }
    }
}
loop(3, 5); //задаем оба параметра
loop(2); //оставляем callback по умолчанию
loop(0, 2); //times = 0, в консоль не выводится
 



/*п. 2*/

const calculateArea = (figure, input = []) =>{
    let area = null;
    let curInput = [...input];
    
    switch (figure){
        case('triangle'):
            area = (curInput[0]*curInput[1]/2);    
            break;   
        case('parallelogram'):
            area = (curInput[0]*curInput[1]);    
            break;
        case('circle'):
            area = Math.pow((Math.PI*curInput[0]), 2);    
            break;
        default:
            alert( 'Фигура неизвестна');   
            
    }
    let result = {
        area: area,
        figure: figure,
        input: curInput
    }
    console.log(result);
}
calculateArea('triangle', [4, 8]);
calculateArea('parallelogram', [9, 7]);
calculateArea('circle', [2]);




/*п. 3*/

const staff = {
    managers: [],
    developers: []
}


class Human {
    constructor(name, dateOfBirth){
        this.name = name;
        this.dateOfBirth = new Date(dateOfBirth);
        this.age = Math.floor((new Date() - this.dateOfBirth)/(365*24*3600*1000));
    }
    displayinfo(){
        console.log(this.name + ', ' + this.age + ', ' + this.dateOfBirth);
    }
}

class Employee extends Human {
    constructor(name, dateOfBirth, salary, department){
        super(name, dateOfBirth);
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
    
    displayinfo(){
        super.displayinfo();
        console.log(this.salary + ', ' + this.department);
    }
}
class Manager extends Employee {
    constructor(name, dateOfBirth, salary, department, developers = []){
        super(name, dateOfBirth, salary, department);
        this.developers = developers;
        this._removeDev();
        this.addToStaff();
    }
    addToStaff(){
        let manItem = {
            name: this.name,
            department: this.department,
            developers: this.developers
        }
        staff.managers.push(manItem);
    }
    _removeDev(devname){
        for (let developer in this.developers){
            this.developers = this.developers.filter(developer => developer !== devname);
            staff.developers = staff.developers.filter(developer => developer.name !== devname);
            for (let managItem of [...staff.managers]){
                if(this.developers.includes(devname)){
                    let curDevs = managItem.developers;             
                    for (let curDev of curDevs){
                        managItem.developers = curDevs.filter(curDev => curDev !== devname);
                        return curDevs;
                    }
                }
                
            }
            
        }
     }
    _addDev(devname){
        for (let developer of [...staff.developers]){
            let curNewDev = {
                name: devname,
                department: this.department,
                manager: this.name
            }
            for (let managItem of [...staff.managers]){
                if(this.department === managItem.department){
                    managItem.developers.push(devname);
                }
            }
            
            staff.developers.push(curNewDev);
            return this.developers;
            
        }
     }
    
}

class Developer extends Employee {
    constructor(name, dateOfBirth, salary, department, manager){
        super(name, dateOfBirth, salary, department);
        this.manager = manager;
        this.addToStaff()
    }
    addToStaff(){
        let devItem = {
            name: this.name,
            department: this.department,
            manager: this.manager
        }
        staff.developers.push(devItem);
    }
    _changeManager(mname){
        for(let manager of staff.managers){
            if(manager.name === mname){
                for(let developer of staff.developers){
                    if(this.name === developer.name){
                        this.manager = manager.name;
                        this.department = manager.department;
                        developer.manager = this.manager;
                        developer.department = this.department;
                    }
                }
                manager.developers.push(this.name);
            } else {
                let curDevs = manager.developers;
                manager.developers = curDevs.filter(curDevs => curDevs.includes(this.name) !== true)
            }
        }
     }
}

let alex = new Human('Alex', '1987, 4, 15');
alex.displayinfo();//Инфо об Алексе как о человеке

let emp_alex = new Employee('Alex', '1987, 4, 15', 30000, 'IT');
emp_alex.displayinfo();//Инфо об Алексе как о сотруднике

let m1 = new Manager('John', '1987, 4, 15', 30000, 'Dev', ['Jack', 'Daniel']);
let m2 = new Manager('Bruce', '1989, 7, 1', 30000, 'Support', ['Monica']);
let m3 = new Manager('Nancy', '1991, 8, 13', 24000, 'Marketing', ['Max']);

let d1 = new Developer('Jack', '1995, 3, 25', 34000, 'Dev', 'John');
let d2 = new Developer('Daniel', '1996, 10, 1', 32000, 'Dev', 'John');
let d3 = new Developer('Monica', '1996, 3, 15', 30000, 'Support', 'Bruce');
let d4 = new Developer('Max', '1996, 3, 15', 30000, 'Marketing', 'Nancy');

m1._removeDev('Jack');//Убираем Джека из подчинения Джона
m2._addDev('Helen');//Нанимаем Хелен в подчинение к Брюсу
d3._changeManager('Nancy')//Переводим Монику в отдел маркетинга к Нэнси

console.log(staff);





/*п. 4*/

let promiseArray = [];
for (let i = 1; i <= 10; i++){
    promiseArray[i] = new Promise(function(resolve, reject){
       fetch(`https://jsonplaceholder.typicode.com/users/${i}`)
            .then(result => result.json())
            .then(data => console.log(data))
    });
    Promise.all(promiseArray);
}