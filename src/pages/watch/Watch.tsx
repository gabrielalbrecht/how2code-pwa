import { IonButtons, IonContent, IonFooter, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonRange, IonIcon, IonButton, IonList } from '@ionic/react';
import { arrowBackOutline, arrowBackSharp, happyOutline, happySharp, sadOutline, sadSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import './Watch.css';

const Page: React.FC<RouteComponentProps> = (props : any) => {
	let videoId = props.match.params['videoId'] || {};
	let [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true' ? true : false);
	let rating = 1;

	setInterval(() => {
		let aux = (localStorage.getItem('loggedIn') === 'true' ? true : false)
		if (aux !== isLoggedIn) {
			setLoggedIn(aux);
		}
	}, 1000);


	const doRate = () => {
		isLoggedIn = localStorage.getItem('loggedIn') === 'true' ? true : false;

		if (isLoggedIn) {
			let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

			let sessionId = '';
			if (currentUser && currentUser.session && currentUser.session.sessionId) {
				sessionId = currentUser.session.sessionId;
			}

			let id = '';
			if (currentUser && currentUser.id) {
				id = currentUser.id;
			}

			axios({
				method: 'post',
				url: 'http://localhost:8080/rating/',
				data: {
					"userId": id,
					"rating": rating,
					"learningMaterial": {
						"videoId": videoId
					}
				},
				headers: {
					'Authorization': sessionId,
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				},
				maxRedirects: 0,
			}).then((res) => {
				if (res.data && res.data.success) {
					console.log(res);
					return;
				}

				console.log(res.data.message);
			})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {

				});
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Assistir</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Assistir</IonTitle>
					</IonToolbar>
				</IonHeader>
				<iframe title="Material de Aprendizagem" width="100%" height="490px" src={'https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0'} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
			</IonContent>
			{	isLoggedIn ? (
				<IonFooter>
					<IonList>
						<IonItem>
							<IonRange min={1} max={10} step={1} snaps={true} pin={true} color="secondary" value={rating} onIonChange={(e) => { rating = e.detail.value as number; }}>
								<IonIcon size="large" ios={sadOutline} md={sadSharp} slot="start" ></IonIcon>
								<IonIcon size="large" ios={happyOutline} md={happySharp} slot="end"></IonIcon>
							</IonRange>
						</IonItem>
						<IonButton expand="block" onClick={doRate}>
							Avaliar
					</IonButton>
					</IonList>
				</IonFooter>
			) : ('')}
		</IonPage>
	);
};

export default Page;
