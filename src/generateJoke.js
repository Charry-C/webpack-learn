import axios from "axios";
const textEle = document.querySelector('#joke')

export function generateJoke(el) {
    axios.get('https://official-joke-api.appspot.com/random_joke')
        .then((res) => res.data).then((data) => {
            textEle.innerText = data.setup
        })

}
