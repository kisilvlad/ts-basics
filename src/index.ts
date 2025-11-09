const username: string = "Vlad";
const age: number = 20;
const isAdmin: boolean = true;

function describeUser(name: string, years: number, admin: boolean): string {
  const role = admin ? "адміністратор" : "користувач";
  return `Користувач: ${name}, Вік: ${years}, Роль: ${role}`;
}

console.log(describeUser(username, age, isAdmin));
