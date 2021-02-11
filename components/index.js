//const pagina = 'https://adordni.herokuapp.com';
const pagina = 'http://192.168.100.42';
class User{
    async getData(username,pass,fn){
        let querry = await fetch(`${pagina}/users/login`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            if(data['err']){
                fn(true,data);
            }else if(!data['login']){
                fn(true,data);
            }   
        }else{
            if(data['login']){
                fn(false,true)
            }
        }
    }
    async searchUser(username,fn){
        let querry = await fetch(`${pagina}/users/search`, {
            method: 'POST',
            body: JSON.stringify({username}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);            
        }else{
            fn(true);
        }
    }
    async setData(username,pass,fn){
        let querry = await fetch(`${pagina}/users/register`, {
            method: 'POST',
            body: JSON.stringify({username,pass}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
        });
        
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);
        }else{
            fn(true,data['username'])
        }
    }
    async addBook(id,fn){
        let querry = await fetch(`${pagina}/users/${global.user}/add/${id}`, {
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
    async addFavBook(id,fn){
        let querry = await fetch(`${pagina}/users/${global.user}/fav/${id}`, {
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
    async searchBook(id,fn){
        let querry = await fetch(`${pagina}/users/${global.user}/search/${id}`, {
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
    async startRead(){
        let querry = await fetch(`${pagina}/users/${global.user}/search/${id}`, {
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
    async getUsersBooks(type,fn){
        let querry = await fetch((type)?`${pagina}/books/biblio/${global.user}`:`${pagina}/books/favs/${global.user}`, {
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
        fn(false) 
    }
    
}
let user = new User;
let books = new Books;
export {user,books};