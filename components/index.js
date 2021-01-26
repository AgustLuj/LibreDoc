//const pagina = 'https://adordni.herokuapp.com';
const pagina = 'http://192.168.100.42';
export default class User{
    async getData(dni,seg,fn){
        let querry = await fetch(`${pagina}/users/ingresar`, {
            method: 'POST',
            body: JSON.stringify({dni,seg}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
                    
        }else{
          
        }
    }
    async setData(user,pass,fn){
        let querry = await fetch(`${pagina}/users/register`, {
            method: 'POST',
            body: JSON.stringify({dni,seg}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
                    
        }else{
          
        }
    }
    
}