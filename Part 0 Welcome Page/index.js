const sidenav = document.querySelector('.sidenav');
const trigger = document.querySelector('.sidenav-trigger');
const menuItems = document.querySelectorAll('.menu-list li');
const contentDivs = document.querySelectorAll('.assess-content');

trigger.addEventListener('mouseover', function() {
    sidenav.style.transform = 'translateX(0)';  // 滑入侧边栏
    menu.style.opacity = '1';  // 显示菜单项
});

sidenav.addEventListener('mouseout', function(e) {
    if (e.relatedTarget !== trigger) {
        sidenav.style.transform = 'translateX(-100%)';  // 滑出侧边栏
        menu.style.opacity = '0';  // 隐藏菜单项
    }
});

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        contentDivs.forEach(div => div.style.display = 'none');  // 首先隐藏所有内容
        const contentId = item.getAttribute('data-content');
        document.getElementById(contentId).style.display = 'block';  // 显示点击的项目的内容
    });
});
