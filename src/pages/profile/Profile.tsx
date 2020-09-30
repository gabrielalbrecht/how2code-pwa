import { IonButtons, IonContent, IonHeader, IonLoading, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import './Profile.css';

const Page: React.FC<RouteComponentProps> = () => {
	useEffect(() => {
		
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>Perfil</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>

			</IonContent>
		</IonPage>
	);
};

export default Page;
