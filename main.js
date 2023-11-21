//BOTAO

var btn = document.querySelector(".button")

btn.onmousemove = function (e) {
	var x = e.pageX - btn.offsetLeft
	var y = e.pageY - btn.offsetTop

	btn.style.setProperty('--x', x + 'px')
	btn.style.setProperty('--y', y + 'px')
}

//FIMM BOTAO

//BANNER
console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".bg-current");
	const previousBgImageEl = appBgContainerEl.querySelector(".bg-previous");
	const nextBgImageEl = appBgContainerEl.querySelector(".bg-next");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		nextCardEl.classList.remove("next--card");

		currentBgImageEl.classList.remove("bg-current");
		previousBgImageEl.classList.remove("bg-previous");
		nextBgImageEl.classList.remove("bg-next");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("previous--card");
			previousCardEl.classList.add("next--card");
			nextCardEl.classList.add("current--card");

			currentBgImageEl.classList.add("bg-previous");
			previousBgImageEl.classList.add("bg-next");
			nextBgImageEl.classList.add("bg-current");
		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("next--card");
			previousCardEl.classList.add("current--card");
			nextCardEl.classList.add("previous--card");

			currentBgImageEl.classList.add("bg-next");
			previousBgImageEl.classList.add("bg-current");
			nextBgImageEl.classList.add("bg-previous");
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
			duration: 0.2,
			opacity: 0.5,
			pointerEvents: "none",
		})
		.to(
			currentInfoEl.querySelectorAll(".text"),
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "-120px",
				opacity: 0,
			},
			"-="
		)
		.call(() => {
			swapInfosClass(direction);
		})
		.call(() => initCardEvents())
		.fromTo(
			direction === "right"
				? nextInfoEl.querySelectorAll(".text")
				: previousInfoEl.querySelectorAll(".text"),
			{
				opacity: 0,
				translateY: "40px",
			},
			{
				duration: 0.4,
				stagger: 0.1,
				translateY: "0px",
				opacity: 1,
			}
		)
		.to([buttons.prev, buttons.next], {
			duration: 0.2,
			opacity: 1,
			pointerEvents: "all",
		});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		previousInfoEl.classList.remove("previous--info");
		nextInfoEl.classList.remove("next--info");

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			nextInfoEl.classList.add("current--info");
			previousInfoEl.classList.add("next--info");
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			nextInfoEl.classList.add("previous--info");
			previousInfoEl.classList.add("current--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
			delay: 0.5,
			duration: 0.4,
			stagger: 0.1,
			opacity: 1,
			translateY: 0,
		})
		.to(
			[buttons.prev, buttons.next],
			{
				duration: 0.4,
				opacity: 1,
				pointerEvents: "all",
			},
			"-=0.4"
		);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
							duration: 0.8,
							opacity: 0,
							pointerEvents: "none",
						})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();

//FIM BANNER

// LANÇAMENTOS 

document.getElementById('next').onclick = function () {
	let lists = document.querySelectorAll('.item');
	document.getElementById('slide').appendChild(lists[0]);
}
document.getElementById('prev').onclick = function () {
	let lists = document.querySelectorAll('.item');
	document.getElementById('slide').prepend(lists[lists.length - 1]);
}

//FIM LANÇAMENTOS

//produtos
AOS.init();
//fim produtos

// original ScrollTrigger
const container = document.getElementById('scroll-container');
const spans = container.querySelectorAll('span');
let currentIndex = 0;

container.addEventListener('wheel', (e) => {
	container.style.overflow = 'hidden';

	if (e.deltaY > 0) {
		currentIndex = Math.min(currentIndex + 1, spans.length - 1);
	} else {
		currentIndex = Math.max(currentIndex - 1, 0);
	}

	spans.forEach((span, index) => {
		if (index === currentIndex) {
			span.style.display = 'inline';
		} else {
			span.style.display = 'none';
		}
	});
});
//fim ScrollTrigger


// Função para buscar produtos
function buscarProduto() {
	const termoDeBusca = document.getElementById("buscar").value.toLowerCase();
	const main = document.getElementById("main");
	main.innerHTML = ""; // Limpa o conteúdo atual

	// Realiza a busca nos elementos com a classe "livros" no arquivo "produto.html"
	fetch("produto.html")
		.then(response => response.text())
		.then(data => {
			// Crie um elemento temporário para analisar o conteúdo do produto.html
			const tempElement = document.createElement("div");
			tempElement.innerHTML = data;

			// Encontra os elementos com a classe "livros" e verifica se o título contém o termo de busca
			const livros = tempElement.querySelectorAll(".livros");
			livros.forEach(livro => {
				const titulo = livro.querySelector("img").alt.toLowerCase();

				if (titulo.includes(termoDeBusca)) {
					main.appendChild(livro.cloneNode(true));
				}
			});

			// Adicione a classe "area-de-busca" a main para aplicar os estilos
			main.classList.add("area-de-busca");

			// Verifique se há filhos na área de busca
			if (main.children.length === 0) {
				main.innerHTML = 'Nenhum resultado encontrado.';
				main.style.display = "flex";
				main.style.alignItems = "center";
				main.style.backgroundColor = "#F8F1EE"; // Cor de fundo quando nenhum resultado é encontrado
			}
		})
		.catch(error => {
			console.error("Erro ao buscar produtos:", error);
		});
}
//FIM BARRA DE PESQUISA


//FAVORITOS


