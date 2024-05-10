const products = document.querySelector('.search-input');
const searchSelection = document.querySelector('.select');
let footer = document.querySelector('.footer');
let table = document.querySelector('#table .tbody');
searchSelection.addEventListener('change',(e)=>{
    console.log( e.target.value);
})
const renderUser = (value) =>{
    table.innerHTML='';
    value.map((item) =>{
       return  table.innerHTML += `
        <tr>
            <td>${item.username}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>            
            <td>${item.website}</td>
            <td>${item.address.city}</td>
            <td><button class="custom-button red-button" onclick="change(this)">Inactive</button></td>
        </tr>
        `
    })

}
const change = (button)=> {
    if (button.classList.contains('red-button')) {
        button.classList.remove('red-button');
        button.classList.add('green-button');
        button.innerHTML = "Active";
    } else {
        button.classList.remove('green-button');
        button.classList.add('red-button');
        button.innerHTML = "Inactive";
    }
}
const sortName = (arr) => {
        return arr.sort((a, b) => {
            const cityA = a.username.toUpperCase();
            const cityB = b.username.toUpperCase();
            if (cityA < cityB) return -1;
            if (cityA > cityB) return 1;
            return 0;
        });
    }

const app = async () => {
    const fetchData = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await fetchData.json();
   await products.addEventListener('input',(e)=>{
       const searchStr = e.target.value.toLowerCase();
        const dataList = data.filter((item) => {
            return item.name.toLowerCase().includes(searchStr) || item.username.toLowerCase().includes(searchStr);
        });
        renderUser(dataList)
    });
    searchSelection.addEventListener('change',(e)=>{
        if(e.target.value === "name"){
            const sortList = sortName(data);
            renderUser(sortList);
        }

    })
    await renderUser(data);

}
app();

