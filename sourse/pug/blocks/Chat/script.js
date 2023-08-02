
	async function ScrollDown()  {  
		const nestedElement = document.querySelector(".Chat-main-body-wrap");
		let promise = new Promise((resolve, reject) => {
			resolve(nestedElement.scrollTo({ left: 0, top: nestedElement.scrollHeight}))
		});

		let result = await promise;
		nestedElement.classList.add("show")
	};
	ScrollDown()
document.addEventListener('DOMContentLoaded', () => {

	ScrollDown();
	let btnChat = document.querySelectorAll(".Chat-aside__item");
	for (const item of btnChat) {
		item.addEventListener("click", function () {
			ScrollDown()
		})
	}
});