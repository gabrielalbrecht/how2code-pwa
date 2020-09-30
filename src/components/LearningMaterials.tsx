import {
	IonAvatar,
	IonImg,
	IonItem, IonList, IonListHeader,
} from '@ionic/react';

import React from 'react';
import './LearningMaterials.css';

interface ContainerProps {
	learningMaterials: any;
	title: string;
}

const LearningMaterials: React.FC<ContainerProps> = ({ learningMaterials, title }) => {
	let aux: [] = learningMaterials;
	return (
		<IonList>
			<IonListHeader className={'title-default'}>
				{title}
			</IonListHeader>
			{
				aux.map((value: any, index) => {
					return (
						<IonItem key={index} href={'/watch/' + value.videoId}>
							<IonAvatar slot="start">
								<IonImg alt="Imagem do item" src={value.thumbnail} />
							</IonAvatar>
							{value.title}
						</IonItem>
					)
				})
			}
		</IonList>
	)
};

export default LearningMaterials;
