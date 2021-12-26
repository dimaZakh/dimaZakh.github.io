

//получаем товары

const productsContainer = document.querySelector('#products-container');

let products = [
	{
		id: 1,
		title: 'Iphone',
		price: 50000,
		img: 'Iphone.jpg'
	},
	{
		id: 2,
		title: 'Xiaomi',
		price: 20000,
		img: 'Xiaomi.jpg'
	},
	{
		id: 3,
		title: 'Samsung',
		price: 40000,
		img: 'Samsung.jpeg'
	},
	{
		id: 4,
		title: 'Huawei',
		price: 30000,
		img: 'Huawei.jpeg'
	}


]


console.log(products);
renderProducts(products);

function renderProducts(products) {
	products.forEach(function(item){
		const productHTML = `<div class="col-md-6">
						<div class="card mb-4" data-id="${item.id}">
							<img class="product-img" src="img/${item.img}" alt="">
							<div class="card-body text-center">
								<h4 class="item-title">${item.title}</h4>

								<div class="details-wrapper">
									<div class="items counter-wrapper">
										<div class="items_control" data-action="minus">-</div>
										<div class="items_current" data-counter>1</div>
										<div class="items_control" data-action="plus">+</div>
									</div>

									<div class="price">
										<div class="price_currency">${item.price} ₽</div>
									</div>
								</div>

								<button data-cart type="button" class="btn btn-block btn-outline-warning">+ в корзину</button>

							</div>
						</div>
					</div>`

		productsContainer.insertAdjacentHTML('beforeend', productHTML);
	});
}

//счетчик

window.addEventListener('click', function(event){
	let counter;

		if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
			const counterWrapper = event.target.closest('.counter-wrapper');
			counter = counterWrapper.querySelector('[data-counter]');
		}

	if (event.target.dataset.action === 'plus') {
		counter.innerText = ++counter.innerText;
	}
	if (event.target.dataset.action === 'minus') {

		if (parseInt(counter.innerText) > 1) {
		counter.innerText = --counter.innerText;
		} else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
			event.target.closest('.cart-item').remove();

			StatusCart();
			calcPrice();
		}

	}
	if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')){
		calcPrice();
	}
});

//карта товара

const cartWrapper = document.querySelector('.cart-wrapper');

window.addEventListener('click', function(event){
	if (event.target.hasAttribute('data-cart')) {
		const card = event.target.closest('.card');
		const productInfo = {
			id: card.dataset.id,
			imgSrc: card.querySelector('.product-img').getAttribute('src'),
			title: card.querySelector('.item-title').innerText,
			price: card.querySelector('.price_currency').innerText,
			counter: card.querySelector('[data-counter]').innerText,
		};

		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
		console.log(itemInCart);
		if (itemInCart) {
			const counterEl = itemInCart.querySelector('[data-counter]');
			counterEl.innerText = parseInt(counterEl.innerText) + parseInt(productInfo.counter);
		} else {



		const cartItem = `<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item_top">
								
									<div class="cart-item_desc">
										<div class="cart-item_title">${productInfo.title}</div>

										<div class="cart-item_details">

											<div class="items counter-wrapper">
												<div class="items_control" data-action="minus">-</div>
												<div class="items_current" data-counter="">${productInfo.counter}</div>
												<div class="items_control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price_currency">${productInfo.price}</div>
											</div>

										</div>

									</div>
								</div>
							</div>`
			cartWrapper.insertAdjacentHTML('beforeend', cartItem);
		}
		card.querySelector('[data-counter]').innerText = '1';

		StatusCart();
		calcPrice();
	}
});

//корзина

function StatusCart(){
	const cartWrapper = document.querySelector('.cart-wrapper');
	const cartEmpty = document.querySelector('[data-cart-empty]');
	const orderForm = document.querySelector('#order-form');

	if (cartWrapper.children.length > 0) {
		console.log('full');
		cartEmpty.classList.add('none');
		orderForm.classList.remove('none');
	} else {
		console.log('empty');
		cartEmpty.classList.remove('none');
		orderForm.classList.add('none');
	}

}

//цена товара

function calcPrice() {
		const cartWrapper = document.querySelector('.cart-wrapper');
		const priceEl = cartWrapper.querySelectorAll('.price_currency');
		const totalPriceEl = document.querySelector('.total-price');

		let totalPrice = 0;
		priceEl.forEach(function (item){
			const amount = item.closest('.cart-item').querySelector('[data-counter]');

			totalPrice += parseInt (item.innerText) * parseInt(amount.innerText);
		});
		
		totalPriceEl.innerText = totalPrice;

};
