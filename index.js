const axios = require('axios')
const PushBullet = require('pushbullet')
const pusher = new PushBullet('<api_key>')

const url = "http://labs.cs.upt.ro/~oose/pmwiki.php/FSE/Exams"
let finds = 0

const noteTitle = "Rezultate la FIS"
const noteBody = "Vezi ca au aparut rezultatele la FIS\n\n" + url

let method = () => {
    axios.get(url)
        .then(response => {
            let two18 = (response.data.match(/2018/g) || []).length

            if (finds !== two18 && finds !== 0) {
                finds = two18

                pusher.note('dannyb97danny@gmail.com', noteTitle, noteBody, function (error, response) {
                    if (error) throw new Error(error)

                    console.log(response)
                })
            }

            console.log(two18)
        })
}

setInterval(method, 5000);