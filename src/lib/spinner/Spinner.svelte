<div class="lds-ripple">
	<div>
		<img src="/american-football.png" alt="football spinner" />
		<!-- <img src="static/american-football.png" alt="football spinner" /> -->
	</div>
</div>

<div class="overlay" />

<style>
	img {
		border: none;
	}

	div.overlay {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.5;
	}

	.lds-ripple {
		position: absolute;
		width: 100%;
		height: calc(100% - 120px);
		z-index: 1;
		display: flex;
		justify-content: center;
	}

	.lds-ripple div {
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
		align-self: center;
	}

	.lds-ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}

	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
