const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
const sheetContent = bottomSheet.querySelector(".content");
const dragIcon = bottomSheet.querySelector(".drag-icon");


let isDragging = false, startY, startHeight;


const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    document.body.style.overflowY = 'hidden';
    updateSheetheight(50);
}

const hideBottomSheet = () => {
    bottomSheet.classList.remove("show");
    document.body.style.overflowY = 'auto';
}


const updateSheetheight = (height) => {
    sheetContent.style.height = `${height}vh`;
    bottomSheet.classList.toggle('fullscreen', height === 100);

}

const dragStop = () => {
    isDragging=false;
    bottomSheet.classList.remove('dragging');
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight<25?hideBottomSheet():sheetHeight>75? updateSheetheight(100):updateSheetheight(500);
}

const dragStart = (e) => {
    isDragging=true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add('dragging');
}

const dragging = (e) => {
    if(!isDragging) return;
    const delta = startY - e.pageY || e.touches?.[0].pageY;
    const newHeight = startHeight + delta/ window.innerHeight * 100;
    updateSheetheight(newHeight);
}


dragIcon.addEventListener('mouseup', dragStop);
dragIcon.addEventListener('mousedown', dragStart);
dragIcon.addEventListener('mousemove', dragging);

dragIcon.addEventListener('touchend', dragStop);
dragIcon.addEventListener('touchstart', dragStart);
dragIcon.addEventListener('touchmove', dragging);

showModalBtn.addEventListener('click', showBottomSheet);
sheetOverlay.addEventListener('click', hideBottomSheet)