class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    return `Hello, my name is ${this.name}, I'm ${this.age} years old`;
  }
}

const p1 = new Person('Jack', 32);

console.log(p1.sayHello());
