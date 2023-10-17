let appearance = '';
class Filters {

    constructor() {
        this.title = '';
        this.link = '';
        this.onlyWithFriends =  false;
        this.sortField = 'added';
        this.sortOrder = 'desc';
    }

    remove () {
        this.title = '';
        this.link = '';
        this.onlyWithFriends =  false;
        this.sortField = 'added';
        this.sortOrder = 'desc';
    }
}

const filters = new Filters();

function setAppearance(body) {
    if (body.className.includes('vkui--vkBase--dark')) {
        appearance = 'dark';
        setStyles();
    }
    if (body.className.includes('vkui--vkBase--light')) {
        appearance = 'light';
        setStyles();
    }
}


const observeChange = async () => {
    moment.locale('ru');
    const body = document.querySelector('body');
    setAppearance(body);

    if (!services.auth.accessToken) {
        if (
            !services.auth.accessToken
            || !services.timeStampAuthModalPage
            || services.timeStampAuthModalPage < +new Date
        ) {
            authModalPage();
        }
        return;
    }
    if (services.auth.expiresIn < +new Date) {
        vkAuth();
    }


    const [profileHeaderActions] = document.getElementsByClassName('ProfileHeaderButton');
    const pageActions = document.getElementById('page_actions');
    const topProfileMenu = document.getElementById('top_profile_menu');


    if (profileHeaderActions) {
        buttonInProfiles(profileHeaderActions);
    }

    if (pageActions) {
        buttonInProfilesForGroups(pageActions);
    }

    if (topProfileMenu) {
        buttonsInTopProfileMenu(topProfileMenu);
    }


    const observer = new MutationObserver(mutations => {

        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {

                if (!(node instanceof HTMLElement)) {
                    setAppearance(body);
                    continue;
                }


                if (
                    node.classList.contains('im-mess--check')
                    || node.classList.contains('_sticker_hints')
                    || node.classList.contains('im-page--title')
                ) {
                    const [peerHistory] = document.getElementsByClassName('_im_peer_history');

                    if (peerHistory) {
                        buttonInMessages(peerHistory);
                    }
                }


                if (
                    node.classList.contains('post_field_warning')
                    || node.classList.contains('chat_onl_wrap')
                    || node.classList.contains('page_block')
                ) {
                    const pageActions = document.getElementById('page_actions');

                    if (pageActions) {
                        buttonInProfilesForGroups(pageActions);
                    }
                }


                if (node.classList.contains('Profile')) {
                    const [profileHeaderActions] = document.getElementsByClassName('ProfileHeaderButton');

                    if (profileHeaderActions) {
                        buttonInProfiles(profileHeaderActions);
                    }
                }


                if (node.classList.contains('_im_dialog')) {
                    const dialogsSearch = document.getElementById('im_dialogs_search');

                    buttonInDialogsSearch(dialogsSearch);
                }
            }
        }
    });

    observer.observe(body, { childList: true, subtree: true });

};

window.onload = observeChange;