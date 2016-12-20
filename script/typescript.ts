class Greeter {
  constructor(public greeting: string, private id: any){

  }
  greet(){
    console.log(`<h1>${this.greeting}</h1>`);
  }
}

let greeter = new Greeter('Hello world', 1234);
greeter.greet();
