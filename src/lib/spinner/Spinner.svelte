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
		width: 100%;
	}

	div.overlay {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.8;
		z-index: 1;
	}

	.lds-ripple {
		position: absolute;
		width: 100%;
		height: calc(100% - 120px);
		z-index: 2;
		display: flex;
		justify-content: center;
	}

	.lds-ripple div {
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 2s infinite, rotation 3s infinite linear;
		align-self: center;
	}

	@keyframes lds-ripple {
		0% {
			width: 72px;
			height: 72px;
			opacity: 0.6;
		}
		50% {
			width: 92px;
			height: 92px;
			opacity: 1;
		}
		100% {
			width: 72px;
			height: 72px;
			opacity: 0.6;
		}
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
</style>
