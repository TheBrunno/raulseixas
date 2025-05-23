function songCharts(mode) {
    // buscar no banco a partir do nome do album (mode)

    fetch("/dashboard/getLessListenedSongs/"+mode, { method: 'GET' }).then((res) => res.json())
        .then(json => {
            console.log(json)

            const labels = [];
            const data = [];

            for (let i = 0; i < json.length; i++) {
                labels.push(json[i].nome);
                data.push(json[i].views);
            }

            document.getElementById('less_listened_song').innerHTML = labels[0];

            const leastListened = document.getElementById('leastListened').getContext('2d');
            new Chart(leastListened, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            borderColor: '#F9B631',
                            backgroundColor: '#F9B631',
                            fill: true,
                            borderRadius: 5,
                            color: '#fff',
                        }
                    ]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 50,
                                padding: 10
                            },
                            grid: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        });
    fetch("/dashboard/getMostListenedSongs/"+mode, { method: 'GET' }).then((res) => res.json())
        .then(json => {
            console.log(json)

            const labels = [];
            const data = [];

            for (let i = 0; i < json.length; i++) {
                labels.push(json[i].nome);
                data.push(json[i].views);
            }

            document.getElementById('most_listened_song').innerHTML = labels[0];

            const mostListened = document.getElementById('mostListened').getContext('2d');
            new Chart(mostListened, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            borderColor: '#F9B631',
                            backgroundColor: '#F9B631',
                            fill: true,
                            borderRadius: 5,
                            color: '#fff',
                        }
                    ]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 50,
                                padding: 10
                            },
                            grid: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        })
}

function albumCharts() {
    const albumRating = document.getElementById('rating').getContext('2d');
    Chart.defaults.color = '#fff';
    new Chart(albumRating, {
        type: 'bar',
        data: {
            labels: ['Novo Aeon', 'Krig-ha Bandolo!', 'Gita', 'O dia em que a terra parou', 'Panela do Diabo', 'Há 10 mil anos atrás', 'Metrô linha 743', 'O medo da chuva', 'Anarkilópolis'],
            datasets: [
                {
                    data: [4.8, 4.3, 4, 3.9, 3, 5, 4, 3.8, 4.4],
                    borderColor: '#F9B631',
                    backgroundColor: '#F9B631',
                    fill: true,
                    borderRadius: 5,
                    color: '#fff',
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        autoSkip: false,
                        padding: 10
                    },
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    const albumViews = document.getElementById('views').getContext('2d');
    new Chart(albumViews, {
        type: 'bar',
        data: {
            labels: ['Novo Aeon', 'Krig-ha Bandolo!', 'Gita', 'O dia em que a terra parou', 'Panela do Diabo', 'Há 10 mil anos atrás', 'Metrô linha 743', 'O medo da chuva', 'Anarkilópolis'],
            datasets: [
                {
                    data: [51, 62, 77, 15, 83, 111, 64, 38, 24],
                    borderColor: '#F9B631',
                    backgroundColor: '#F9B631',
                    fill: true,
                    borderRadius: 5,
                    color: '#fff',
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    ticks: {
                        stepSize: 50,
                        padding: 10
                    },
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
};

function changeMode() {
    const mode = document.getElementById('slc_mode').value;
    const graphContainer = document.getElementById('graphContainer');

    if (mode == 'album') {
        graphContainer.innerHTML = `
            <div class="column">
                <div class="graph1">
                    <h2>⭐ Avaliação de cada álbum ⭐</h2>
                    <canvas id="rating" width="600" height="350"></canvas>
                </div>
                <div class="most_graph1">
                    <h2>Álbum mais bem avaliado:</h2>
                    <span>
                        Há 10 Mil Anos Atrás
                    </span>
                </div>
            </div>
            <div class="column">
                <div class="graph1">
                    <h2>👁️ Views em cada álbum 👁️</h2>
                    <canvas id="views" width="600" height="350"></canvas>
                </div>
                <div class="most_graph1">
                    <h2>Álbum mais visto:</h2>
                    <span>
                        Há 10 Mil Anos Atrás
                    </span>
                </div>
            </div>
            <div class="column column_options" id="options">
                <h3>Modo de exibição</h3>
                <select id="slc_mode" onchange="changeMode()">
                    <option value="album">Álbum</option>
                    <option value="musica">Música</option>
                </select>
            </div>
        `;

        albumCharts();

    } else if (mode == 'musica') {
        let options = '';

        fetch('/album/getAllAlbuns', { method: "GET" }).then(response => response.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    options += `<option value="${json[i].id}">${json[i].nome}</option>`;
                }

                graphContainer.innerHTML = `
                    <div class="column">
                        <div class="graph1">
                            <h2>➕ Músicas mais ouvidas 👂</h2>
                            <canvas id="mostListened" width="600" height="350"></canvas>
                        </div>
                        <div class="most_graph1">
                            <h2>Música mais ouvida:</h2>
                            <span id="most_listened_song">
                                Há 10 Mil Anos Atrás
                            </span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="graph1">
                            <h2>➖ Músicas menos ouvidas 👂</h2>
                            <canvas id="leastListened" width="600" height="350"></canvas>
                        </div>
                        <div class="most_graph1">
                            <h2>Música menos ouvida:</h2>
                            <span id="less_listened_song">
                                Há 10 Mil Anos Atrás
                            </span>
                        </div>
                    </div>
                    <div class="column column_options" id="options">
                        <h3>Modo de exibição</h3>
                        <select id="slc_mode" onchange="changeMode()">
                            <option value="album">Álbum</option>
                            <option value="musica" selected>Música</option>
                        </select>

                        <h3>Álbum</h3>
                        <select id="slc_album" onchange="changeAlbum(this)">
                            <option value="geral">Geral</option>
                            ${options}
                        </select>
                    </div>
                `;

                songCharts('geral');

            })
    }
}

function changeAlbum(element){
    const albumID = element.value;

    Chart.getChart("leastListened").destroy();
    Chart.getChart("mostListened").destroy();

    songCharts(albumID);
}
