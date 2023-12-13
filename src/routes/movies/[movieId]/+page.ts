export const load = async ({ fetch, params }) => {
    async function fetchMovie(){
        const movieData = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies/" + params.movieId);
        return await movieData.json();
    }
    async function fetchTheatres(){
        const theatres = await fetch("https://655c510c25b76d9884fcf74d.mockapi.io/mock/movies/" + params.movieId);
        return await theatres.json();
    }

    async function fetchReviews(){
        return {amount: 2, 
            reviews: [
                {
                rating: 4, 
                comment: "Stephen Curry: Underrated ist eine fesselnde Dokumentation, die über das Standard-Sportdrama hinausgeht. Der Film zeigt uns den Aufstieg von Curry in der Welt des Basketballs, und wie er trotz aller Zweifel und Herausforderungen seinen Weg zur NBA-Elite gefunden hat. Die Regie ist beeindruckend, mit einer Kombination aus atemberaubenden Spielszenen und tiefgreifenden Interviews, die ein umfassendes Bild von Curry zeichnen. Was diesen Film jedoch wirklich auszeichnet, ist die Art und Weise, wie er die menschliche Seite von Curry zeigt - seine Hingabe, seine Leidenschaft und seinen unaufhaltsamen Willen, sich selbst zu übertreffen. Für jeden, der eine inspirierende Geschichte der Überwindung von Widrigkeiten liebt, ist Stephen Curry: Underrated ein absolutes Muss.", 
                datetime: "1988-03-14 15:04:05", 
                isSpoiler: false, 
                username: "Elias O.", 
                userPic: "https://pbs.twimg.com/profile_images/1717296927522648064/nzm8Wp0A_400x400.jpg", 
                showSpoiler: false
                }, {rating: 3, comment: "Stephen Curry: Underrated ist eine eindrucksvolle Dokumentation, die das Leben und die Karriere von Stephen Curry, einem der größten Basketballspieler unserer Zeit, beleuchtet. Dieser Film bringt uns nicht nur nah an die Basketball-Courts, sondern auch an das persönliche Leben von Curry, was eine faszinierende Perspektive auf den Mann hinter dem Spieler bietet. Die filmische Erzählung ist gut durchdacht und zeigt auf, wie Curry gegen alle Widerstände an die Spitze kam und seine Kritiker zum Schweigen brachte. Die emotionale Tiefe, die in diesem Film erreicht wird, ist bemerkenswert. Es ist nicht nur ein Film für Basketballfans, sondern für jeden, der inspirierende Geschichten liebt. Ein absolutes Muss!", datetime: "1988-03-14 15:04:05", isSpoiler: true, username: "Not Elias O.", userPic: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Steph_Curry_P20230117AS-1347_%28cropped%29.jpg", showSpoiler: false}]}
    }

    return {movie: fetchMovie(), theatres: fetchTheatres(), reviews: await fetchReviews() };
}