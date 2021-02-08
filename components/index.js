//const pagina = 'https://adordni.herokuapp.com';
const pagina = 'http://192.168.100.42';
class User{
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
    async addBook(user,id,fn){
        let querry = await fetch(`${pagina}/users/${user}/add/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);          
        }else{
            if(data.biblio){
                fn(true,true);       
            }else{
                fn(false,true); 
            }
        }
    }
    async addFavBook(user,id,fn){
        let querry = await fetch(`${pagina}/users/${user}/fav/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);          
        }else{
            //console.log(data)
            if(data.fav){
                fn(true,true);       
            }else{
                fn(false,true); 
            }
        }
    }
    async searchBook(user,id,fn){
        let querry = await fetch(`${pagina}/users/${user}/search/${id}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);          
        }else{
            //console.log(data)
            fn(true,data);       
        } 
    }
}
class Books{
    async getBooks(skip,fn){
        let querry = await fetch(`${pagina}/books/all`, {
            method: 'POST',
            body:JSON.stringify({skip}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false)     
        }else{
            fn(true,data)
        }
        
    }
    async getDataBook(id,fn){
        let querry = await fetch(`${pagina}/books/${id}/all`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false)     
        }else{
            fn(true,data)
        }
    }
    
}
let user = new User;
let books = new Books;
export {user,books};