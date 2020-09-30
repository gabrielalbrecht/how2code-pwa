import {
    IonAvatar,
    IonButton,
    IonCheckbox,
    IonChip,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonModal,
    IonTitle,
    IonToggle,
    IonToolbar,
} from '@ionic/react';

import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { moonOutline, moonSharp, personOutline, personSharp, searchOutline, searchSharp } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
    restrict: boolean;
}

const appPages: AppPage[] = [
    {
        title: 'Pesquisar',
        url: '/',
        iosIcon: searchOutline,
        mdIcon: searchSharp,
        restrict: false
    },
    {
        title: 'Perfil',
        url: '/profile',
        iosIcon: personOutline,
        mdIcon: personSharp,
        restrict: true
    },
];

const Menu: React.FC = () => {
    const location = useLocation();
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true' ? true : false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    const [showModalLogin, setShowModalLogin] = useState(!isLoggedIn && !(localStorage.getItem('stayAnon') === 'true' ? true : false));
    const [showModalSignup, setShowModalSignup] = useState(false);

    let modalLogin: any = {
        email: "",
        password: "",
    }


    const toggleDarkModeHandler = () => document.body.classList.toggle('dark');

    const doLogin = () => {
        axios.post('http://localhost:8080/user/login', {
            email: modalLogin.email,
            password: modalLogin.password
        })
            .then((res) => {
                if (res.data && res.data.success) {
                    setLoggedIn(true);
                    setShowModalLogin(false);
                    setCurrentUser(res.data.user);
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('currentUser', JSON.stringify(res.data.user));

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

    const doSignUp = () => {
        setLoggedIn(true);
        setShowModalSignup(false);
    }

    const doLogout = () => {
        axios.post('http://localhost:8080/user/logout', {
            email: modalLogin.email,
            password: modalLogin.password
        })
            .then((res) => {
                if (res.data && res.data.success) {
                    setLoggedIn(false);
                    setCurrentUser({});
                    localStorage.setItem('loggedIn', 'false');
                    localStorage.removeItem('currentUser');
                    localStorage.setItem('stayAnon', 'false');

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


    return (
        <IonMenu contentId="main" type="overlay" className={'menu'}>
            <IonContent>
                <IonList id="inbox-list">
                    <IonChip className={'chip-avatar'}>
                        <IonAvatar className={'avatar'}>
                            <IonImg src={`data:image/jpeg;base64,${currentUser.image || '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KKKKACiiigAooooAKKKKACiiigAooooAKKKKACpaiqWgCN+ppKV+ppKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiimySLGhd2CqoySe1ADqzb3WorfKQYkkHBPYVn3+rvc5jgJSLoT0Lf/AFqzqAJbi6muTumkLeg7CoqKKACiiigAooooAKKKKACiiigBY5HicMjMrDoQcVr2WuHhLsewcD+dY9FAHYo6yIGRgykZBBzmnVytlfy2T/Id0ZPKHv8A/Xro7W6ivIQ8Z+qnqKAJ6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACpaiqWgCN+ppKV+ppKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAGuyxoWYgKoySe1c3qWoteybVyIlPC+vuan1i/wDOkNvGf3an5iP4j/gKy6ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAqW2uZLWYSRnnuPWoqKAOstbqO8gEkZ+q+hqeuVsb1rKcOOUPDL6j/GuojkWRA6HKsMgjvQA6iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACpaiqWgCN+ppKV+ppKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKoate/Zbbap/eycL7e9X65XUbo3V475+RTtX6UAVqKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK19DvcE2rng8pn+VZFKjmN1dThlOQaAOyoqK2nW5to5V/iGT7VLQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUtRVLQBG/U0lK/U0lABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAU9VuPs9hIQfmb5R+NcxWv4gly8UQ6Abj/AErIoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKANrQLjIkgJ6fMtbNcvpkvk6hEezHafxrqKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKlqKpaAI36mkpX6mkoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDmNXk8zUpP9nCiqdTXp33sx9XNQ0AFF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'}`} />
                        </IonAvatar>
                    </IonChip>
                    <IonChip className={'chip-welcome'}>
                        <IonLabel>
                            {!isLoggedIn ? `Olá!
            Você ainda não está conectado.` : `Olá, 
            ${currentUser.fullname}!`}
                        </IonLabel>
                    </IonChip>
                    {
                        !isLoggedIn ? (
                            <IonList>
                                <IonButton expand="block" onClick={() => setShowModalLogin(true)} >Entrar</IonButton>
                                <IonButton expand="block" onClick={() => setShowModalSignup(true)}>Criar conta</IonButton>
                            </IonList>
                        ) : (
                                <IonList>
                                    <IonButton expand="block" onClick={doLogout} >Sair</IonButton>
                                </IonList>
                            )
                    }
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                { appPage.restrict === true ? (isLoggedIn === true && (
                                    <IonItem className={location.pathname === appPage.url ? 'selected' : ''} href={appPage.url} routerDirection="none" lines="none" detail={false}>
                                        <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                        <IonLabel>{appPage.title}</IonLabel>
                                    </IonItem>
                                )
                                ) : (
                                        <IonItem className={location.pathname === appPage.url ? 'selected' : ''} href={appPage.url} routerDirection="none" lines="none" detail={false}>
                                            <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                            <IonLabel>{appPage.title}</IonLabel>
                                        </IonItem>
                                    )
                                }
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
                <IonItem lines="full">
                    <IonIcon slot="start" ios={moonOutline} md={moonSharp}></IonIcon>
                    <IonLabel>
                        Modo Escuro
            </IonLabel>
                    <IonToggle
                        slot="end"
                        name="darkMode"
                        onIonChange={toggleDarkModeHandler}
                    />
                </IonItem>
                <IonModal isOpen={showModalLogin} onDidDismiss={() => { localStorage.setItem('stayAnon', 'true'); setShowModalLogin(false); }} cssClass="modal-login">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Entrar</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonItem className={'ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom'}>
                            <IonLabel position="floating">E-mail</IonLabel>
                            <IonInput value={modalLogin.email} onIonChange={e => { modalLogin.email = e.detail.value }}></IonInput>
                        </IonItem>
                        <IonItem className={'ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom'}>
                            <IonLabel position="floating">Senha</IonLabel>
                            <IonInput type="password" value={modalLogin.password} onIonChange={e => { modalLogin.password = e.detail.value }}></IonInput>
                        </IonItem>
                    </IonContent>
                    <IonFooter>
                        <IonButton className='ion-margin-start ion-margin-end ion-margin-top' expand="block" onClick={doLogin}>Entrar</IonButton>
                        <IonButton className='ion-margin-start ion-margin-end ion-margin-bottom' expand="block" onClick={() => { setShowModalLogin(false); setShowModalSignup(true); }}>Criar conta</IonButton>
                        <IonButton className='ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom' expand="block" fill="outline" onClick={() => { localStorage.setItem('stayAnon', 'true'); setShowModalLogin(false) }}>Continuar como anônimo</IonButton>
                    </IonFooter>
                </IonModal>
                <IonModal isOpen={showModalSignup} onDidDismiss={() => { localStorage.setItem('stayAnon', 'true'); setShowModalSignup(false); }}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Criar conta</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonItem className={'ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom'}>
                            <IonLabel position="floating">E-mail</IonLabel>
                            <IonInput type="email" value={modalLogin.email} onIonChange={e => { modalLogin.email = e.detail.value }}></IonInput>
                        </IonItem>
                        <IonItem className={'ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom'}>
                            <IonLabel position="floating">Senha</IonLabel>
                            <IonInput type="password" value={modalLogin.password} onIonChange={e => { modalLogin.password = e.detail.value }}></IonInput>
                        </IonItem>
                        <IonItem className={'ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom'}>
                            <IonLabel position="floating">Nome Completo</IonLabel>
                            <IonInput value={modalLogin.password} onIonChange={e => { modalLogin.fullname = e.detail.value }}></IonInput>
                        </IonItem>
                        <IonItem className={'ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom'}>
                            <IonLabel>Aluno do IFSUL</IonLabel>
                            <IonCheckbox slot="end" color="primary" value={modalLogin.ifsulStudent} />
                        </IonItem>
                        <IonItem className={'ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom'}>
                            <IonLabel>Imagem de Perfil</IonLabel>
                            <input type="file" onChange={(e) => { console.log(e) }} />
                        </IonItem>
                    </IonContent>
                    <IonFooter>
                        <IonButton className='ion-margin-start ion-margin-end ion-margin-top' expand="block" onClick={doSignUp}>Criar conta</IonButton>
                        <IonButton className='ion-margin-start ion-margin-end ion-margin-bottom' expand="block" onClick={() => { setShowModalSignup(false); setShowModalLogin(true); }}>Entrar</IonButton>
                        <IonButton className='ion-margin-start ion-margin-end ion-margin-top ion-margin-bottom' expand="block" fill="outline" onClick={() => { localStorage.setItem('stayAnon', 'true'); setShowModalSignup(false); }}>Continuar como anônimo</IonButton>
                    </IonFooter>
                </IonModal>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
