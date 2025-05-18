let posAnterior = 0;

window.addEventListener('scroll', () => {
    const nav = document.getElementsByTagName('nav')[0];
    const posAtual = window.scrollY;

    if (posAnterior <= posAtual) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    posAnterior = posAtual;
});