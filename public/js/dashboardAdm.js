function playlistCharts(){
    fetch('/dashboard/getPlaylistNumberSongsPerAlbum', { method: 'GET' }).then(response => response.json())
    .then(json => {
        const labels = [];
        const data = [];

        for(let i=0; i<json.length; i++){
            labels.push(json[i].nome);
            data.push(json[i].qtd_playlists);
        }

        const mostAddedAlbum = document.getElementById('most_added_album');

        mostAddedAlbum.innerHTML = labels[0];

        const numberSongsPerAlbum = document.getElementById('numberSongsPerAlbum').getContext('2d');
        new Chart(numberSongsPerAlbum, {
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

        fetch('/dashboard/getSongsMostAddedInPlaylists', { method: 'GET' }).then(response => response.json())
        .then(json => {
            const labels = [];
            const data = [];

            for(let i=0; i<json.length; i++){
                labels.push(json[i].nome);
                data.push(json[i].qtd_playlists);
            }

            const mostAddedSong = document.getElementById('most_added_song');
            mostAddedSong.innerHTML = labels[0];

            const numberSongs = document.getElementById('numberSongs').getContext('2d');
            new Chart(numberSongs, {
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
    });
}

function songCharts(mode) {
    // buscar no banco a partir do nome do album (mode)

    fetch("/dashboard/getLessListenedSongs/" + mode, { method: 'GET' }).then((res) => res.json())
        .then(json => {
            console.log(json)

            const labels = [];
            const data = [];

            for (let i = 0; i < json.length; i++) {
                labels.push(json[i].nome);
                data.push(json[i].views);
            }

            if(labels[0]) document.getElementById('less_listened_song').innerHTML = labels[0];
            else document.getElementById('less_listened_song').innerHTML = 'Nenhuma música encontrada';

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
    fetch("/dashboard/getMostListenedSongs/" + mode, { method: 'GET' }).then((res) => res.json())
        .then(json => {
            console.log(json)

            const labels = [];
            const data = [];

            for (let i = 0; i < json.length; i++) {
                labels.push(json[i].nome);
                data.push(json[i].views);
            }

            if(labels[0]) document.getElementById('most_listened_song').innerHTML = labels[0];
            else document.getElementById('most_listened_song').innerHTML = 'Nenhuma música encontrada';

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
    fetch('/dashboard/getRatingPerAlbum', { method: 'GET' })
        .then(result => result.json())
        .then((json) => {
            let labels = [];
            let datas = [];
            for(let i=0; i<json.length; i++){
                labels.push(json[i].album);
                datas.push(json[i].avaliacao)
            }

            const mostRatedAlbum = json[0].album;
            document.getElementById("most_rated_album").innerHTML = mostRatedAlbum;

            const albumRating = document.getElementById('rating').getContext('2d');
            Chart.defaults.color = '#fff';
            new Chart(albumRating, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: datas,
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
    });

    fetch('/dashboard/getViewsPerAlbum', { method: 'GET' }).then(response => response.json())
        .then((json) => {
            const labels = [];
            const datas = [];

            for (let i = 0; i < json.length; i++) {
                labels.push(json[i].nome);
                datas.push(json[i].views_album);
            }

            const mostListenedAlbum = json[0].nome;
            document.getElementById("most_viewed_album").innerHTML = mostListenedAlbum;

            const albumViews = document.getElementById('views').getContext('2d');
            new Chart(albumViews, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: datas,
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
                    <span id="most_rated_album"></span>
                </div>
            </div>
            <div class="column">
                <div class="graph1">
                    <h2>👁️ Views em cada álbum 👁️</h2>
                    <canvas id="views" width="600" height="350"></canvas>
                </div>
                <div class="most_graph1">
                    <h2>Álbum mais visto:</h2>
                    <span id="most_viewed_album">
                    </span>
                </div>
            </div>
            <div class="column column_options" id="options">
                <h3>Modo de exibição</h3>
                <select id="slc_mode" onchange="changeMode()">
                    <option value="album">Álbum</option>
                    <option value="musica">Música</option>
                    <option value="playlist">Playlist</option>
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
                            <option value="playlist">Playlist</option>
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
    }else if(mode == 'playlist'){
        graphContainer.innerHTML = `
            <div class="column">
                <div class="graph1">
                    <h2>🎼 Quantidade em playlists, por álbuns 🎵</h2>
                    <canvas id="numberSongsPerAlbum" width="600" height="350"></canvas>
                </div>
                <div class="most_graph1">
                    <h2>Álbum com mais músicas salvas:</h2>
                    <span id="most_added_album"></span>
                </div>
            </div>
            <div class="column">
                <div class="graph1">
                    <h2>🎼 Músicas mais adicionadas a playlists 🎵</h2>
                    <canvas id="numberSongs" width="600" height="350"></canvas>
                </div>
                <div class="most_graph1">
                    <h2>Músicas mais adicionada:</h2>
                    <span id="most_added_song">
                    </span>
                </div>
            </div>
            <div class="column column_options" id="options">
                <h3>Modo de exibição</h3>
                <select id="slc_mode" onchange="changeMode()">
                    <option value="album">Álbum</option>
                    <option value="musica">Música</option>
                    <option value="playlist" selected>Playlist</option>
                </select>
            </div>
        `;

        playlistCharts();
    }
}

function changeAlbum(element) {
    const albumID = element.value;

    Chart.getChart("leastListened").destroy();
    Chart.getChart("mostListened").destroy();

    songCharts(albumID);
}
