export async function setFunc(Func){
    await localStorage.removeItem('Func');
    await localStorage.setItem('Func',Func);
}
export function getFunc(){
    let Func = localStorage.getItem('Func') || '0/Teste';
    let Func2 = Func.split('/');

    return {id:Func2[0],nome:Func2[1]};
}
