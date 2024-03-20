

document.addEventListener("DOMContentLoaded", async () => {
	// firebaseのstorageから取得
	const auth = getAuth();
	console.log(auth);
	// const uid = auth.currentUser.uid;
	getDiaries("vGbWGHGvTzcC64rBppSg6Ybxd8T2");
})
