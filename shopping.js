const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
let items = [];

function handleSubminBtn(e) {
    e.preventDefault();
    const name = e.currentTarget.item.value;
    if (!name) return;
    const item = {
        name,
        id: Date.now(),
        complete: false,
    };
    items.push(item);
    e.target.reset();
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
    const displayList = items.map(item => `<li class="shopping-item">
<input type="checkbox" value="${item.id}" ${item.complete && 'checked'}>
<span class="itemName">${item.name}</span>
<button  aria-label="Remove ${item.name}"
        value="${item.id}">&times;</button>
</li>`).join('');
    list.innerHTML = displayList;
}

function storeData() {
    localStorage.setItem('item', JSON.stringify(items));

}

function getData() {
    const getDataLs = JSON.parse(localStorage.getItem('item'));
    if (getDataLs.length) {
        items.push(...getDataLs)
    }
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function deleteItem(id) {
    items = items.filter(item => item.id != id);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
    console.log(items);
}

function checkedItems(id) {
    const itemRef = items.find(item => item.id == id);
    itemRef.complete = !itemRef.complete;
    console.log('yehia')
    list.dispatchEvent(new CustomEvent('itemsUpdated'));

}

shoppingForm.addEventListener('submit', handleSubminBtn);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', storeData);
list.addEventListener('click', function (e) {
    if (e.target.matches('button')) {
        deleteItem(e.target.value);
    }
    if (e.target.matches('input[type="checkbox"]')){
        checkedItems(e.target.value);
    }
});
getData();