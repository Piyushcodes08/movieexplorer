const options = document.querySelectorAll('.option');

options.forEach(option => {
    option.addEventListener('click', () => {

        document.querySelector('.option.active').classList.remove('active');
        

        option.classList.add('active');
    });
});