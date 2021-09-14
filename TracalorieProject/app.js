// Storage Controller
const StorageCtrl = (function() {
	// Public methods
	return {
		storeItem: function(newItem) {
			let items;
			// Check if any items in ls
			if (localStorage.getItem('items') === null) {
				items = [];
				//Push new items
				items.push(newItem);
				// Set ls
				localStorage.setItem('items', JSON.stringify(items))
			} else {
				// Get what is already in LS
				items = JSON.parse(localStorage.getItem('items'));

				// Push new item
				items.push(newItem);

				// Reset ls
				localStorage.setItem('items', JSON.stringify(items))
			}
		},
		getItemsFromStorage: function() {
			let items;
			if (localStorage.getItem('items') === null) {
				items = [];
			} else {
				items = JSON.parse(localStorage.getItem('items'));
			}
			return items;
		},
		updateItemStorage: function(updatedItem) {
			let items = JSON.parse(localStorage.getItem('items'));
			items.forEach(function(item, index) {
				if (updatedItem.id === item.id) {
					items.splice(index, 1, updatedItem); // remove one item from that index and the third parameter is what to update it with
				}
			});
			localStorage.setItem('items', JSON.stringify(items));
		},
		deleteItemFromStorage: function(id) {
			let items = JSON.parse(localStorage.getItem('items'));
			items.forEach(function(item, index) {
				if (id === item.id) {
					items.splice(index, 1); // remove one item from that index
				}
			});
			localStorage.setItem('items', JSON.stringify(items));
		},
		clearItemsFromStorage: function() {
			localStorage.removeItem('items');
		}
	}
})();


// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  // Data Structure / State
  const  data = {
    // items: [
    //   // {id: 0, name: 'Steak Dinner', calories: 1200},
    //   // {id: 1, name: 'Cookie', calories: 400},
    //   // {id: 2, name: 'Eggs', calories: 300},
    // ],
		items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  }

  // Public methods
  return {
    getItems: function() {
      return data.items; 
    },
		addItem: function(name, calories) {
			let ID;
			// Create ID
			if (data.items.length > 0) {
				ID = data.items.length; // Ketu aj e ka bo ma ndryshe video.105 min.13
			} else {
				ID = 0;
			}

			// Calories to number
			calories = parseInt(calories);

			// Create new item
			newItem = new Item(ID, name, calories);

			// Add to items array
			data.items.push(newItem)

			return newItem
		},
		getItemById: function(id) {
			let found = null;
			// Loop through items
			data.items.forEach(function(item) {
				if (item.id === id) {
					found = item;
				}
			});
			return found;
		},
		updateItem: function(name, calories) {
			// Calories to number
			calories = parseInt(calories);

			let found = null;
			
			data.items.forEach(function(item) {
				if(item.id === data.currentItem.id) {
					item.name = name;
					item.calories = calories;
					found = item;
				}
			});
			return found;
		},
		deleteItem: function(id) {
			// Get ids
			const ids = data.items.map(function(item) {
				return item.id;
			});

			// Get index
			const index = ids.indexOf(id);

			// Remove item
			data.items.splice(index, 1);
		},
		clearAllItems: function() {
			data.items = [];
		},
		setCurrentItem: function(item) {
			data.currentItem = item;
		},
		getCurrentItem: function() {
			return data.currentItem;
		},
		getTotalCalories: function() {
			let total = 0;

			data.items.forEach(function(item) {
				total += item.calories;
			});

			data.totalCalories = total

			return data.totalCalories;
		},
    logData: function() {
      return data;
    }
  }
})();


// UI Controller
const UICtrl = (function() {
	// This is just in case we change the html vars
	// Here we put all the html elements we need
	const UISelectors = {
		itemList: '#item-list',
		listItems: '#item-list li',  //all lis with id item-list
		addBtn: '.add-btn',
		updateBtn: '.update-btn',
		deleteBtn: '.delete-btn',
		backBtn: '.back-btn',
		clearBtn: '.clear-btn',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		totalCalories: '.total-calories',
	}
  
  // Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `
          <li class="collection-item" id="item-${item.id}">
            <strong>${item.name}</strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
          </li>
        `;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }, 
		getItemInput: function() {
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value,
			}
		},
		addListItem: function(item) { // qeshtu e ka bo aj ama mundesh edhe ndryshe(shko kqyre posht ku e ke thirr)
			// Show the list
			document.querySelector(UISelectors.itemList).style.display = 'block'
			// Create li element
			const li = document.createElement('li');
			// Add class
			li.classList.add('collection-item');
			li.id = `item-${item.id}`;
			//Add HTML
			li.innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
			<a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
			// Insert item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
		},
		updateListItem: function(item) {
			let listItems = document.querySelectorAll(UISelectors.listItems); // This returns a node list

			// Turn node List into array
			listItems = Array.from(listItems)

			listItems.forEach(function(listItem) {
				const itemID = listItem.getAttribute('id');

				if (itemID === `item-${item.id}`) { // if this is true than we know that that's the one we should update
					document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;;
				}
			});
		},
		deleteListItem: function(id) {
			const itemID = `#item-${id}`
			const item = document.querySelector(itemID);
		  item.remove();
		},
		removeItems: function() {
			let listItems = document.querySelectorAll(UISelectors.listItems);

			// Turn Node list into array
			listItems = Array.from(listItems);

			listItems.forEach(function(item) {
				item.remove;
			})
		},
		getSelectors: function() {
			return UISelectors; 
		},
		clearInput: function() {
			document.querySelector(UISelectors.itemNameInput).value = '';
			document.querySelector(UISelectors.itemCaloriesInput).value = '';
		},
		addItemToForm: function() {
			document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
			UICtrl.showEditState();
		},
		hideList: function() { // kjo eshte optional ka te beje vetem me styling
			document.querySelector(UISelectors.itemList).style.display = 'none';
		},
		showTotalCalories: function(totalCalories) {
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		},
		clearEditState: function() {
			UICtrl.clearInput();
			document.querySelector(UISelectors.updateBtn).style.display = 'none'
			document.querySelector(UISelectors.deleteBtn).style.display = 'none'
			document.querySelector(UISelectors.backBtn).style.display = 'none'
			document.querySelector(UISelectors.addBtn).style.display = 'inline'
		},
		showEditState: function() {
			document.querySelector(UISelectors.updateBtn).style.display = 'inline'
			document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
			document.querySelector(UISelectors.backBtn).style.display = 'inline'
			document.querySelector(UISelectors.addBtn).style.display = 'none'
		},
  }
})();


// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
	const loadEventListeners = function() {
		// Get UI Selectors
		const UISelectors = UICtrl.getSelectors();

		// Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

		// Disable submit on enter
		document.addEventListener('keypress', function(e) {
			if(e.keyCode === 13 || e.which === 13) {
				e.preventDefault();
				return false;
			}
		})

		// Edit icon click event
		document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
		
		
		// Update item event
		document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

		// Back item event
		document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

		// Delete item event
		document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

		// Clear item event
		document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
	}

	// Add item submit
	const itemAddSubmit = function(e) {
		// Get form input from UI Controller
		const input = UICtrl.getItemInput();

		// Check for name and calorie input
		if (input.name !== "" && input.calories !== "") {
			// Add item
			const newItem = ItemCtrl.addItem(input.name, input.calories);
			// Add item to UI list
			UICtrl.addListItem(newItem);
			
			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// Add total to UI
			UICtrl.showTotalCalories(totalCalories);

			// Store in localStorage
			StorageCtrl.storeItem(newItem);

			// ClearField
			UICtrl.clearInput();

			


			//KETE LART MUNDESH ME ZEVENDESU ME KETE POSHTE EDHE FUNKSIONIN 'addListItem' me fshi krejt.
			// ItemCtrl.addItem(input.name, input.calories);
			// //Fetch items from data structure
      // const items = ItemCtrl.getItems();
      // // Populate list with items
      // UICtrl.populateItemList(items);
			// UICtrl.clearInput();
		}
		// console.log(ItemCtrl.logData());
		e.preventDefault();
	}

	// Click edit item
	const itemEditClick = function(e) {
		if (e.target.classList.contains('edit-item')) {
			// Get list item id ex. (item-1, item-2)
			const listId = e.target.parentNode.parentNode.id;

			// Break into an array
			const listIdArr = listId.split('-');
			
			// Get actual id
			const id = parseInt(listIdArr[1]);

			// Get item
			const itemToEdit = ItemCtrl.getItemById(id);
			
			// Set current item
			ItemCtrl.setCurrentItem(itemToEdit);

			// Add item to form
			UICtrl.addItemToForm();
		} else {
			
		}

		e.preventDefault();
	}

	// Update item submit
	const itemUpdateSubmit = function(e) {
		// Get item input
		const input = UICtrl.getItemInput();

		// Update item
		const updateItem = ItemCtrl.updateItem(input.name, input.calories);

		// Update UI
		UICtrl.updateListItem(updateItem);

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		// Add total to UI
		UICtrl.showTotalCalories(totalCalories);

		// Update local storage
		StorageCtrl.updateItemStorage(updateItem);

		UICtrl.clearEditState();

		e.preventDefault();
	}

	// Delete button event
	const itemDeleteSubmit = function(e) {
		// Get current item
		const currentItem = ItemCtrl.getCurrentItem();

		// Delete from data structure
		ItemCtrl.deleteItem(currentItem.id);

		// Delete from UI
		UICtrl.deleteListItem(currentItem.id);

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		// Add total to UI
		UICtrl.showTotalCalories(totalCalories);

		// Delete from local storage
		StorageCtrl.deleteItemFromStorage(currentItem.id);

		UICtrl.clearEditState();

		e.preventDefault();
	}

	// Clear items event
	const clearAllItemsClick = function(e) {
		// Delete all items from data structure
		ItemCtrl.clearAllItems();

		// Get total calories
		const totalCalories = ItemCtrl.getTotalCalories();
		// Add total to UI
		UICtrl.showTotalCalories(totalCalories);

		// Remove from UI
		UICtrl.removeItems();

		// Clear from local storage
		StorageCtrl.clearItemsFromStorage();

		// Hide ul
		UICtrl.hideList();

		e.preventDefault();
	}

  // Public methods
  return {
    init: function() {
			//Clear edit state / set inital state
			UICtrl.clearEditState();

      //Fetch items from data structure
      const items = ItemCtrl.getItems();

			// Check if any items
			if (items.length === 0) {
				UICtrl.hideList();
			} else {
				// Populate list with items
      	UICtrl.populateItemList(items);
			}

				// Get total calories
				const totalCalories = ItemCtrl.getTotalCalories();
				// Add total to UI
				UICtrl.showTotalCalories(totalCalories)

			//Load event listeners
			loadEventListeners();
    }
  }

})(ItemCtrl, StorageCtrl, UICtrl);


// Initialize App
App.init();