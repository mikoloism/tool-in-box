function withAppHoc(app: EventListener): void {
	document.addEventListener('readystatechange', app);
}

export default withAppHoc;
