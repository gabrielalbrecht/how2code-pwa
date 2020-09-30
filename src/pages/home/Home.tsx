import { IonButtons, IonContent, IonHeader, IonLoading, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import LearningMaterials from '../../components/LearningMaterials';
import './Home.css';

const Page: React.FC<RouteComponentProps> = (props: any) => {
	let searchText = props.match.params['searchText'] || '';
	const [recommendations, setRecommendations] = useState([]);
	const [youtubeItems, setYoutubeItems] = useState([]);
	const [showLoading, setShowLoading] = useState(false);
	const [showErrorListing, setShowErrorListing] = useState(false);

	useEffect(() => {
		if (searchText) {
			setShowLoading(true);
			let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

			let sessionId = '';
			if (currentUser && currentUser.session && currentUser.session.sessionId) {
				sessionId = currentUser.session.sessionId;
			}

			axios.get('http://localhost:8080/recommender/' + searchText, {
				maxRedirects: 0,
				headers: {
					'Authorization': sessionId
				}
			})
				.then((res) => {
					if (res && res.data && res.data.success) {
						setRecommendations(res.data.recommendations || []);
						setYoutubeItems(res.data.youtubeItems || []);
					}
				})
				.catch(() => {
					setShowErrorListing(true);
				})
				.finally(() => {
					setShowLoading(false);
				});
		}
	}, [searchText]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Pesquisar</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Pesquisar</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonToolbar>
					<IonSearchbar placeholder="Pesquisar"
						value={searchText}
						onKeyPress={(e: any) => {
							if (e.key === 'Enter') {
								props.history.replace('/search/' + e.target.value);
							}
						}} ></IonSearchbar>
				</IonToolbar>
				{
					recommendations.length > 0 && (
						<LearningMaterials learningMaterials={recommendations} title="Recomendados" />
					)
				}
				{
					youtubeItems.length > 0 && (
						<LearningMaterials learningMaterials={youtubeItems} title="Resultados da busca" />
					)
				}
			</IonContent>
			<IonLoading
				isOpen={showLoading}
				onDidDismiss={() => setShowLoading(false)}
				message={'Carregando...'}
			/>
			<IonToast
				isOpen={showErrorListing}
				onDidDismiss={() => setShowErrorListing(false)}
				message="Erro ao pesquisar materiais de aprendizagem!"
				duration={2000}
				color="danger"
			/>
		</IonPage>
	);
};

export default Page;
