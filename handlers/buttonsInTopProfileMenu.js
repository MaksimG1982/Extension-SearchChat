function buttonsInTopProfileMenu(topProfileMenu) {

    const menu = document.createElement('div');


    menu.innerHTML = `
            <div class="vkuiSpacing" style="height: 16px; padding: 8px 0px;"><div class="vkuiSeparator vkuiSeparator--padded"><hr class="vkuiSeparator__in"></div></div>
    
            <a class="top_profile_mrow" href="#"
                style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    pointer-events: none;
                    cursor: default;
                    padding-bottom: 5px;
                "
            >
                <span style="display: flex; align-items: center; gap: 10px;">
                    <svg
                        width="28" 
                        height="28"
                        class="vkuiIcon vkuiIcon--28 vkuiIcon--w-28 vkuiIcon--h-28"
                        display="block"
                        style="border-radius: 50%"
                    >
                        <image
                            width="28"
                            height="28"
                            xlink:href="https://raw.githubusercontent.com/alexanderStoyak/Extension-SearchChat/main/icons/logo.png" 
                        />
                    </svg>
                    Меню «ПоискЧата»
                </span>
            </a>
            
            <a id="stats_searchChats" class="top_profile_mrow">
                <span style="display: flex; align-items: center; gap: 5px;">
                    ${icons({ name: 'statistics_outline', fill: 'iconsAccent', realSize: 24 ,size: 22 })} Статистика
                </span>
            </a>
    `;

    topProfileMenu.append(menu);

    document.getElementById('stats_searchChats').onclick = showStatistics;
}