$(document).ready(() => {

    const searchBtn = $('#searchBtn');
    const searchText = $('#searchField');
    const resultsDisplay = $('#search-results');
    const selectedDisplay = $('#selected');
    const titleText = $('#titleText');
    const titleLabel = $('#title-label');
    const descText = $('#descText');
    const savePollBtn = $('#savePollBtn');

    const selectedFilms = [];

    resultsDisplay.on("click", "li", select);
    selectedDisplay.on("click", "li", deselect);

    savePollBtn.on("click", savePoll);

    searchBtn.on("click", async (e) => {
        e.preventDefault();

        console.log("I clicked the search button");

        if( searchText.val() == "" ) return;

        clearWarning();
        clearNoResults();

        resultsDisplay.empty();
        const header = $('<li>', { class: "list-group-item fs-6", id: "results-header" });
        header.text("Search results");
        resultsDisplay.append(header);
        
        const searchUrl = `/api/movies/search/${searchText.val()}`;
        const movieData = await fetch(searchUrl);
        const result = await movieData.json();
        console.log(result);

        // const results = [
        //     {"id":"tt5034838","image":"https://m.media-amazon.com/images/M/MV5BZmYzMzU4NjctNDI0Mi00MGExLWI3ZDQtYzQzYThmYzc2ZmNjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.6837_AL_.jpg","title":"Godzilla vs. Kong","description":"(2021)","runtimeStr":"113 min","genres":"Action, Sci-Fi, Thriller","genreList":[{"key":"Action","value":"Action"},{"key":"Sci-Fi","value":"Sci-Fi"},{"key":"Thriller","value":"Thriller"}],"contentRating":"PG-13","imDbRating":"6.3","imDbRatingVotes":"215905","metacriticRating":"59","plot":"The epic next chapter in the cinematic Monsterverse pits two of the greatest icons in motion picture history against each other--the fearsome Godzilla and the mighty Kong--with humanity caught in the balance.","stars":"Adam Wingard, Alexander Skarsgård, Millie Bobby Brown, Rebecca Hall, Brian Tyree Henry","starList":[{"id":"tt5034838","name":"Adam Wingard"},{"id":"tt5034838","name":"Alexander Skarsgård"},{"id":"tt5034838","name":"Millie Bobby Brown"},{"id":"tt5034838","name":"Rebecca Hall"},{"id":"tt5034838","name":"Brian Tyree Henry"}]},
        //     {"id":"tt0831387","image":"https://m.media-amazon.com/images/M/MV5BZDFmYTM4NzAtNWM0ZC00MGJlLWEyYzQtYzA3ZTFiNzc1YjllXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_Ratio0.6837_AL_.jpg","title":"Godzilla","description":"(2014)","runtimeStr":"123 min","genres":"Action, Adventure, Sci-Fi","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Sci-Fi","value":"Sci-Fi"}],"contentRating":"PG-13","imDbRating":"6.4","imDbRatingVotes":"419909","metacriticRating":"62","plot":"The world is beset by the appearance of monstrous creatures, but one of them may be the only one who can save humanity.","stars":"Gareth Edwards, Aaron Taylor-Johnson, Elizabeth Olsen, Bryan Cranston, Ken Watanabe","starList":[{"id":"tt0831387","name":"Gareth Edwards"},{"id":"tt0831387","name":"Aaron Taylor-Johnson"},{"id":"tt0831387","name":"Elizabeth Olsen"},{"id":"tt0831387","name":"Bryan Cranston"},{"id":"tt0831387","name":"Ken Watanabe"}]},
        //     {"id":"tt3741700","image":"https://m.media-amazon.com/images/M/MV5BOGFjYWNkMTMtMTg1ZC00Y2I4LTg0ZTYtN2ZlMzI4MGQwNzg4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6837_AL_.jpg","title":"Godzilla: King of the Monsters","description":"(2019)","runtimeStr":"132 min","genres":"Action, Adventure, Fantasy","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Fantasy","value":"Fantasy"}],"contentRating":"PG-13","imDbRating":"6.0","imDbRatingVotes":"187841","metacriticRating":"48","plot":"The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.","stars":"Michael Dougherty, Kyle Chandler, Vera Farmiga, Millie Bobby Brown, Ken Watanabe","starList":[{"id":"tt3741700","name":"Michael Dougherty"},{"id":"tt3741700","name":"Kyle Chandler"},{"id":"tt3741700","name":"Vera Farmiga"},{"id":"tt3741700","name":"Millie Bobby Brown"},{"id":"tt3741700","name":"Ken Watanabe"}]},
        //     {"id":"tt0120685","image":"https://m.media-amazon.com/images/M/MV5BNjFlOTI2OGQtMzg0YS00ZGE4LTkwMjEtZDUzYThlOTU5YjQ5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6837_AL_.jpg","title":"Godzilla","description":"(I) (1998)","runtimeStr":"139 min","genres":"Action, Sci-Fi, Thriller","genreList":[{"key":"Action","value":"Action"},{"key":"Sci-Fi","value":"Sci-Fi"},{"key":"Thriller","value":"Thriller"}],"contentRating":"PG-13","imDbRating":"5.4","imDbRatingVotes":"196481","metacriticRating":"32","plot":"French nuclear tests irradiate an iguana into a giant monster that heads off to New York City. The American military must chase the monster across the city to stop it before it reproduces.","stars":"Roland Emmerich, Matthew Broderick, Jean Reno, Maria Pitillo, Hank Azaria","starList":[{"id":"tt0120685","name":"Roland Emmerich"},{"id":"tt0120685","name":"Matthew Broderick"},{"id":"tt0120685","name":"Jean Reno"},{"id":"tt0120685","name":"Maria Pitillo"},{"id":"tt0120685","name":"Hank Azaria"}]},
        //     {"id":"tt0366526","image":"https://m.media-amazon.com/images/M/MV5BYjcwYmZiNDYtNjdmMS00YjBlLTk2YjctNzc5YTFiMWI4NzA5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_Ratio0.7041_AL_.jpg","title":"Godzilla: Tokyo S.O.S.","description":"(2003)","runtimeStr":"91 min","genres":"Action, Adventure, Fantasy","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Fantasy","value":"Fantasy"}],"contentRating":"PG","imDbRating":"6.4","imDbRatingVotes":"4576","metacriticRating":null,"plot":"Mothra and her fairies return to Japan to warn mankind that they must return Kiryu to the sea, for the dead must not be disturbed. However Godzilla has survived to menace Japan leaving Kiryu as the nation's only defense.","stars":"Masaaki Tezuka, Koji Hashimoto, Takao Okawara, Kazuki Ômori, Noboru Kaneko, Miho Yoshioka, Mickey Koga, Hiroshi Koizumi","starList":[{"id":"tt0366526","name":"Masaaki Tezuka"},{"id":"tt0366526","name":"Koji Hashimoto"},{"id":"tt0366526","name":"Takao Okawara"},{"id":"tt0366526","name":"Kazuki Ômori"},{"id":"tt0366526","name":"Noboru Kaneko"},{"id":"tt0366526","name":"Miho Yoshioka"},{"id":"tt0366526","name":"Mickey Koga"},{"id":"tt0366526","name":"Hiroshi Koizumi"}]},
        //     {"id":"tt0399102","image":"https://m.media-amazon.com/images/M/MV5BMTQ4MTg1MTE5Nl5BMl5BanBnXkFtZTgwMDY4MzU4MzE@._V1_Ratio0.7041_AL_.jpg","title":"Godzilla: Final Wars","description":"(2004)","runtimeStr":"125 min","genres":"Action, Adventure, Fantasy","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Fantasy","value":"Fantasy"}],"contentRating":"PG-13","imDbRating":"6.3","imDbRatingVotes":"8809","metacriticRating":null,"plot":"Godzilla's fiftieth Anniversary project, in which Godzilla travels around the world to fight his old foes and his allies plus a new, mysterious monster named Monster X.","stars":"Ryûhei Kitamura, Koji Hashimoto, Shûsuke Kaneko, Toshio Masuda, Takao Okawara, Masaaki Tezuka, Kenshô Yamashita, Kazuki Ômori, Masahiro Matsuoka, Rei Kikukawa, Don Frye, Maki Mizuno","starList":[{"id":"tt0399102","name":"Ryûhei Kitamura"},{"id":"tt0399102","name":"Koji Hashimoto"},{"id":"tt0399102","name":"Shûsuke Kaneko"},{"id":"tt0399102","name":"Toshio Masuda"},{"id":"tt0399102","name":"Takao Okawara"},{"id":"tt0399102","name":"Masaaki Tezuka"},{"id":"tt0399102","name":"Kenshô Yamashita"},{"id":"tt0399102","name":"Kazuki Ômori"},{"id":"tt0399102","name":"Masahiro Matsuoka"},{"id":"tt0399102","name":"Rei Kikukawa"},{"id":"tt0399102","name":"Don Frye"},{"id":"tt0399102","name":"Maki Mizuno"}]},
        //     {"id":"tt0070122","image":"https://m.media-amazon.com/images/M/MV5BY2U1ZjI2MjMtNmU2NC00Mjc2LWFjODYtZjVkODM3OGQ4NzhhXkEyXkFqcGdeQXVyNjQ2MzU1NzQ@._V1_Ratio0.7245_AL_.jpg","title":"Godzilla vs. Megalon","description":"(1973)","runtimeStr":"78 min","genres":"Action, Adventure, Family","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Family","value":"Family"}],"contentRating":"G","imDbRating":"4.8","imDbRatingVotes":"6278","metacriticRating":null,"plot":"An inventor creates a humanoid robot named Jet Jaguar that is seized by the undersea nation of Seatopia. Using Jet Jaguar as a guide, the Seatopians send Megalon as vengeance for the nuclear tests that have devastated their society.","stars":"Jun Fukuda, Yoshimitsu Banno, Ishirô Honda, Katsuhiko Sasaki, Hiroyuki Kawase, Yutaka Hayashi, Robert Dunham","starList":[{"id":"tt0070122","name":"Jun Fukuda"},{"id":"tt0070122","name":"Yoshimitsu Banno"},{"id":"tt0070122","name":"Ishirô Honda"},{"id":"tt0070122","name":"Katsuhiko Sasaki"},{"id":"tt0070122","name":"Hiroyuki Kawase"},{"id":"tt0070122","name":"Yutaka Hayashi"},{"id":"tt0070122","name":"Robert Dunham"}]},
        //     {"id":"tt0071565","image":"https://m.media-amazon.com/images/M/MV5BMmNjMWQ1MmItNTQ5OC00ZmNiLTgyYmItMzYyZmViZGI0Y2VjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.7041_AL_.jpg","title":"Godzilla vs. Mechagodzilla","description":"(1974)","runtimeStr":"84 min","genres":"Action, Adventure, Family","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Family","value":"Family"}],"contentRating":"G","imDbRating":"6.2","imDbRatingVotes":"7170","metacriticRating":null,"plot":"An Okinawan prophecy appears to foretell Earth's destruction at the hands of Godzilla, only for the true Godzilla to reveal his doppelganger as a mechanical alien weapon.","stars":"Jun Fukuda, Masaaki Daimon, Kazuya Aoyama, Reiko Tajima, Akihiko Hirata","starList":[{"id":"tt0071565","name":"Jun Fukuda"},{"id":"tt0071565","name":"Masaaki Daimon"},{"id":"tt0071565","name":"Kazuya Aoyama"},{"id":"tt0071565","name":"Reiko Tajima"},{"id":"tt0071565","name":"Akihiko Hirata"}]},
        //     {"id":"tt0097444","image":"https://m.media-amazon.com/images/M/MV5BODZjOWU4YTgtNmUyNC00ZjQ2LTk3MzUtNmRlNzgzNzFkNDE4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_Ratio0.7041_AL_.jpg","title":"Godzilla vs. Biollante","description":"(1989)","runtimeStr":"104 min","genres":"Action, Sci-Fi, Thriller","genreList":[{"key":"Action","value":"Action"},{"key":"Sci-Fi","value":"Sci-Fi"},{"key":"Thriller","value":"Thriller"}],"contentRating":"PG","imDbRating":"6.5","imDbRatingVotes":"6152","metacriticRating":null,"plot":"Desolate by the loss of his daughter, a geneticist creates a monstrous new mutation.","stars":"Kazuki Ômori, Koji Hashimoto, Kenjirô Ohmori, Kunihiko Mitamura, Yoshiko Tanaka, Masanobu Takashima, Kôji Takahashi","starList":[{"id":"tt0097444","name":"Kazuki Ômori"},{"id":"tt0097444","name":"Koji Hashimoto"},{"id":"tt0097444","name":"Kenjirô Ohmori"},{"id":"tt0097444","name":"Kunihiko Mitamura"},{"id":"tt0097444","name":"Yoshiko Tanaka"},{"id":"tt0097444","name":"Masanobu Takashima"},{"id":"tt0097444","name":"Kôji Takahashi"}]},
        //     {"id":"tt0188640","image":"https://m.media-amazon.com/images/M/MV5BMGEzYjJlNWMtMmEzOC00NDA0LWI1M2ItMGZiNThiMTFkNTliXkEyXkFqcGdeQXVyNjQ2MzU1NzQ@._V1_Ratio0.7041_AL_.jpg","title":"Godzilla 2000: Millennium","description":"(1999)","runtimeStr":"99 min","genres":"Action, Adventure, Drama","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Drama","value":"Drama"}],"contentRating":"PG","imDbRating":"6.0","imDbRatingVotes":"8585","metacriticRating":"41","plot":"An independent group of researchers actively track Godzilla as a giant meteor is discovered. The mysterious rock begins to levitate as its true intentions for the world and Godzilla are revealed.","stars":"Takao Okawara, Takehiro Murata, Hiroshi Abe, Naomi Nishida, Mayu Suzuki","starList":[{"id":"tt0188640","name":"Takao Okawara"},{"id":"tt0188640","name":"Takehiro Murata"},{"id":"tt0188640","name":"Hiroshi Abe"},{"id":"tt0188640","name":"Naomi Nishida"},{"id":"tt0188640","name":"Mayu Suzuki"}]},
        //     {"id":"tt0087344","image":"https://m.media-amazon.com/images/M/MV5BYmFmNjc1ODgtZjNlNS00NTg1LTg3OWYtYjgwMWM0NWUwMWQwXkEyXkFqcGdeQXVyNjQ2MzU1NzQ@._V1_Ratio0.6837_AL_.jpg","title":"Godzilla 1985","description":"(1985)","runtimeStr":"87 min","genres":"Action, Horror, Sci-Fi","genreList":[{"key":"Action","value":"Action"},{"key":"Horror","value":"Horror"},{"key":"Sci-Fi","value":"Sci-Fi"}],"contentRating":"PG","imDbRating":"6.1","imDbRatingVotes":"6539","metacriticRating":"31","plot":"Thirty years after the original monster's rampage, a new Godzilla emerges and attacks Japan.","stars":"Koji Hashimoto, R.J. Kizer, Ishirô Honda, Toshio Masuda, Shûe Matsubayashi, Shirô Moritani, Raymond Burr, Keiju Kobayashi, Ken Tanaka, Yasuko Sawaguchi","starList":[{"id":"tt0087344","name":"Koji Hashimoto"},{"id":"tt0087344","name":"R.J. Kizer"},{"id":"tt0087344","name":"Ishirô Honda"},{"id":"tt0087344","name":"Toshio Masuda"},{"id":"tt0087344","name":"Shûe Matsubayashi"},{"id":"tt0087344","name":"Shirô Moritani"},{"id":"tt0087344","name":"Raymond Burr"},{"id":"tt0087344","name":"Keiju Kobayashi"},{"id":"tt0087344","name":"Ken Tanaka"},{"id":"tt0087344","name":"Yasuko Sawaguchi"}]},
        //     {"id":"tt0107027","image":"https://m.media-amazon.com/images/M/MV5BMmEwMGM1ZTUtZmU1My00MDM2LWI3NWYtODQyYjU3ZWJlMDg0L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_Ratio0.7041_AL_.jpg","title":"Godzilla vs. Mechagodzilla II","description":"(1993)","runtimeStr":"105 min","genres":"Action, Adventure, Drama","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Drama","value":"Drama"}],"contentRating":"PG","imDbRating":"6.5","imDbRatingVotes":"5315","metacriticRating":null,"plot":"The United Nations assembles the ultimate weapon to defeat Godzilla, while scientists discover a fresh pteranodon egg on a remote Japanese island.","stars":"Takao Okawara, Kazuki Ômori, Masahiro Takashima, Ryoko Sano, Megumi Odaka, Yûsuke Kawazu","starList":[{"id":"tt0107027","name":"Takao Okawara"},{"id":"tt0107027","name":"Kazuki Ômori"},{"id":"tt0107027","name":"Masahiro Takashima"},{"id":"tt0107027","name":"Ryoko Sano"},{"id":"tt0107027","name":"Megumi Odaka"},{"id":"tt0107027","name":"Yûsuke Kawazu"}]},
        //     {"id":"tt0068371","image":"https://m.media-amazon.com/images/M/MV5BNGU4NTI5OTMtNDNjMy00YTQ1LTlhMDctMzhkMzUxYWE4MzI2L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_Ratio0.7041_AL_.jpg","title":"Godzilla vs. Gigan","description":"(1972)","runtimeStr":"89 min","genres":"Action, Adventure, Family","genreList":[{"key":"Action","value":"Action"},{"key":"Adventure","value":"Adventure"},{"key":"Family","value":"Family"}],"contentRating":"PG","imDbRating":"5.6","imDbRatingVotes":"5138","metacriticRating":null,"plot":"A manga artist becomes suspicious of his employers when a garbled message is discovered on tape. As he forms a team to investigate, Godzilla and Anguirus set out to help defeat the invaders.","stars":"Jun Fukuda, Yoshimitsu Banno, Ishirô Honda, Shûe Matsubayashi, Hiroshi Ishikawa, Yuriko Hishimi, Minoru Takashima, Tomoko Umeda","starList":[{"id":"tt0068371","name":"Jun Fukuda"},{"id":"tt0068371","name":"Yoshimitsu Banno"},{"id":"tt0068371","name":"Ishirô Honda"},{"id":"tt0068371","name":"Shûe Matsubayashi"},{"id":"tt0068371","name":"Hiroshi Ishikawa"},{"id":"tt0068371","name":"Yuriko Hishimi"},{"id":"tt0068371","name":"Minoru Takashima"},{"id":"tt0068371","name":"Tomoko Umeda"}]},
        //     {"id":"tt0061856","image":"https://m.media-amazon.com/images/M/MV5BOTFiNGE3ODUtNjQ1Zi00N2M5LWI4ZDQtOWY2ZmM2NTBiYjhkXkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_Ratio0.7245_AL_.jpg","title":"Son of Godzilla","description":"(1967)","runtimeStr":"84 min","genres":"Adventure, Comedy, Family","genreList":[{"key":"Adventure","value":"Adventure"},{"key":"Comedy","value":"Comedy"},{"key":"Family","value":"Family"}],"contentRating":"PG","imDbRating":"5.2","imDbRatingVotes":"5143","metacriticRating":null,"plot":"A reporter stumbles upon weather experiments on a tropical island, discovering giant mantids, a cast away woman, and an infant monster that Godzilla must adopt and learn to raise as one of his own.","stars":"Jun Fukuda, Tadao Takashima, Akira Kubo, Bibari Maeda, Akihiko Hirata","starList":[{"id":"tt0061856","name":"Jun Fukuda"},{"id":"tt0061856","name":"Tadao Takashima"},{"id":"tt0061856","name":"Akira Kubo"},{"id":"tt0061856","name":"Bibari Maeda"},{"id":"tt0061856","name":"Akihiko Hirata"}]},
        //     {"id":"tt0064373","image":"https://m.media-amazon.com/images/M/MV5BZmI4OGIwZGItYTkyZS00ODFiLTg1OWQtZTJhNGRhZWVmN2I1XkEyXkFqcGdeQXVyMTQ2MjQyNDc@._V1_Ratio0.7041_AL_.jpg","title":"All Monsters Attack","description":"(1969)","runtimeStr":"70 min","genres":"Adventure, Family, Fantasy","genreList":[{"key":"Adventure","value":"Adventure"},{"key":"Family","value":"Family"},{"key":"Fantasy","value":"Fantasy"}],"contentRating":"G","imDbRating":"3.9","imDbRatingVotes":"4924","metacriticRating":null,"plot":"A latchkey child living in the industrial city of Kawasaki confronts his loneliness through his escapist dreams of Monster Island and friendship with Minilla.","stars":"Ishirô Honda, Jun Fukuda, Kengo Furusawa, Kenji Sahara, Machiko Naka, Tomonori Yazaki, Hideyo Amamoto","starList":[{"id":"tt0064373","name":"Ishirô Honda"},{"id":"tt0064373","name":"Jun Fukuda"},{"id":"tt0064373","name":"Kengo Furusawa"},{"id":"tt0064373","name":"Kenji Sahara"},{"id":"tt0064373","name":"Machiko Naka"},{"id":"tt0064373","name":"Tomonori Yazaki"},{"id":"tt0064373","name":"Hideyo Amamoto"}]},
        //     {"id":"tt0067148","image":"https://m.media-amazon.com/images/M/MV5BMjUzNzVlMzUtNDhiMi00MzUzLWE1YjEtY2I5NWJkODU1ODQ5XkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_Ratio0.7245_AL_.jpg","title":"Godzilla vs. Hedorah","description":"(1971)","runtimeStr":"85 min","genres":"Animation, Action, Family","genreList":[{"key":"Animation","value":"Animation"},{"key":"Action","value":"Action"},{"key":"Family","value":"Family"}],"contentRating":"PG","imDbRating":"6.0","imDbRatingVotes":"5941","metacriticRating":null,"plot":"An ever evolving alien life-form from the Dark Gaseous Nebula arrives to consume rampant pollution. Spewing mists of sulfuric acid and corrosive sludge, neither humanity or Godzilla may be able to defeat this toxic menace.","stars":"Yoshimitsu Banno, Ishirô Honda, Akira Yamanouchi, Toshie Kimura, Hiroyuki Kawase, Toshio Shiba","starList":[{"id":"tt0067148","name":"Yoshimitsu Banno"},{"id":"tt0067148","name":"Ishirô Honda"},{"id":"tt0067148","name":"Akira Yamanouchi"},{"id":"tt0067148","name":"Toshie Kimura"},{"id":"tt0067148","name":"Hiroyuki Kawase"},{"id":"tt0067148","name":"Toshio Shiba"}]}
        // ];
        if ( result.length == 0 ) {
            noResults();
        } else {

            for(movie of result) {
                if (!selectedFilms.includes(movie.id)) {
                    const title = `${movie.title} ${movie.description}`;
                    const plot = movie.plot;
                    
                    const li = $('<li>', { id: `${movie.id}`, class: 'list-group-item fs-6'});
                    const film = $('<h6>');
                    const cite = $('<cite>');
                    
                    film.text(title);
                    cite.text(plot);
                    
                    li.append(film);
                    li.append(cite);
                    
                    resultsDisplay.append(li);
                }
            }
        }
    })
        
    function select(e) {
        e.preventDefault();
        if( e.currentTarget.id == "results-header" || e.currentTarget.id == "selected-header" ) return;
        const selected = document.querySelector('#search-results').removeChild(e.currentTarget);
        selectedFilms.push(selected.id);
        document.querySelector('#selected').appendChild(selected);
    }

    function deselect(e) {
        e.preventDefault();
        if( e.currentTarget.id == "results-header" || e.currentTarget.id == "selected-header" ) return;
        const selected = document.querySelector('#selected').removeChild(e.currentTarget);
        selectedFilms.splice(selectedFilms.indexOf(selected.id), 1);
        document.querySelector('#search-results').appendChild(selected);
    }

    async function savePoll(e) {
        e.preventDefault();

        clearWarning();
        clearNoResults();

        resultsDisplay.empty();
        const header = $('<li>', { class: "list-group-item fs-6", id: "results-header" });
        header.text("Search results");
        resultsDisplay.append(header);

        const title = titleText.val();
        const desc = descText.val();
        const films = selectedFilms;

        if ( title == "" ) {
            warning("title");
            return;
        }

        if ( films.length < 2 ) {
            warning("films");
            return;
        }

        const bodyObj = {
            title,
            desc,
            films
        }
        const fetchObj = {
            method: "POST",
            body: JSON.stringify(bodyObj)
        }

        console.log(bodyObj);
        await fetch('/api/polls/create', fetchObj);

        // window.location.href = window.location.href;
    }

    function warning(type) {
        if ( type == "title" ) {
            titleText.toggleClass("warning", true);
            titleLabel.toggleClass("warning", true);
            titleText.attr("placeholder", "Please provide a title");
        } else {
            selectedDisplay.toggleClass("warning", true);
            const wLi = $('<li>', { id: "warning", class: "list-group-item fs-6 warning" });
            wLi.text("Please select at least two films");
            selectedDisplay.append(wLi);
        }
    }

    function clearWarning() {
        titleText.toggleClass("warning", false);
        titleText.attr("placeholder", "(80 characters max)");
        titleLabel.toggleClass("warning", false);
        selectedDisplay.toggleClass("warning", false);
        $('#warning').remove();
    }

    function noResults() {
        const nLi = $('<li>', { id: "noResults", class: "list-group-item fs-6 warning" });
        nLi.text("Search returned no results");
        resultsDisplay.append(nLi);
    }

    function clearNoResults() {
        $('#noResults').remove();
    }
})

