let btn = document.querySelector("button");
let para = document.querySelector("#res");
let url = "https://v2.jokeapi.dev/joke/Any?safe-mode";

btn.addEventListener("click", async () => {
    let joke = await getJoke();
    para.innerText = joke;
})

async function getJoke() {
    try {
        let response = await axios.get(url);
        let data = response.data;
        if (data.type == 'single') {
            return data.joke;
        } else if (data.type == 'twopart') {
            return `${data.setup} — ${data.delivery}`;
        }
    } catch (err) {
        console.log("Error was: ", err);
        return "No Qoute Found";
    }
    
}